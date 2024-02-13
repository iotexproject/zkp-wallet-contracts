// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./interfaces/IDkimVerifier.sol";

contract EmailGuardian is Ownable {
    event SignerChanged(address indexed signer);
    event EmailBinded(address indexed account, bytes32 email);
    event EmailUnbinded(address indexed account, bytes32 email);

    IDkimVerifier private immutable _dkimVerifier;
    address public verifyingSigner;
    mapping(address => bytes32) public emails;
    mapping(address => uint256) public nonces;
    mapping(bytes32 => bool) public nullifierHashes;

    constructor(IDkimVerifier dkimVerifier, address signer) {
        _dkimVerifier = dkimVerifier;
        verifyingSigner = signer;
        emit SignerChanged(signer);
    }

    function getHash(address account, bytes32 email) public view returns (bytes32) {
        return keccak256(abi.encode(block.chainid, account, nonces[account], email));
    }

    function bind(bytes32 email, bytes calldata signature) external {
        bytes32 hash = ECDSA.toEthSignedMessageHash(getHash(msg.sender, email));
        require(verifyingSigner == ECDSA.recover(hash, signature), "error signature");

        nonces[msg.sender]++;
        emails[msg.sender] = email;
        emit EmailBinded(msg.sender, email);
    }

    function unbind() external returns (bytes32 email) {
        email = emails[msg.sender];
        require(email != 0x0, "email not bind yet");
        delete emails[msg.sender];
        emit EmailUnbinded(msg.sender, email);
    }

    function verify(
        bytes32 server,
        address account,
        bytes calldata data,
        bytes calldata signature,
        bytes calldata pubkey
    ) external returns (bool) {
        bytes32 hash = keccak256(data);
        require(!nullifierHashes[hash], "used email data");
        bytes memory from = _dkimVerifier.from(data);
        require(emails[msg.sender] == keccak256(from), "error email owner");
        require(_dkimVerifier.verify(server, data, signature), "error dkim signature");
        bytes memory subject = _dkimVerifier.subject(data);
        require(keccak256(subject) == keccak256(subjectHex("01", account, pubkey)), "error email type or pubkey");
        nullifierHashes[hash] = true;

        return true;
    }

    function changeSigner(address signer) external onlyOwner {
        verifyingSigner = signer;
        emit SignerChanged(signer);
    }

    // format: type + chainid + account_address + pubkey
    function subjectHex(string memory typ, address account, bytes memory pubkey) public view returns (bytes memory) {
        bytes memory converted = new bytes(pubkey.length * 2);
        bytes memory _base = "0123456789abcdef";

        for (uint256 i = 0; i < pubkey.length; i++) {
            converted[i * 2] = _base[uint8(pubkey[i]) / _base.length];
            converted[i * 2 + 1] = _base[uint8(pubkey[i]) % _base.length];
        }

        return abi.encodePacked(typ, Strings.toString(block.chainid), Strings.toHexString(account), converted);
    }
}
