// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
// error ItemNotForSale(address nftAddress, uint256 tokenId);
// error NotListed(address nftAddress, uint256 tokenId);
// error AlreadyListed(address nftAddress, uint256 tokenId);
// error NoProceeds();
// error NotOwner();
// error NotApprovedForMarketplace();
// error PriceMustBeAboveZero();
// error InsufficientTickets();
// error OnlySellerCanDoThis();

contract ERC1155Marketplace is Ownable, ERC1155Holder {
    using SafeMath for uint256;

    struct Listing {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        uint256 amountAvailable;
        bool active;
    }

    mapping (uint256 => Listing) public listings;
    mapping (uint256 => mapping (address => uint256)) public purchases;

    IERC1155 private _tokenContract;

    event ListingCreated(uint256 indexed tokenId, address seller, uint256 price, uint256 amountAvailable);
    event ListingRemoved(uint256 indexed tokenId, address seller);
    event ListingPurchased(uint256 indexed tokenId, address buyer, uint256 amount);

    constructor(address tokenContractAddress) {
        _tokenContract = IERC1155(tokenContractAddress);
    }

    function createListing(uint256 tokenId, uint256 price, uint256 amountAvailable) public {
        require(_tokenContract.balanceOf(msg.sender, tokenId) >= amountAvailable, "You do not own enough tokens.");
        require(listings[tokenId].active == false, "Listing is already active.");

        listings[tokenId] = Listing(tokenId, payable(msg.sender), price, amountAvailable, true);
        _tokenContract.safeTransferFrom(msg.sender, address(this), tokenId, amountAvailable, "");

        emit ListingCreated(tokenId, msg.sender, price, amountAvailable);
    }

    function removeListing(uint256 tokenId) public {
        Listing storage listing = listings[tokenId];
        require(listing.active == true, "Listing is not active.");
        require(listing.seller == msg.sender, "You are not the seller.");

        delete listings[tokenId];
        _tokenContract.safeTransferFrom(address(this), msg.sender, tokenId, listing.amountAvailable, "");

        emit ListingRemoved(tokenId, msg.sender);
    }

    function buyListing(uint256 tokenId, uint256 amount) public payable returns (uint256) {
        Listing storage listing = listings[tokenId];
        require(listing.active == true, "Listing is not active.");
        require(amount <= listing.amountAvailable, "Insufficient tickets available.");
        require(msg.value >= listing.price.mul(amount), "Insufficient funds.");

        purchases[tokenId][msg.sender] = purchases[tokenId][msg.sender].add(amount);
        listing.amountAvailable = listing.amountAvailable.sub(amount);

        _tokenContract.safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
        listing.seller.transfer(msg.value);

        emit ListingPurchased(tokenId, msg.sender, amount);

        return 0;
    }

    function createCustomListing(uint256 tokenId, uint256 price, uint256 amountAvailable) public {
        require(_tokenContract.balanceOf(msg.sender, tokenId) >= amountAvailable, "You do not own enough tokens.");

        listings[tokenId] = Listing(tokenId, payable(msg.sender), price, amountAvailable, true);

        emit ListingCreated(tokenId, msg.sender, price, amountAvailable);
    }

    function setTokenContract(address tokenContractAddress) public onlyOwner {
        _tokenContract = IERC1155(tokenContractAddress);
    }
}