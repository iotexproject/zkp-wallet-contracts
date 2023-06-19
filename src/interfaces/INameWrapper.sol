// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./INS.sol";

interface INameWrapper {
    function ins() external view returns (INS);

    function setSubnodeRecord(
        bytes32 node,
        string calldata label,
        address owner,
        address resolver,
        uint64 ttl,
        uint32 fuses,
        uint64 expiry
    ) external returns (bytes32);

    function setSubnodeOwner(
        bytes32 node,
        string calldata label,
        address newOwner,
        uint32 fuses,
        uint64 expiry
    ) external returns (bytes32);

    function getData(uint256 id) external view returns (address, uint32, uint64);
}
