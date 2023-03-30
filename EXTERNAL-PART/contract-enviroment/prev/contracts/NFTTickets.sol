// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';

error ItemAlreadyHasPrice(uint itemId);
error PriceMustBeGreaterThanZero(uint price);
error OnlyTokenCreatorCanDoThis();

contract Tickets is ERC1155URIStorage, ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private tokenCounter;
  address marketplaceAddress; // = <0xF5C99...>;

  struct TicketsData {
    uint256 price;
    address seller;
  }

  mapping(uint256 => TicketsData) public tickets;

  event TicketCreated(uint indexed ticketId, uint256 amount, uint256 price);

  event TicketChangeAmount(uint indexed itemId, uint amount);

  constructor() ERC1155('') {}

  //Creates general admitance tokens - all have same value and no seat specific data
  function createToken(
    uint256 amount,
    uint256 price,
    bytes memory data
  ) public returns (uint) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    if ((tickets[newItemId].price) != 0) {
      revert ItemAlreadyHasPrice(newItemId);
    }
    if (price <= 0) {
      revert PriceMustBeGreaterThanZero(price);
    }

    tickets[newItemId].seller = msg.sender;
    _mint(msg.sender, newItemId, amount, data);
    tickets[newItemId].price = price;
    setApprovalForAll(marketplaceAddress, true);
    emit TicketCreated(newItemId, amount, price);
    return newItemId;
  }

  function ownerOf(uint256 tokenId) public view returns (address) {
    return tickets[tokenId].seller;
  }

  //Creates more general admitance tokens - all have samve value and no seat specific data
  function createMoreTokens(
    uint256 tokenId,
    uint256 amount,
    bytes memory data
  ) public {
    if (tickets[tokenId].seller != msg.sender) {
      revert OnlyTokenCreatorCanDoThis();
    }
    // total amout will be = <prev amout> + <amount>
    _mint(msg.sender, tokenId, amount, data);
  }

  function useUnderscoreTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 amount,
    bytes memory data
  ) public {
    _safeTransferFrom(from, to, tokenId, amount, data);
  }
}
