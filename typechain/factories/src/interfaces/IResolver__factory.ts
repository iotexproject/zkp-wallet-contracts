/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IResolver,
  IResolverInterface,
} from "../../../src/interfaces/IResolver";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IResolver__factory {
  static readonly abi = _abi;
  static createInterface(): IResolverInterface {
    return new utils.Interface(_abi) as IResolverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IResolver {
    return new Contract(address, _abi, signerOrProvider) as IResolver;
  }
}