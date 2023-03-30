import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-deploy'
import 'solidity-coverage'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
import 'dotenv/config'
import {HardhatUserConfig} from 'hardhat/config'

const PRIVATE_KEY_1 = process.env.WALLET_PRIVATE_KEY_1 || '0x'
const PRIVATE_KEY_2 = process.env.WALLET_PRIVATE_KEY_2 || '0x'

const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || 'Your etherscan API key'
const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || 'Your polygonscan API key'
const REPORT_GAS = process.env.REPORT_GAS || false

export default {
  defaultNetwork: 'hardhat',
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
      saveDeployments: true,
      chainId: 5,
    },
    mainnet: {
      url: process.env.ETHER_RPC_URL,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
      saveDeployments: true,
      chainId: 1,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
      saveDeployments: true,
      chainId: 137,
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: ['NftMarketplace'],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
      },
      {
        version: '0.4.24',
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
} as HardhatUserConfig
