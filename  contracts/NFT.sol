// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC1155, Ownable {
    struct NFTDetails {
        string name;
        uint256 amount;
    }

    uint256 private constant NFT_ID = 0;
    string private constant BASE_URI = "https://bafybeihul6zsmbzyrgmjth3ynkmchepyvyhcwecn2yxc57ppqgpvr35zsq.ipfs.dweb.link/{id}.json";

    mapping(uint256 => NFTDetails) public nftDetails;

    constructor() ERC1155(BASE_URI) {
        string memory name = "Charizard";
        uint256 initialAmount = 100;

        _mint(msg.sender, NFT_ID, initialAmount, "");
        nftDetails[NFT_ID] = NFTDetails(name, initialAmount);
    }

    function getTokenDetails() external view returns (uint256, string memory, uint256) {
        NFTDetails memory details = nftDetails[NFT_ID];
        return (NFT_ID, details.name, details.amount);
    }

    function getAmount(address _owner) external view returns (uint256) {
        return balanceOf(_owner, NFT_ID);
    }
}
