import type {EventFragment, FunctionFragment, Result} from '@ethersproject/abi'
import type {Listener, Provider} from '@ethersproject/providers'
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'

import type {
  OnEvent,
  PromiseOrValue,
  TypedEvent,
  TypedEventFilter,
  TypedListener,
} from './common-types'

export interface NftTicketsInterface extends utils.Interface {
  functions: {
    'activeVerifications(bytes32)': FunctionFragment
    'balanceOf(address,uint256)': FunctionFragment
    'balanceOfBatch(address[],uint256[])': FunctionFragment
    'canCollectTicket(uint256)': FunctionFragment
    'changeTicketCollectors(uint256,address,bool)': FunctionFragment
    'createTicket(uint256,string)': FunctionFragment
    'getTicketCreator(uint256)': FunctionFragment
    'isApprovedForAll(address,address)': FunctionFragment
    'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)': FunctionFragment
    'safeTransferFrom(address,address,uint256,uint256,bytes)': FunctionFragment
    'setApprovalForAll(address,bool)': FunctionFragment
    'supportsInterface(bytes4)': FunctionFragment
    'uri(uint256)': FunctionFragment
    'useTickets(address,uint256,uint256)': FunctionFragment
    'verifyTickets(uint256,address,bytes32,bytes,bytes32)': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'activeVerifications'
      | 'balanceOf'
      | 'balanceOfBatch'
      | 'canCollectTicket'
      | 'changeTicketCollectors'
      | 'createTicket'
      | 'getTicketCreator'
      | 'isApprovedForAll'
      | 'safeBatchTransferFrom'
      | 'safeTransferFrom'
      | 'setApprovalForAll'
      | 'supportsInterface'
      | 'uri'
      | 'useTickets'
      | 'verifyTickets',
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: 'activeVerifications',
    values: [PromiseOrValue<BytesLike>],
  ): string
  encodeFunctionData(
    functionFragment: 'balanceOf',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string
  encodeFunctionData(
    functionFragment: 'balanceOfBatch',
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]],
  ): string
  encodeFunctionData(
    functionFragment: 'canCollectTicket',
    values: [PromiseOrValue<BigNumberish>],
  ): string
  encodeFunctionData(
    functionFragment: 'changeTicketCollectors',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
    ],
  ): string
  encodeFunctionData(
    functionFragment: 'createTicket',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>],
  ): string
  encodeFunctionData(
    functionFragment: 'getTicketCreator',
    values: [PromiseOrValue<BigNumberish>],
  ): string
  encodeFunctionData(
    functionFragment: 'isApprovedForAll',
    values: [PromiseOrValue<string>, PromiseOrValue<string>],
  ): string
  encodeFunctionData(
    functionFragment: 'safeBatchTransferFrom',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>,
    ],
  ): string
  encodeFunctionData(
    functionFragment: 'safeTransferFrom',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
    ],
  ): string
  encodeFunctionData(
    functionFragment: 'setApprovalForAll',
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>],
  ): string
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [PromiseOrValue<BytesLike>],
  ): string
  encodeFunctionData(
    functionFragment: 'uri',
    values: [PromiseOrValue<BigNumberish>],
  ): string
  encodeFunctionData(
    functionFragment: 'useTickets',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string
  encodeFunctionData(
    functionFragment: 'verifyTickets',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
    ],
  ): string

  decodeFunctionResult(
    functionFragment: 'activeVerifications',
    data: BytesLike,
  ): Result
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'balanceOfBatch',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'canCollectTicket',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'changeTicketCollectors',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'createTicket',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getTicketCreator',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'isApprovedForAll',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'safeBatchTransferFrom',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'safeTransferFrom',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'setApprovalForAll',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
    data: BytesLike,
  ): Result
  decodeFunctionResult(functionFragment: 'uri', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'useTickets', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'verifyTickets',
    data: BytesLike,
  ): Result

  events: {
    'ApprovalForAll(address,address,bool)': EventFragment
    'StaffCollectorsChanged(uint256,address,bool)': EventFragment
    'TicketCreated(address,uint256,uint256,string)': EventFragment
    'TicketsUsed(bytes32,address,uint256,uint256)': EventFragment
    'TicketsWasSuccessfullyUsed(bytes32)': EventFragment
    'TransferBatch(address,address,address,uint256[],uint256[])': EventFragment
    'TransferSingle(address,address,address,uint256,uint256)': EventFragment
    'URI(string,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'ApprovalForAll'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'StaffCollectorsChanged'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TicketCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TicketsUsed'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TicketsWasSuccessfullyUsed'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TransferBatch'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TransferSingle'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'URI'): EventFragment
}

