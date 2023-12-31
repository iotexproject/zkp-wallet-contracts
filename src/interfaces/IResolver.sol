// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IResolver {
    function setAddr(bytes32 node, address addr) external;

    function addr(bytes32 node) external view returns (address);
}
