// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IReverseRegistrar {
    function setNameForAddr(
        address addr,
        address owner,
        address resolver,
        string memory name
    ) external returns (bytes32);
}
