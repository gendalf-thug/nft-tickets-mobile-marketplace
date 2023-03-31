// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();
error InsufficientTickets();
error OnlySellerCanDoThis();

contract NftTicketsMarketplace is ReentrancyGuard {
  using Counters for Counters.Counter;

  IERC1155 ticketsContract;

  struct Offer {
    uint pricePerUnit;
    uint quantity;
    address seller;
  }

  event OfferCreate(
    address indexed seller,
    uint quantity,
    uint indexed ticketId,
    uint pricePerUnit,
    uint indexed offerID
  );

  event OfferRevoked(
    address indexed seller,
    uint quantity,
    uint indexed ticketId,
    uint indexed offerID
  );

  event ItemBought(
    address indexed buyer,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  // TICKET_ID => mapping(OFFER_ID => {Listing object})
  mapping(uint => mapping(uint => Offer)) private listings;
  // TICKET_ID => COUNTER
  mapping(uint => Counters.Counter) private listingCounnters;

  mapping(address => uint256) private proceeds;

  constructor(address ticketsContractAddress) {
    ticketsContract = IERC1155(ticketsContractAddress);
  }

  function listTickets(
    uint ticketId,
    uint pricePerUnit,
    uint sellAmount
  ) external nonReentrant {
    // check price > 0
    if (pricePerUnit <= 0) revert PriceMustBeAboveZero();
    // check aproved > 0
    if (!ticketsContract.isApprovedForAll(msg.sender, address(this)))
      revert NotApprovedForMarketplace();
    // check balance
    if (ticketsContract.balanceOf(msg.sender, ticketId) < sellAmount)
      revert InsufficientTickets();

    ticketsContract.safeTransferFrom(
      msg.sender,
      address(this),
      ticketId,
      sellAmount,
      ''
    );

    listingCounnters[ticketId].increment();
    uint256 newListingId = listingCounnters[ticketId].current();

    listings[ticketId][newListingId] = Offer(
      pricePerUnit,
      sellAmount,
      msg.sender
    );
    emit OfferCreate(
      msg.sender,
      sellAmount,
      ticketId,
      pricePerUnit,
      newListingId
    );
  }

  /*
   * @notice Method for cancelling listing
   * @param nftAddress Address of NFT contract
   * @param tokenId Token ID of NFT
   */
  function cancelListing(uint ticketId, uint offerID) external {
    Offer memory canceledOffer = listings[ticketId][offerID];
    if (canceledOffer.seller != msg.sender) revert OnlySellerCanDoThis();

    delete (listings[ticketId][offerID]);

    ticketsContract.safeTransferFrom(
      address(this),
      canceledOffer.seller,
      ticketId,
      canceledOffer.quantity,
      ''
    );

    emit OfferRevoked(msg.sender, canceledOffer.quantity, ticketId, offerID);
  }

  //   function buyItem(
  //     address nftAddress,
  //     uint256 tokenId
  //   ) external payable nonReentrant {
  //     Listing memory listedItem = s_listings[nftAddress][tokenId];
  //     if (msg.value < listedItem.price) {
  //       revert PriceNotMet(nftAddress, tokenId, listedItem.price);
  //     }
  //     s_proceeds[listedItem.seller] += msg.value;
  //     // Could just send the money...
  //     // https://fravoll.github.io/solidity-patterns/pull_over_push.html
  //     delete (s_listings[nftAddress][tokenId]);
  //     IERC721(nftAddress).safeTransferFrom(
  //       listedItem.seller,
  //       msg.sender,
  //       tokenId
  //     );
  //     emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
  //   }

  //   function updateListing(
  //     address nftAddress,
  //     uint256 tokenId,
  //     uint256 newPrice
  //   ) external nonReentrant {
  //     //We should check the value of `newPrice` and revert if it's below zero (like we also check in `listItem()`)
  //     if (newPrice <= 0) {
  //       revert PriceMustBeAboveZero();
  //     }
  //     s_listings[nftAddress][tokenId].price = newPrice;
  //     emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
  //   }

  //   /*
  //    * @notice Method for withdrawing proceeds from sales
  //    */
  //   function withdrawProceeds() external {
  //     uint256 proceeds = s_proceeds[msg.sender];
  //     if (proceeds <= 0) {
  //       revert NoProceeds();
  //     }
  //     s_proceeds[msg.sender] = 0;
  //     (bool success, ) = payable(msg.sender).call{value: proceeds}('');
  //     require(success, 'Transfer failed');
  //   }

  //   function getListing(
  //     address nftAddress,
  //     uint256 tokenId
  //   ) external view returns (Offer memory) {
  //     return s_listings[nftAddress][tokenId];
  //   }

  //   function getProceeds(address seller) external view returns (uint256) {
  //     return s_proceeds[seller];
  //   }
}
