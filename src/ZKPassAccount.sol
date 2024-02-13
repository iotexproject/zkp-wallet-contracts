// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/samples/callback/TokenCallbackHandler.sol";

import "./interfaces/IEmailGuardian.sol";
import "./interfaces/IVerifier.sol";

contract ZKPassAccount is BaseAccount, TokenCallbackHandler, UUPSUpgradeable, Initializable {
    event ZKPassAccountInitialized(IEntryPoint indexed entryPoint, bytes32 indexed namaHash, uint256 indexed passHash);
    event EmailGuardianAdded(bytes32 indexed email);
    event PasswordChanged(uint256 indexed passHash);
    event AccountRecovered(uint256 indexed passHash);
    event AccountPendingRecovey(uint256 timestamp, bytes target);
    event AccountRecoveryStopped();

    uint256 immutable SNARK_SCALAR_FIELD =
        21888242871839275222246405745257275088548364400416034343698204186575808495617;

    IEntryPoint private immutable _entryPoint;
    IVerifier private immutable _verifier;
    IEmailGuardian private immutable _emailGuardian;

    struct RecoveryData {
        uint256 timestamp;
        bytes target;
    }

    RecoveryData public pendingTarget;
    // owner only for register INS name
    address public owner;
    bytes32 public nameHash;
    uint256 public passHash;

    // email hash for recovery
    bytes32 public email;

    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    modifier onlyEntryPoint() {
        _onlyEntryPoint();
        _;
    }

    constructor(IEntryPoint anEntryPoint, IVerifier aVerifier, IEmailGuardian anEmailGuardian) {
        _entryPoint = anEntryPoint;
        _verifier = aVerifier;
        _emailGuardian = anEmailGuardian;
    }

    function _onlyEntryPoint() internal view {
        require(msg.sender == address(entryPoint()), "account: not EntryPoint");
    }

    function initialize(bytes32 _nameHash, uint256 _passHash, address _owner) public virtual initializer {
        nameHash = _nameHash;
        passHash = _passHash;
        owner = _owner;
        emit ZKPassAccountInitialized(_entryPoint, _nameHash, _passHash);
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

    function changePassword(uint256 _passHash) external {
        require(address(this) == msg.sender, "only owner");
        passHash = _passHash;
        emit PasswordChanged(_passHash);
    }

    function withdrawDepositTo(address payable withdrawAddress, uint256 amount) public {
        require(address(this) == msg.sender, "only owner");
        entryPoint().withdrawTo(withdrawAddress, amount);
    }

    function _authorizeUpgrade(address /*newImplementation*/) internal virtual override {
        require(address(this) == msg.sender, "only owner");
    }

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    function verifier() public view returns (IVerifier) {
        return _verifier;
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        if (!verifyProof(userOp.signature, uint256(userOpHash))) {
            return SIG_VALIDATION_FAILED;
        }
        return 0;
    }

    function verifyProof(bytes calldata _proof, uint256 _opHash) public view returns (bool) {
        uint256[2] memory a;
        uint256[2][2] memory b;
        uint256[2] memory c;
        {
            (
                uint256 proof0,
                uint256 proof1,
                uint256 proof2,
                uint256 proof3,
                uint256 proof4,
                uint256 proof5,
                uint256 proof6,
                uint256 proof7
            ) = abi.decode(_proof[:256], (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256));
            a = [proof0, proof1];
            b = [[proof2, proof3], [proof4, proof5]];
            c = [proof6, proof7];
        }
        uint256 opProof = uint256(bytes32(_proof[256:]));

        _opHash %= SNARK_SCALAR_FIELD;

        uint256[4] memory input = [passHash, opProof, getNonce(), _opHash];
        return _verifier.verifyProof(a, b, c, input);
    }

    function addEmailGuardian(bytes32 _email) external {
        require(address(this) == msg.sender, "only owner");
        email = _email;
        emit EmailGuardianAdded(_email);
    }

    function toBytes(uint256 x) public pure returns (bytes memory b) {
        b = new bytes(32);
        assembly {
            mstore(add(b, 32), x)
        }
    }

    function pendingRecovery(
        bytes32 _server,
        bytes calldata _data,
        bytes calldata _signature,
        bytes calldata _target
    ) external {
        require(_emailGuardian.verify(_server, address(this), _data, _signature, _target), "invalid dkim data");

        pendingTarget = RecoveryData({timestamp: block.timestamp, target: _target});
        emit AccountPendingRecovey(block.timestamp, _target);
    }

    function stopRecovery() external {
        require(address(this) == msg.sender, "only owner");
        require(pendingTarget.timestamp > 0, "no recovery");

        pendingTarget.timestamp = 0;
        emit AccountRecoveryStopped();
    }

    function recovery() external {
        require(
            pendingTarget.timestamp > 0 && pendingTarget.timestamp + 86400 < block.timestamp,
            "invalid recovery time"
        );
        passHash = uint256(bytes32(pendingTarget.target));
        pendingTarget.timestamp = 0;

        emit AccountRecovered(passHash);
    }
}
