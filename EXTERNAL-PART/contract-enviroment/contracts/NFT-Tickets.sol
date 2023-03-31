// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

error ipfsHashShouldNotBeEmptyString();
error OnlyStaffOwnerCanDoThis();
error OnlyStaffTicketCollectorsCanDoThis();
error PriceMustBeAboveZero();

contract NftTickets is ERC1155URIStorage {
  using Counters for Counters.Counter;

  struct Staff {
    address owner;
    mapping(address => bool) ticketCollectors;
  }

  Counters.Counter private ticketCounter;
  mapping(uint => Staff) staff;

  constructor() ERC1155('') {
    _setBaseURI('https://ipfs.io/ipfs/{ipfs-path}');
  }

  function createTicket(uint amount, string calldata ipfsHash) external {
    if (bytes(ipfsHash).length <= 0) {
      revert ipfsHashShouldNotBeEmptyString();
    }

    ticketCounter.increment();
    uint256 newTicketId = ticketCounter.current();

    _mint(msg.sender, newTicketId, amount, '');
    _setURI(newTicketId, ipfsHash);

    staff[newTicketId].owner = msg.sender;
  }

  function changeTicketCollectors(
    uint ticketId,
    address collector,
    bool canCollectTickets
  ) external onlyStaffOwner(ticketId) {
    staff[ticketId].ticketCollectors[collector] = canCollectTickets;
  }

  modifier onlyStaffOwner(uint ticketId) {
    if (staff[ticketId].owner != msg.sender) revert OnlyStaffOwnerCanDoThis();
    _;
  }
  modifier onlyStaffTicketCollectors(uint ticketId) {
    if (staff[ticketId].ticketCollectors[msg.sender] == false)
      revert OnlyStaffTicketCollectorsCanDoThis();
    _;
  }
}
