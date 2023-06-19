// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "./interfaces/INameWrapper.sol";
import "./interfaces/IResolver.sol";
import "./interfaces/IReverseRegistrar.sol";
import "./ZKPassAccount.sol";

contract ZKPassAccountFactory is Ownable {
    INameWrapper public immutable nameWrapper;
    IResolver public immutable resolver;
    IReverseRegistrar public immutable reverseRegistrar;
    ZKPassAccount public immutable accountImplementation;
    string public baseName;
    bytes32 public immutable baseNode;

    constructor(
        IEntryPoint _entryPoint,
        INameWrapper _nameWrapper,
        IResolver _resolver,
        IReverseRegistrar _reverseRegistrar,
        string memory _baseName,
        bytes32 _baseNode
    ) {
        baseName = _baseName;
        baseNode = _baseNode;
        nameWrapper = _nameWrapper;
        reverseRegistrar = _reverseRegistrar;
        resolver = _resolver;
        accountImplementation = new ZKPassAccount(_entryPoint);
    }

    function _makeNode(bytes32 node, bytes32 labelhash) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(node, labelhash));
    }

    function createAccount(string memory label) public returns (ZKPassAccount ret) {
        address addr = getAddress(label);

        uint256 codeSize = addr.code.length;
        if (codeSize > 0) {
            return ZKPassAccount(payable(addr));
        }
        bytes32 labelhash = keccak256(bytes(label));
        bytes32 node = _makeNode(baseNode, labelhash);

        INS ins = nameWrapper.ins();
        require(!ins.recordExists(node), "name already registered");

        ret = ZKPassAccount(
            payable(
                new ERC1967Proxy{salt: bytes32(0)}(
                    address(accountImplementation),
                    abi.encodeCall(ZKPassAccount.initialize, (node, address(this)))
                )
            )
        );
        nameWrapper.setSubnodeRecord(baseNode, label, address(this), address(resolver), 0, 0, 9999999999);
        resolver.setAddr(node, address(ret));
        reverseRegistrar.setNameForAddr(address(ret), address(ret), address(resolver), string.concat(label, baseName));
        nameWrapper.setSubnodeOwner(baseNode, label, address(ret), 0, 9999999999);
    }

    function getAddress(string memory label) public view returns (address) {
        bytes32 labelhash = keccak256(bytes(label));
        bytes32 node = _makeNode(baseNode, labelhash);

        return
            Create2.computeAddress(
                bytes32(0),
                keccak256(
                    abi.encodePacked(
                        type(ERC1967Proxy).creationCode,
                        abi.encode(
                            address(accountImplementation),
                            abi.encodeCall(ZKPassAccount.initialize, (node, address(this)))
                        )
                    )
                )
            );
    }

    function onERC1155Received(address, address, uint256, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC1155Receiver.onERC1155Received.selector;
    }
}
