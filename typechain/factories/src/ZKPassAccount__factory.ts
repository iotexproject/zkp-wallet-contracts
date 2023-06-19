/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ZKPassAccount,
  ZKPassAccountInterface,
} from "../../src/ZKPassAccount";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEntryPoint",
        name: "anEntryPoint",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "addDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "entryPoint",
    outputs: [
      {
        internalType: "contract IEntryPoint",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dest",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "func",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "dest",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "func",
        type: "bytes[]",
      },
    ],
    name: "executeBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_nameHash",
        type: "bytes32",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "tokensReceived",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "missingAccountFunds",
        type: "uint256",
      },
    ],
    name: "validateUserOp",
    outputs: [
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawDepositTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60c06040523060805234801561001457600080fd5b50604051611dac380380611dac83398101604081905261003391610044565b6001600160a01b031660a052610074565b60006020828403121561005657600080fd5b81516001600160a01b038116811461006d57600080fd5b9392505050565b60805160a051611ccd6100df600039600081816102f4015281816107d70152818161086201528181610da801528181610e6601528181610ead01526111890152600081816105fc0152818161069201528181610926015281816109bc0152610aeb0152611ccd6000f3fe6080604052600436106101115760003560e01c80634f1ef286116100a5578063b61d27f611610074578063c399ec8811610059578063c399ec8814610386578063d087d2881461039b578063f23a6e61146103b057600080fd5b8063b61d27f61461031e578063bc197c811461033e57600080fd5b80634f1ef2861461028557806352d1902d146102985780639498bd71146102ad578063b0d691fe146102cd57600080fd5b80633659cfe6116100e15780633659cfe61461020f5780633a871cdd1461022f5780634a58db191461025d5780634d44560d1461026557600080fd5b806223de291461011d57806301ffc9a714610144578063150b7a021461017957806318dfb3c7146101ef57600080fd5b3661011857005b600080fd5b34801561012957600080fd5b5061014261013836600461158b565b5050505050505050565b005b34801561015057600080fd5b5061016461015f36600461163c565b6103f6565b60405190151581526020015b60405180910390f35b34801561018557600080fd5b506101be61019436600461167e565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff000000000000000000000000000000000000000000000000000000009091168152602001610170565b3480156101fb57600080fd5b5061014261020a366004611736565b6104db565b34801561021b57600080fd5b5061014261022a3660046117a2565b6105e5565b34801561023b57600080fd5b5061024f61024a3660046117bf565b6107b6565b604051908152602001610170565b6101426107d3565b34801561027157600080fd5b50610142610280366004611813565b610860565b61014261029336600461186e565b61090f565b3480156102a457600080fd5b5061024f610ad1565b3480156102b957600080fd5b506101426102c8366004611950565b610ba3565b3480156102d957600080fd5b5060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152602001610170565b34801561032a57600080fd5b50610142610339366004611969565b610d13565b34801561034a57600080fd5b506101be6103593660046119b9565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b34801561039257600080fd5b5061024f610d62565b3480156103a757600080fd5b5061024f610e19565b3480156103bc57600080fd5b506101be6103cb366004611a57565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000148061048957507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b806104d557507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b6104e3610e95565b8281146105375760405162461bcd60e51b815260206004820152601360248201527f77726f6e67206172726179206c656e677468730000000000000000000000000060448201526064015b60405180910390fd5b60005b838110156105de576105cc85858381811061055757610557611ad3565b905060200201602081019061056c91906117a2565b600085858581811061058057610580611ad3565b90506020028101906105929190611b02565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f1c92505050565b806105d681611b67565b91505061053a565b5050505050565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001630036106905760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c0000000000000000000000000000000000000000606482015260840161052e565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166107057f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff161461078e5760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f78790000000000000000000000000000000000000000606482015260840161052e565b61079781610f99565b604080516000808252602082019092526107b391839190610fa1565b50565b60006107c0611171565b5060006107cc826111f6565b9392505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163460405160006040518083038185875af1925050503d806000811461084d576040519150601f19603f3d011682016040523d82523d6000602084013e610852565b606091505b50509050806107b357600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006040517f205c287800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260248201849052919091169063205c287890604401600060405180830381600087803b1580156108f357600080fd5b505af1158015610907573d6000803e3d6000fd5b505050505050565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001630036109ba5760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c0000000000000000000000000000000000000000606482015260840161052e565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610a2f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610ab85760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f78790000000000000000000000000000000000000000606482015260840161052e565b610ac182610f99565b610acd82826001610fa1565b5050565b60003073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610b7e5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840161052e565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b600054610100900460ff1615808015610bc35750600054600160ff909116105b80610bdd5750303b158015610bdd575060005460ff166001145b610c4f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161052e565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790558015610cad57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b8015610acd57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b610d1b610e95565b610d5c848484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f1c92505050565b50505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906370a08231906024015b602060405180830381865afa158015610df0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e149190611bc6565b905090565b6040517f35567e1a0000000000000000000000000000000000000000000000000000000081523060048201526000602482018190529073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906335567e1a90604401610dd3565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610f1a5760405162461bcd60e51b815260206004820152601760248201527f6163636f756e743a206e6f7420456e747279506f696e74000000000000000000604482015260640161052e565b565b6000808473ffffffffffffffffffffffffffffffffffffffff168484604051610f459190611c03565b60006040518083038185875af1925050503d8060008114610f82576040519150601f19603f3d011682016040523d82523d6000602084013e610f87565b606091505b5091509150816105de57805160208201fd5b6107b3610e95565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610fd957610fd483611261565b505050565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561105e575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261105b91810190611bc6565b60015b6110d05760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f742055555053000000000000000000000000000000000000606482015260840161052e565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc81146111655760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c65555549440000000000000000000000000000000000000000000000606482015260840161052e565b50610fd4838383611351565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610f1a5760405162461bcd60e51b815260206004820152601c60248201527f6163636f756e743a206e6f742066726f6d20456e747279506f696e7400000000604482015260640161052e565b80156107b35760405160009033907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90849084818181858888f193505050503d80600081146105de576040519150601f19603f3d011682016040523d82523d6000602084013e6105de565b73ffffffffffffffffffffffffffffffffffffffff81163b6112eb5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e747261637400000000000000000000000000000000000000606482015260840161052e565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b61135a83611376565b6000825111806113675750805b15610fd457610d5c83836113c3565b61137f81611261565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606107cc8383604051806060016040528060278152602001611c716027913960606000808573ffffffffffffffffffffffffffffffffffffffff168560405161140d9190611c03565b600060405180830381855af49150503d8060008114611448576040519150601f19603f3d011682016040523d82523d6000602084013e61144d565b606091505b509150915061145e86838387611468565b9695505050505050565b606083156114e45782516000036114dd5773ffffffffffffffffffffffffffffffffffffffff85163b6114dd5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161052e565b50816114ee565b6114ee83836114f6565b949350505050565b8151156115065781518083602001fd5b8060405162461bcd60e51b815260040161052e9190611c1f565b73ffffffffffffffffffffffffffffffffffffffff811681146107b357600080fd5b60008083601f84011261155457600080fd5b50813567ffffffffffffffff81111561156c57600080fd5b60208301915083602082850101111561158457600080fd5b9250929050565b60008060008060008060008060c0898b0312156115a757600080fd5b88356115b281611520565b975060208901356115c281611520565b965060408901356115d281611520565b955060608901359450608089013567ffffffffffffffff808211156115f657600080fd5b6116028c838d01611542565b909650945060a08b013591508082111561161b57600080fd5b506116288b828c01611542565b999c989b5096995094979396929594505050565b60006020828403121561164e57600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146107cc57600080fd5b60008060008060006080868803121561169657600080fd5b85356116a181611520565b945060208601356116b181611520565b935060408601359250606086013567ffffffffffffffff8111156116d457600080fd5b6116e088828901611542565b969995985093965092949392505050565b60008083601f84011261170357600080fd5b50813567ffffffffffffffff81111561171b57600080fd5b6020830191508360208260051b850101111561158457600080fd5b6000806000806040858703121561174c57600080fd5b843567ffffffffffffffff8082111561176457600080fd5b611770888389016116f1565b9096509450602087013591508082111561178957600080fd5b50611796878288016116f1565b95989497509550505050565b6000602082840312156117b457600080fd5b81356107cc81611520565b6000806000606084860312156117d457600080fd5b833567ffffffffffffffff8111156117eb57600080fd5b840161016081870312156117fe57600080fd5b95602085013595506040909401359392505050565b6000806040838503121561182657600080fd5b823561183181611520565b946020939093013593505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806040838503121561188157600080fd5b823561188c81611520565b9150602083013567ffffffffffffffff808211156118a957600080fd5b818501915085601f8301126118bd57600080fd5b8135818111156118cf576118cf61183f565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156119155761191561183f565b8160405282815288602084870101111561192e57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60006020828403121561196257600080fd5b5035919050565b6000806000806060858703121561197f57600080fd5b843561198a81611520565b935060208501359250604085013567ffffffffffffffff8111156119ad57600080fd5b61179687828801611542565b60008060008060008060008060a0898b0312156119d557600080fd5b88356119e081611520565b975060208901356119f081611520565b9650604089013567ffffffffffffffff80821115611a0d57600080fd5b611a198c838d016116f1565b909850965060608b0135915080821115611a3257600080fd5b611a3e8c838d016116f1565b909650945060808b013591508082111561161b57600080fd5b60008060008060008060a08789031215611a7057600080fd5b8635611a7b81611520565b95506020870135611a8b81611520565b94506040870135935060608701359250608087013567ffffffffffffffff811115611ab557600080fd5b611ac189828a01611542565b979a9699509497509295939492505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112611b3757600080fd5b83018035915067ffffffffffffffff821115611b5257600080fd5b60200191503681900382131561158457600080fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611bbf577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b600060208284031215611bd857600080fd5b5051919050565b60005b83811015611bfa578181015183820152602001611be2565b50506000910152565b60008251611c15818460208701611bdf565b9190910192915050565b6020815260008251806020840152611c3e816040850160208701611bdf565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220e6a115e4b1fe6417ba03e6c160f49fdfe8b80fff29d8622335c56c9f2204d7f964736f6c63430008110033";

type ZKPassAccountConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZKPassAccountConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZKPassAccount__factory extends ContractFactory {
  constructor(...args: ZKPassAccountConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    anEntryPoint: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZKPassAccount> {
    return super.deploy(
      anEntryPoint,
      overrides || {}
    ) as Promise<ZKPassAccount>;
  }
  override getDeployTransaction(
    anEntryPoint: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(anEntryPoint, overrides || {});
  }
  override attach(address: string): ZKPassAccount {
    return super.attach(address) as ZKPassAccount;
  }
  override connect(signer: Signer): ZKPassAccount__factory {
    return super.connect(signer) as ZKPassAccount__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZKPassAccountInterface {
    return new utils.Interface(_abi) as ZKPassAccountInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZKPassAccount {
    return new Contract(address, _abi, signerOrProvider) as ZKPassAccount;
  }
}