export interface ApprovalForAllEventObject {
  account: string
  operator: string
  approved: boolean
}
export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  ApprovalForAllEventObject
>

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>

export interface StaffCollectorsChangedEventObject {
  ticketID: BigNumber
  collector: string
  canCollectTickets: boolean
}
export type StaffCollectorsChangedEvent = TypedEvent<
  [BigNumber, string, boolean],
  StaffCollectorsChangedEventObject
>

export type StaffCollectorsChangedEventFilter =
  TypedEventFilter<StaffCollectorsChangedEvent>

export interface TicketCreatedEventObject {
  owner: string
  ticketID: BigNumber
  amount: BigNumber
  ipfsHash: string
}
export type TicketCreatedEvent = TypedEvent<
  [string, BigNumber, BigNumber, string],
  TicketCreatedEventObject
>

export type TicketCreatedEventFilter = TypedEventFilter<TicketCreatedEvent>

export interface TicketsUsedEventObject {
  message: string
  collector: string
  ticketID: BigNumber
  amountOfTickets: BigNumber
}
export type TicketsUsedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  TicketsUsedEventObject
>

export type TicketsUsedEventFilter = TypedEventFilter<TicketsUsedEvent>

export interface TicketsWasSuccessfullyUsedEventObject {
  ethSignedMessage: string
}
export type TicketsWasSuccessfullyUsedEvent = TypedEvent<
  [string],
  TicketsWasSuccessfullyUsedEventObject
>

export type TicketsWasSuccessfullyUsedEventFilter =
  TypedEventFilter<TicketsWasSuccessfullyUsedEvent>

export interface TransferBatchEventObject {
  operator: string
  from: string
  to: string
  ids: BigNumber[]
  values: BigNumber[]
}
export type TransferBatchEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber[]],
  TransferBatchEventObject
>

export type TransferBatchEventFilter = TypedEventFilter<TransferBatchEvent>

export interface TransferSingleEventObject {
  operator: string
  from: string
  to: string
  id: BigNumber
  value: BigNumber
}
export type TransferSingleEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  TransferSingleEventObject
>

export type TransferSingleEventFilter = TypedEventFilter<TransferSingleEvent>

export interface URIEventObject {
  value: string
  id: BigNumber
}
export type URIEvent = TypedEvent<[string, BigNumber], URIEventObject>

export type URIEventFilter = TypedEventFilter<URIEvent>

