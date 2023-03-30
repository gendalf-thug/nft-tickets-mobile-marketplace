import {HardhatUserConfig} from 'hardhat/config'
import 'hardhat-gas-reporter'
import 'dotenv/config'
import '@nomicfoundation/hardhat-toolbox'

const PRIVATE_KEY_1 = process.env.WALLET_PRIVATE_KEY_1 || '0x'
const PRIVATE_KEY_2 = process.env.WALLET_PRIVATE_KEY_2 || '0x'

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
      chainId: 5,
    },
    mainnet: {
      url: process.env.ETHER_RPC_URL,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
      chainId: 1,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
      chainId: 137,
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
}

export default config
