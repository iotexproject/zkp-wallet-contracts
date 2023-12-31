/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export interface IReverseRegistrarInterface extends utils.Interface {
  functions: {
    "setNameForAddr(address,address,address,string)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "setNameForAddr"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "setNameForAddr",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "setNameForAddr",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IReverseRegistrar extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IReverseRegistrarInterface;

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
    setNameForAddr(
      addr: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  setNameForAddr(
    addr: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    resolver: PromiseOrValue<string>,
    name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    setNameForAddr(
      addr: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    setNameForAddr(
      addr: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    setNameForAddr(
      addr: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      resolver: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
