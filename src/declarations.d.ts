declare module '@env' {
  export const APP_SERVER_URL: string | undefined
  export const ALCHEMY_API_KEY: string | undefined
  export const POLYGON_TESTNET_RPC_PROVIDER: string | undefined
  export const POLYGON_RPC_PROVIDER: string | undefined
  export const PRIVATE_SECRET_KEY_1: string | undefined
  export const PRIVATE_SECRET_KEY_2: string | undefined
}

declare module '*.svg' {
  import React from 'react'

  import {SvgProps} from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
