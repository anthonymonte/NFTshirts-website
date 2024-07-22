// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFTCollection is ERC721Enumerable, ERC721URIStorage, Ownable {

    uint256 public tokenCounter;
    event NFTMinted(address owner, uint256 tokenId);

    constructor(address initial_owner) ERC721("MyNFTCollection", "NFTS") Ownable(initial_owner) {
        tokenCounter = 6;
    }
    
    // Withdraw function for the owner to extract Ether
    function withdraw() public {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed.");
    }

    function createCollectible() public payable returns (uint256) {
        require(msg.value >= 0.001 ether, "Not enough ETH sent; check price!");

        uint256 newItemId = tokenCounter;
        _mint(msg.sender, newItemId);
        string memory full_uri = string.concat("https://nftshirts.shop/", Strings.toString(newItemId));
        _setTokenURI(
            newItemId,
            full_uri
        );
        tokenCounter = tokenCounter + 1;

        emit NFTMinted(msg.sender, newItemId);
        return newItemId;
    }

    // Override this function to return token URIs from ERC721URIStorage
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // View function to return all token IDs and URIs owned by the sender.
    function getMyNFTs() public view returns (uint256[] memory, string[] memory) {
        uint256 tokenCount = balanceOf(msg.sender);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        string[] memory tokenUris = new string[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
            tokenIds[i] = tokenId;
            tokenUris[i] = tokenURI(tokenId);
        }

        return (tokenIds, tokenUris);
    }

    function _increaseBalance(address account, uint128 amount)
        internal
        virtual
        override(ERC721, ERC721Enumerable)
    {
        return super._increaseBalance(account, amount);
    }

    function _update(address to, uint256 tokenId, address auth) 
        internal 
        virtual 
        override(ERC721, ERC721Enumerable)
        returns (address) 
    {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
