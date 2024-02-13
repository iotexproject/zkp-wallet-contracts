// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IEmailGuardian {
    function verify(
        bytes32 server,
        address account,
        bytes calldata data,
        bytes calldata signature,
        bytes calldata target
    ) external returns (bool);
}
