// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftStaker is ERC20, ERC1155Holder, Ownable {
    event NftStaked(address indexed user, uint256 tokenId, uint256 amount);
    event NftUnstaked(address indexed user, uint256 tokenId, uint256 amount);
    event RewardClaimed(address indexed user, uint256 rewardAmount);

    IERC1155 public parentNFT;
    uint256 public rewardRate = 100000;
    uint256 public tokenValue = 1;
    uint256 public totalPoolSize = 0;
    uint256 public defaultTokenId = 0;

    struct Stake {
        uint256 tokenId;
        uint256 amount;
        uint256 timestamp; // Store the staking start timestamp
    }

    mapping(address => Stake) public stakes;

    modifier hasSufficientNFTBalance(address account, uint256 amount) {
        require(
            parentNFT.balanceOf(account, defaultTokenId) >= amount &&
                amount >= 0,
            "Insufficient NFT balance"
        );
        _;
    }

    constructor(address _nft) ERC20("GameToken", "GTK") {
        parentNFT = IERC1155(_nft);
    }

    function stake(uint256 _amount)
        external
        hasSufficientNFTBalance(msg.sender, _amount)
    {
        stakes[msg.sender] = Stake(defaultTokenId, _amount, block.timestamp);
        parentNFT.safeTransferFrom(
            msg.sender,
            address(this),
            defaultTokenId,
            _amount,
            "0x00"
        );
        totalPoolSize += _amount;
        emit NftStaked(msg.sender, defaultTokenId, _amount);
    }

    function unstake(uint256 _amount)
        external
        hasSufficientNFTBalance(msg.sender, _amount)
    {
        uint256 reward = calculateRewards(
            _amount,
            stakes[msg.sender].timestamp
        );

        _mint(msg.sender, reward);

        parentNFT.safeTransferFrom(
            address(this),
            msg.sender,
            stakes[msg.sender].tokenId,
            _amount,
            "0x00"
        );

        if (stakes[msg.sender].amount > _amount) {
            stakes[msg.sender].timestamp = block.timestamp; // Reset the timestamp
            stakes[msg.sender].amount -= _amount;
            totalPoolSize -= _amount;
        } else if (stakes[msg.sender].amount == _amount) {
            delete stakes[msg.sender];
        }
        emit NftUnstaked(
            msg.sender,
            stakes[msg.sender].tokenId,
            stakes[msg.sender].amount
        );
    }

    function claim() external hasSufficientNFTBalance(msg.sender, 0) {
        uint256 reward = calculateRewards(
            stakes[msg.sender].amount,
            stakes[msg.sender].timestamp
        );

        _mint(msg.sender, reward);
        stakes[msg.sender].timestamp = block.timestamp; // Reset the timestamp
        emit RewardClaimed(msg.sender, reward);
    }

    function calculateRewards(uint256 stakedNFTs, uint256 stakingStartTimestamp)
        internal
        view
        returns (uint256)
    {
        uint256 stakingDuration = block.timestamp - stakingStartTimestamp;
        require(stakingDuration > 0, "Staking duration must be greater than 0");
        require(tokenValue > 0, "Token value must be greater than 0");

        return
            (stakedNFTs * rewardRate * stakingDuration * tokenValue) /
            totalPoolSize;
    }

    function getStakedNFTs() public view returns (uint256) {
        return stakes[msg.sender].amount;
    }

    function getStakingDuration() public view returns (uint256) {
        if (stakes[msg.sender].timestamp == 0) return 0;
        return block.timestamp - stakes[msg.sender].timestamp;
    }
}
