import {EventEmitter} from 'events'

// import {POLYGON_RPC_PROVIDER, POLYGON_TESTNET_RPC_PROVIDER} from '@env'
import {ethers} from 'ethers'

import {captureException} from 'src/helpers'

import {MMSDK} from './MMSDK'
import {NftTickets, NftTicketsAbi} from './prepared-contracts'

export const ticketsContractAddress: string = ''
export const ticketsMarketplaceContractAddress: string = ''

export class Contracts extends EventEmitter {
  provider: ethers.providers.JsonRpcProvider
  metamaskProvider: any

  constructor() {
    super()
    // if (__DEV__) {
    //   this.provider = new ethers.providers.JsonRpcProvider(
    //     POLYGON_TESTNET_RPC_PROVIDER,
    //   )
    // } else {
    //   this.provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_PROVIDER)
    // }
    const metamaskProvider = MMSDK.getProvider()

    this.metamaskProvider = metamaskProvider
    this.provider = new ethers.providers.Web3Provider(metamaskProvider)
  }
  async getBalance() {
    const balance = await this.provider.getBalance(
      this.metamaskProvider.selectedAddress,
    )

    return balance
  }

  async createTickets({
    amount,
    ipfsMetadataHash,
  }: {
    amount: number
    ipfsMetadataHash: string
  }) {
    try {
      const ticketsContract = this.getNftTicketsContractObject()

      const tx = await ticketsContract.createTicket(amount, ipfsMetadataHash)
      // Пока что я без понятия как отправить с подключенного аккаунта транзакцию
      // const txResponse = await signer.sendTransaction(tx)

      // console.log('🚀 - txResponse:', txResponse)
    } catch (error) {
      captureException(error)
    }
  }

  getNftTicketsContractObject() {
    const contract = new ethers.Contract(
      ticketsContractAddress,
      NftTicketsAbi,
      this.provider,
    ) as NftTickets

    return contract
  }
}

export const contracts = new Contracts()
