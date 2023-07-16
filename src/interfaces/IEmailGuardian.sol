// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IEmailGuardian {
    function validateDKIM(
        bytes32 server,
        bytes32 email,
        address account,
        bytes calldata data,
        bytes calldata signature,
        bytes calldata target
    ) external returns (bool);
}
