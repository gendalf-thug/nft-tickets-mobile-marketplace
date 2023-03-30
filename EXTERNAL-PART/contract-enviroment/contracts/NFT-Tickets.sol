// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract NftTickets is ERC1155 {
  using Counters for Counters.Counter;

  constructor() ERC1155('https://game.example/api/item/{id}.json') {
    _mint(msg.sender, GOLD, 10 ** 18, '');
    _mint(msg.sender, SILVER, 10 ** 27, '');
    _mint(msg.sender, THORS_HAMMER, 1, '');
    _mint(msg.sender, SWORD, 10 ** 9, '');
    _mint(msg.sender, SHIELD, 10 ** 9, '');
  }
}
