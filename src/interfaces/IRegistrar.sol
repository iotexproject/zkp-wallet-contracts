// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IRegistrar {
    function rentPrice(string memory name, uint256 duration) external view returns (uint256 base, uint256 premium);

    function makeCommitment(
        string memory name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint16 ownerControlledFuses
    ) external view returns (bytes32);

    function commit(bytes32 commitment) external;

    function register(
        string calldata name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint16 ownerControlledFuses
    ) external payable;
}
