// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/samples/callback/TokenCallbackHandler.sol";

contract ZKPassAccount is BaseAccount, TokenCallbackHandler, UUPSUpgradeable, Initializable {
    IEntryPoint private immutable _entryPoint;
    address public owner;
    bytes32 public nameHash;

    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    modifier onlyEntryPoint() {
        _onlyEntryPoint();
        _;
    }

    constructor(IEntryPoint anEntryPoint) {
        _entryPoint = anEntryPoint;
    }

    function _onlyEntryPoint() internal view {
        require(msg.sender == address(entryPoint()), "account: not EntryPoint");
    }

    function initialize(bytes32 _nameHash, address _owner) public virtual initializer {
        nameHash = _nameHash;
        owner = _owner;
        // TODO emit log
    }

    function execute(address dest, uint256 value, bytes calldata func) external onlyEntryPoint {
        _call(dest, value, func);
    }

    function executeBatch(address[] calldata dest, bytes[] calldata func) external onlyEntryPoint {
        require(dest.length == func.length, "wrong array lengths");
        for (uint256 i = 0; i < dest.length; i++) {
            _call(dest[i], 0, func[i]);
        }
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    function addDeposit() public payable {
        (bool req, ) = address(entryPoint()).call{value: msg.value}("");
        require(req);
    }

    function withdrawDepositTo(address payable withdrawAddress, uint256 amount) public {
        // TODO verify
        entryPoint().withdrawTo(withdrawAddress, amount);
    }

    function _authorizeUpgrade(address /*newImplementation*/) internal virtual override {
        _onlyEntryPoint();
    }

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        // TODO
        return 0;
    }
}