export interface NftTickets extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: NftTicketsInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    activeVerifications(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<
      [string, BigNumber, boolean] & {
        collector: string
        amount: BigNumber
        ready: boolean
      }
    >

    balanceOf(
      account: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>

    balanceOfBatch(
      accounts: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides,
    ): Promise<[BigNumber[]]>

    canCollectTicket(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>

    changeTicketCollectors(
      ticketId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      canCollectTickets: PromiseOrValue<boolean>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<ContractTransaction>

    createTicket(
      amount: PromiseOrValue<BigNumberish>,
      ipfsHash: PromiseOrValue<string>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<ContractTransaction>

    getTicketCreator(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string]>

    isApprovedForAll(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>

    safeBatchTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<ContractTransaction>

    safeTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<ContractTransaction>

    setApprovalForAll(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<ContractTransaction>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>

    uri(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string]>

    useTickets(
      collector: PromiseOrValue<string>,
      ticketId: PromiseOrValue<BigNumberish>,
      amountOfTickets: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<ContractTransaction>

    verifyTickets(
      ticketID: PromiseOrValue<BigNumberish>,
      signer: PromiseOrValue<string>,
      message: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<ContractTransaction>
  }

  activeVerifications(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides,
  ): Promise<
    [string, BigNumber, boolean] & {
      collector: string
      amount: BigNumber
      ready: boolean
    }
  >

  balanceOf(
    account: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  balanceOfBatch(
    accounts: PromiseOrValue<string>[],
    ids: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>

  canCollectTicket(
    ticketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<boolean>

  changeTicketCollectors(
    ticketId: PromiseOrValue<BigNumberish>,
    collector: PromiseOrValue<string>,
    canCollectTickets: PromiseOrValue<boolean>,
    overrides?: Overrides & {from?: PromiseOrValue<string>},
  ): Promise<ContractTransaction>

  createTicket(
    amount: PromiseOrValue<BigNumberish>,
    ipfsHash: PromiseOrValue<string>,
    overrides?: Overrides & {from?: PromiseOrValue<string>},
  ): Promise<ContractTransaction>

  getTicketCreator(
    ticketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<string>

  isApprovedForAll(
    account: PromiseOrValue<string>,
    operator: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<boolean>

  safeBatchTransferFrom(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    ids: PromiseOrValue<BigNumberish>[],
    amounts: PromiseOrValue<BigNumberish>[],
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {from?: PromiseOrValue<string>},
  ): Promise<ContractTransaction>

  safeTransferFrom(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {from?: PromiseOrValue<string>},
  ): Promise<ContractTransaction>

  setApprovalForAll(
    operator: PromiseOrValue<string>,
    approved: PromiseOrValue<boolean>,
    overrides?: Overrides & {from?: PromiseOrValue<string>},
  ): Promise<ContractTransaction>

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides,
  ): Promise<boolean>

  uri(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<string>

  useTickets(
    collector: PromiseOrValue<string>,
    ticketId: PromiseOrValue<BigNumberish>,
    amountOfTickets: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & {from?: PromiseOrValue<string>},
  ): Promise<ContractTransaction>

  verifyTickets(
    ticketID: PromiseOrValue<BigNumberish>,
    signer: PromiseOrValue<string>,
    message: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>,
    key: PromiseOrValue<BytesLike>,
    overrides?: Overrides & {from?: PromiseOrValue<string>},
  ): Promise<ContractTransaction>

  callStatic: {
    activeVerifications(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<
      [string, BigNumber, boolean] & {
        collector: string
        amount: BigNumber
        ready: boolean
      }
    >

    balanceOf(
      account: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    balanceOfBatch(
      accounts: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>

    canCollectTicket(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>

    changeTicketCollectors(
      ticketId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      canCollectTickets: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<void>

    createTicket(
      amount: PromiseOrValue<BigNumberish>,
      ipfsHash: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getTicketCreator(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>

    isApprovedForAll(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<boolean>

    safeBatchTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>

    safeTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>

    setApprovalForAll(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<void>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<boolean>

    uri(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>

    useTickets(
      collector: PromiseOrValue<string>,
      ticketId: PromiseOrValue<BigNumberish>,
      amountOfTickets: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string, string] & {message: string; key: string}>

    verifyTickets(
      ticketID: PromiseOrValue<BigNumberish>,
      signer: PromiseOrValue<string>,
      message: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<boolean>
  }

  filters: {
    'ApprovalForAll(address,address,bool)'(
      account?: PromiseOrValue<string> | null,
      operator?: PromiseOrValue<string> | null,
      approved?: null,
    ): ApprovalForAllEventFilter
    ApprovalForAll(
      account?: PromiseOrValue<string> | null,
      operator?: PromiseOrValue<string> | null,
      approved?: null,
    ): ApprovalForAllEventFilter

    'StaffCollectorsChanged(uint256,address,bool)'(
      ticketID?: PromiseOrValue<BigNumberish> | null,
      collector?: PromiseOrValue<string> | null,
      canCollectTickets?: null,
    ): StaffCollectorsChangedEventFilter
    StaffCollectorsChanged(
      ticketID?: PromiseOrValue<BigNumberish> | null,
      collector?: PromiseOrValue<string> | null,
      canCollectTickets?: null,
    ): StaffCollectorsChangedEventFilter

    'TicketCreated(address,uint256,uint256,string)'(
      owner?: PromiseOrValue<string> | null,
      ticketID?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      ipfsHash?: PromiseOrValue<string> | null,
    ): TicketCreatedEventFilter
    TicketCreated(
      owner?: PromiseOrValue<string> | null,
      ticketID?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      ipfsHash?: PromiseOrValue<string> | null,
    ): TicketCreatedEventFilter

    'TicketsUsed(bytes32,address,uint256,uint256)'(
      message?: null,
      collector?: PromiseOrValue<string> | null,
      ticketID?: PromiseOrValue<BigNumberish> | null,
      amountOfTickets?: null,
    ): TicketsUsedEventFilter
    TicketsUsed(
      message?: null,
      collector?: PromiseOrValue<string> | null,
      ticketID?: PromiseOrValue<BigNumberish> | null,
      amountOfTickets?: null,
    ): TicketsUsedEventFilter

    'TicketsWasSuccessfullyUsed(bytes32)'(
      ethSignedMessage?: null,
    ): TicketsWasSuccessfullyUsedEventFilter
    TicketsWasSuccessfullyUsed(
      ethSignedMessage?: null,
    ): TicketsWasSuccessfullyUsedEventFilter

    'TransferBatch(address,address,address,uint256[],uint256[])'(
      operator?: PromiseOrValue<string> | null,
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      ids?: null,
      values?: null,
    ): TransferBatchEventFilter
    TransferBatch(
      operator?: PromiseOrValue<string> | null,
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      ids?: null,
      values?: null,
    ): TransferBatchEventFilter

    'TransferSingle(address,address,address,uint256,uint256)'(
      operator?: PromiseOrValue<string> | null,
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      id?: null,
      value?: null,
    ): TransferSingleEventFilter
    TransferSingle(
      operator?: PromiseOrValue<string> | null,
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      id?: null,
      value?: null,
    ): TransferSingleEventFilter

    'URI(string,uint256)'(
      value?: null,
      id?: PromiseOrValue<BigNumberish> | null,
    ): URIEventFilter
    URI(value?: null, id?: PromiseOrValue<BigNumberish> | null): URIEventFilter
  }

  estimateGas: {
    activeVerifications(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    balanceOf(
      account: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    balanceOfBatch(
      accounts: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    canCollectTicket(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    changeTicketCollectors(
      ticketId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      canCollectTickets: PromiseOrValue<boolean>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<BigNumber>

    createTicket(
      amount: PromiseOrValue<BigNumberish>,
      ipfsHash: PromiseOrValue<string>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<BigNumber>

    getTicketCreator(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    isApprovedForAll(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    safeBatchTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<BigNumber>

    safeTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<BigNumber>

    setApprovalForAll(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<BigNumber>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    uri(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    useTickets(
      collector: PromiseOrValue<string>,
      ticketId: PromiseOrValue<BigNumberish>,
      amountOfTickets: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<BigNumber>

    verifyTickets(
      ticketID: PromiseOrValue<BigNumberish>,
      signer: PromiseOrValue<string>,
      message: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<BigNumber>
  }

  populateTransaction: {
    activeVerifications(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    balanceOf(
      account: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    balanceOfBatch(
      accounts: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    canCollectTicket(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    changeTicketCollectors(
      ticketId: PromiseOrValue<BigNumberish>,
      collector: PromiseOrValue<string>,
      canCollectTickets: PromiseOrValue<boolean>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<PopulatedTransaction>

    createTicket(
      amount: PromiseOrValue<BigNumberish>,
      ipfsHash: PromiseOrValue<string>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<PopulatedTransaction>

    getTicketCreator(
      ticketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    isApprovedForAll(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    safeBatchTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<PopulatedTransaction>

    safeTransferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<PopulatedTransaction>

    setApprovalForAll(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<PopulatedTransaction>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    uri(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    useTickets(
      collector: PromiseOrValue<string>,
      ticketId: PromiseOrValue<BigNumberish>,
      amountOfTickets: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<PopulatedTransaction>

    verifyTickets(
      ticketID: PromiseOrValue<BigNumberish>,
      signer: PromiseOrValue<string>,
      message: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & {from?: PromiseOrValue<string>},
    ): Promise<PopulatedTransaction>
  }
}

export const NftTicketsAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ticketsContractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'InsufficientTickets',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotApprovedForMarketplace',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlySellerCanDoThis',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PriceMustBeAboveZero',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'ItemBought',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'ticketId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pricePerUnit',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'offerID',
        type: 'uint256',
      },
    ],
    name: 'OfferCreate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'ticketId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'offerID',
        type: 'uint256',
      },
    ],
    name: 'OfferRevoked',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'ticketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'offerID',
        type: 'uint256',
      },
    ],
    name: 'cancelListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'ticketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pricePerUnit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sellAmount',
        type: 'uint256',
      },
    ],
    name: 'listTickets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
