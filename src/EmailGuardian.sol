// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./interfaces/IDkimVerifier.sol";
import "./interfaces/IEmailGuardian.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EmailGuardian is IEmailGuardian {
    mapping(bytes32 => bool) public nullifierHashes;

    IDkimVerifier private _dkimVerifier;

    constructor(IDkimVerifier verifier) {
        _dkimVerifier = verifier;
    }

    function validateDKIM(
        bytes32 server,
        bytes32 email,
        address account,
        bytes calldata data,
        bytes calldata signature,
        bytes calldata target
    ) external override returns (bool) {
        bytes32 hash = keccak256(data);
        require(!nullifierHashes[hash], "used email data");
        bytes memory from = _dkimVerifier.from(data);
        require(email == keccak256(from), "error email owner");
        require(_dkimVerifier.verify(server, data, signature), "error dkim signature");
        bytes memory subject = _dkimVerifier.subject(data);
        require(keccak256(subject) == keccak256(subjectHex("01", account, target)), "error email type or target");

        nullifierHashes[hash] = true;
        return true;
    }

    // format: type + chainid + account_address + target
    function subjectHex(string memory typ, address account, bytes memory target) public view returns (bytes memory) {
        bytes memory converted = new bytes(target.length * 2);
        bytes memory _base = "0123456789abcdef";

        for (uint256 i = 0; i < target.length; i++) {
            converted[i * 2] = _base[uint8(target[i]) / _base.length];
            converted[i * 2 + 1] = _base[uint8(target[i]) % _base.length];
        }

        return abi.encodePacked(typ, Strings.toString(block.chainid), Strings.toHexString(account), converted);
    }
}
