// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import './Tickets.sol';

error NotListed(address ticketAddress, uint256 tokenId);
error AlreadyListed(address ticketAddress, uint256 tokenId);
error NotOwner();
error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error NotEnoughtItemsToSell();
error PriceMustBeAboveZero();
error NoProceeds();
error TransferFailed();
error NotApprovedForMarketplace();

contract TicketsMarket is ReentrancyGuard, ERC1155Holder {
  using Counters for Counters.Counter;

  struct Listing {
    uint256 price;
    address seller;
  }

  event ItemListed(
    address indexed seller,
    address indexed ticketAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  event ItemCanceled(
    address indexed seller,
    address indexed ticketAddress,
    uint256 indexed tokenId
  );

  event ItemBought(
    address indexed buyer,
    address indexed ticketAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  event ItemListedUpdated(
    address indexed ticketAddress,
    uint256 indexed tokenId,
    uint256 newPrice
  );

  mapping(address => mapping(uint256 => Listing)) private listings;
  mapping(address => uint256) private proceeds;

  modifier notListed(address nftAddress, uint256 tokenId) {
    Listing memory listing = listings[nftAddress][tokenId];
    if (listing.price > 0) {
      revert AlreadyListed(nftAddress, tokenId);
    }
    _;
  }

  modifier isListed(address nftAddress, uint256 tokenId) {
    Listing memory listing = listings[nftAddress][tokenId];
    if (listing.price <= 0) {
      revert NotListed(nftAddress, tokenId);
    }
    _;
  }

  modifier isOwner(
    address ticketsAddress,
    uint256 tokenId,
    address spender
  ) {
    Tickets tickets = Tickets(ticketsAddress);
    address owner = tickets.ownerOf(tokenId);
    if (spender != owner) {
      revert NotOwner();
    }
    _;
  }

  constructor() {}

  event MarketItemCreated(
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    string name,
    address seller,
    address owner,
    uint256 price,
    uint256 amount,
    bool onSale
  );

  function listItem(
    address ticketAddress,
    uint256 tokenId
  )
    external
    notListed(ticketAddress, tokenId)
    isOwner(ticketAddress, tokenId, msg.sender)
  {
    Tickets tickets = Tickets(ticketAddress);
    uint256 price = tickets.tickets[tokenId].price;
    if (price <= 0) {
      revert PriceMustBeAboveZero();
    }

    // first arg - owner of tickets
    if (tickets.isApprovedForAll(msg.sender, address(this))) {
      revert NotApprovedForMarketplace();
    }
    listings[ticketAddress][tokenId] = Listing(price, msg.sender);
    emit ItemListed(msg.sender, ticketAddress, tokenId, price);
  }

  function cancelListing(
    address ticketAddress,
    uint256 tokenId
  )
    external
    isOwner(ticketAddress, tokenId, msg.sender)
    isListed(ticketAddress, tokenId)
  {
    delete (listings[ticketAddress][tokenId]);
    emit ItemCanceled(msg.sender, ticketAddress, tokenId);
  }

  function buyTickets(
    address ticketAddress,
    uint256 tokenId,
    uint256 amount,
    bytes memory data
  )
    external
    payable
    isListed(ticketAddress, tokenId)
    // isNotOwner(ticketAddress, tokenId, msg.sender)
    nonReentrant
  {
    Tickets tickets = Tickets(ticketAddress);
    Listing memory listedItem = listings[ticketAddress][tokenId];

    if (tickets.balanceOf(listedItem.seller, tokenId) < 0) {
      revert NotEnoughtItemsToSell();
    }

    if (msg.value < listedItem.price) {
      revert PriceNotMet(ticketAddress, tokenId, listedItem.price);
    }
    proceeds[listedItem.seller] += msg.value;
    tickets.useUnderscoreTransfer(
      listedItem.seller,
      msg.sender,
      tokenId,
      amount,
      data
    );
    emit ItemBought(msg.sender, ticketAddress, tokenId, listedItem.price);
  }

  function updateListing(
    address ticketAddress,
    uint256 tokenId,
    uint256 newPrice
  )
    external
    isListed(ticketAddress, tokenId)
    nonReentrant
    isOwner(ticketAddress, tokenId, msg.sender)
  {
    //We should check the value of `newPrice` and revert if it's below zero (like we also check in `listItem()`)
    if (newPrice <= 0) {
      revert PriceMustBeAboveZero();
    }
    Tickets tickets = Tickets(ticketAddress);
    tickets.tickets[tokenId].price = newPrice;
    listings[ticketAddress][tokenId].price = newPrice;
    emit ItemListedUpdated(ticketAddress, tokenId, newPrice);
  }

  function withdrawProceeds() external {
    uint256 _proceeds = proceeds[msg.sender];
    if (_proceeds <= 0) {
      revert NoProceeds();
    }
    _proceeds[msg.sender] = 0;
    bool success = payable(msg.sender).call{value: proceeds}('');
    if (!success) {
      revert TransferFailed();
    }
  }

  // //this is the signature checking part of the contract - still need to make this work within the market place
  // function getMessageHash(
  //   string memory _message
  // ) public pure returns (bytes32) {
  //   return keccak256(abi.encodePacked(_message));
  // }

  // function getEthSignedMessageHash(
  //   bytes32 _messageHash
  // ) public pure returns (bytes32) {
  //   return
  //     keccak256(
  //       abi.encodePacked('\x19Ethereum Signed Message:\n32', _messageHash)
  //     );
  // }

  // //need add the token ID that's being checked by the scanner
  // //then need to check balnce of for that token ID for the sender

  // function verify(
  //   address _signer,
  //   string memory _message,
  //   bytes memory signature,
  //   uint256 _itemId,
  //   address nftContract
  // ) public view returns (string memory _result) {
  //   bytes32 messageHash = getMessageHash(_message);
  //   bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
  //   //This is the address used for testing that is being checked - will actually be list of NFT owners in real app
  //   //address _testAddress = 0xc88Ad52065A113EbE503a4Cb6bCcE02B4802c264;
  //   Tickets temp = Tickets(nftContract);
  //   _result = 'Not on the list';
  //   if (
  //     temp.balanceOf(_signer, idToMarketItem[_itemId].tokenId) > 0 &&
  //     (recoverSigner(ethSignedMessageHash, signature) == _signer)
  //   ) {
  //     _result = 'On the list';
  //   }
  //   return _result;
  // }

  // function recoverSigner(
  //   bytes32 _ethSignedMessageHash,
  //   bytes memory _signature
  // ) public pure returns (address) {
  //   (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
  //   return ecrecover(_ethSignedMessageHash, v, r, s);
  // }

  // function splitSignature(
  //   bytes memory sig
  // ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
  //   require(sig.length == 65, 'invalid signature length');
  //   assembly {
  //     r := mload(add(sig, 32))
  //     s := mload(add(sig, 64))
  //     v := byte(0, mload(add(sig, 96)))
  //   }
  // }

  // //need to pass this function the token ID of the nft - this will be used to get the _message - make this the event name
  // //then need to check balance of for that token ID for the sender
  // //function hostActions(string memory _message, bytes memory _sig) public pure returns (string memory) {
  // function hostActions(
  //   uint256 _itemId,
  //   bytes memory _sig,
  //   address nftContract
  // ) public view returns (string memory) {
  //   string memory _message = idToMarketItem[_itemId].name;
  //   bytes32 _messageHash = getMessageHash(_message);
  //   bytes32 _ethSignedMessageHash = getEthSignedMessageHash(_messageHash);
  //   address _signer = recoverSigner(_ethSignedMessageHash, _sig);
  //   return verify(_signer, _message, _sig, _itemId, nftContract);
  // }
}
