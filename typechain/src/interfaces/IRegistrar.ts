/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IRegistrarInterface extends utils.Interface {
  functions: {
    "commit(bytes32)": FunctionFragment;
    "makeCommitment(string,address,uint256,bytes32,address,bytes[],bool,uint16)": FunctionFragment;
    "register(string,address,uint256,bytes32,address,bytes[],bool,uint16)": FunctionFragment;
    "rentPrice(string,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "commit"
      | "makeCommitment"
      | "register"
      | "rentPrice"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "commit",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "makeCommitment",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "rentPrice",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "makeCommitment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;

  events: {};
}

export interface IRegistrar extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRegistrarInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    commit(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    makeCommitment(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    register(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rentPrice(
      name: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { base: BigNumber; premium: BigNumber }
    >;
  };

  commit(
    commitment: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  makeCommitment(
    name: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    duration: PromiseOrValue<BigNumberish>,
    secret: PromiseOrValue<BytesLike>,
    resolver: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>[],
    reverseRecord: PromiseOrValue<boolean>,
    ownerControlledFuses: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  register(
    name: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    duration: PromiseOrValue<BigNumberish>,
    secret: PromiseOrValue<BytesLike>,
    resolver: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>[],
    reverseRecord: PromiseOrValue<boolean>,
    ownerControlledFuses: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rentPrice(
    name: PromiseOrValue<string>,
    duration: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { base: BigNumber; premium: BigNumber }>;

  callStatic: {
    commit(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    makeCommitment(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    register(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    rentPrice(
      name: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { base: BigNumber; premium: BigNumber }
    >;
  };

  filters: {};

  estimateGas: {
    commit(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    makeCommitment(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    register(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rentPrice(
      name: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    commit(
      commitment: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    makeCommitment(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    register(
      name: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      secret: PromiseOrValue<BytesLike>,
      resolver: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>[],
      reverseRecord: PromiseOrValue<boolean>,
      ownerControlledFuses: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rentPrice(
      name: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}