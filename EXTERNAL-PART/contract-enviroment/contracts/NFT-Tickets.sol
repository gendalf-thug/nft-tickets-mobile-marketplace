// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

error ipfsHashShouldNotBeEmptyString();
error OnlyStaffOwnerCanDoThis();
error OnlyStaffTicketCollectorsCanDoThis();
error PriceMustBeAboveZero();
error AmountMustBeAboveZero();
error TicketsCanOnlyBeAcceptedByTheStaffCollectors();
error TicketsWereNotUsed();
error NeedAnotherCollector(address collector);

contract NftTickets is ERC1155URIStorage, ReentrancyGuard {
  using Counters for Counters.Counter;
  using ECDSA for bytes32;

  // ** EVENTS START (they are needed for graph) **
  event TicketCreated(
    address indexed owner,
    uint indexed ticketID,
    uint amount,
    string indexed ipfsHash
  );

  event StaffCollectorsChanged(
    uint indexed ticketID,
    address indexed collector,
    bool canCollectTickets
  );

  event TicketsUsed(
    bytes32 ethSignedMessage,
    address indexed collector,
    uint amountOfTickets
  );
  event TicketsWasSuccessfullyUsed(bytes32 ethSignedMessage);
  // ** EVENTS END **

  // Counter for indexing tickets
  Counters.Counter private ticketCounter;

  // Staff serves to check and withdraw tickets
  struct Staff {
    address owner;
    mapping(address => bool) ticketCollectors;
  }
  // Staff serves to check and withdraw tickets
  struct TicketVerificationInfo {
    address collector;
    uint amount;
    bool ready;
  }
  // Comparison of the ticket and its team
  mapping(uint => Staff) private staff;

  // To generate unique message hashes when checking tickets
  mapping(uint => Counters.Counter) private nounceCounters;
  // To verify tickets by messages
  mapping(uint => mapping(bytes32 => TicketVerificationInfo))
    private activeMessages;

  // ** CONSTRUCTOR **
  constructor() ERC1155('') {
    _setBaseURI('https://ipfs.io/ipfs/');
  }

  // ** FUNCTIONS **

  /**
   * Creates event tickets and binds ipfs hash metadata to them
   */
  function createTicket(
    uint amount,
    string calldata ipfsHash
  ) external returns (uint) {
    // Checking for ipfsHash
    if (bytes(ipfsHash).length <= 0) {
      revert ipfsHashShouldNotBeEmptyString();
    }
    // Checking for amount
    if (amount <= 0) {
      revert AmountMustBeAboveZero();
    }

    // Get a new unique ticket ID
    ticketCounter.increment();
    uint256 newTicketId = ticketCounter.current();

    // Create tickets and assign ipfsHash to the ticket metadata
    _mint(msg.sender, newTicketId, amount, '');
    _setURI(newTicketId, ipfsHash);
    // Assign the owner
    staff[newTicketId].owner = msg.sender;

    emit TicketCreated(msg.sender, newTicketId, amount, ipfsHash);

    return newTicketId;
  }

  /**
   * Allows the creator to assign ticket collectors
   */
  function changeTicketCollectors(
    uint ticketId,
    address collector,
    bool canCollectTickets
  ) external onlyStaffOwner(ticketId) {
    staff[ticketId].ticketCollectors[collector] = canCollectTickets;
    emit StaffCollectorsChanged(ticketId, collector, canCollectTickets);
  }

  function useTickets(
    address collector,
    uint ticketId,
    uint amountOfTickets
  ) external nonReentrant returns (bytes32) {
    // Tickets can only be accepted by staff collector
    if (!staff[ticketId].ticketCollectors[collector])
      revert TicketsCanOnlyBeAcceptedByTheStaffCollectors();

    // There is already a balance check inside this function
    _safeTransferFrom(msg.sender, collector, ticketId, amountOfTickets, '');

    nounceCounters[ticketId].increment();
    uint nounce = nounceCounters[ticketId].current();

    bytes32 message = keccak256(
      abi.encodePacked(ticketId, amountOfTickets, collector, nounce)
    );
    bytes32 ethSignedMessage = message.toEthSignedMessageHash();
    activeMessages[ticketId][ethSignedMessage] = TicketVerificationInfo(
      collector,
      amountOfTickets,
      true
    );
    emit TicketsUsed(ethSignedMessage, collector, amountOfTickets);

    return ethSignedMessage;
  }

  function verifyTickets(
    uint ticketID,
    address signer,
    bytes32 ethSignedMessage,
    bytes memory signature
  ) public onlyStaffTicketCollectors(ticketID) returns (bool) {
    TicketVerificationInfo memory tvi = activeMessages[ticketID][
      ethSignedMessage
    ];
    if (!tvi.ready) {
      revert TicketsWereNotUsed();
    }
    if (msg.sender != tvi.collector) {
      revert NeedAnotherCollector(tvi.collector);
    }
    if (ethSignedMessage.recover(signature) == signer) {
      activeMessages[ticketID][ethSignedMessage].ready = false;
      emit TicketsWasSuccessfullyUsed(ethSignedMessage);

      return true;
    } else {
      return false;
    }
  }

  // ** FUNCTIONS END **

  // ** VIEW FUNCTIONS **
  function getTicketCreator(uint ticketId) public view returns (address) {
    return staff[ticketId].owner;
  }

  function canCollectTicket(uint ticketId) public view returns (bool) {
    return staff[ticketId].ticketCollectors[msg.sender];
  }

  // ** VIEW FUNCTIONS END **

  // ** MODIFIERS **

  modifier onlyStaffOwner(uint ticketId) {
    if (staff[ticketId].owner != msg.sender) revert OnlyStaffOwnerCanDoThis();
    _;
  }
  modifier onlyStaffTicketCollectors(uint ticketId) {
    if (staff[ticketId].ticketCollectors[msg.sender] == false)
      revert OnlyStaffTicketCollectorsCanDoThis();
    _;
  }
  // ** MODIFIERS  END **
}
