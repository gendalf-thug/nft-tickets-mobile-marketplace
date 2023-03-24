import * as React from 'react'

import {useWalletConnect} from '@walletconnect/react-native-dapp'
import Svg, {
  Defs,
  G,
  Mask,
  Path,
  RadialGradient,
  Stop,
  SvgProps,
} from 'react-native-svg'

import {connectMethodType} from 'src/types'

import {useTheme} from './useTheme'
import {useTypedNavigation} from './useTypedNavigation'

export function useWalletConnectMethods() {
  const connectorWC = useWalletConnect()
  const {navigate} = useTypedNavigation()

  const walletConnectMethods: connectMethodType[] = [
    {
      name: 'Wallet Connect',
      async onConnect() {
        if (__DEV__) {
          navigate('home')
          return
        }
        const res = await connectorWC.connect()
        if (res.accounts.length > 0) {
          navigate('home')
        }
      },
      Logo: WCLogo,
      isAvailable: true,
    },
    {
      name: 'Ledger',
      async onConnect() {
        // const res = await connectorWC.connect();
        // if (res.accounts.length > 0) {
        //   navigate('home');
        // }
      },
      Logo: LedgerLogo,
      isAvailable: false,
    },
  ]
  return walletConnectMethods
}
// Use: https://react-svgr.com/playground/?icon=true&native=true&typescript=true
function WCLogo(props: SvgProps) {
  return (
    <Svg width={30} height={30} fill="none" viewBox="0 0 100 101" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 .9c27.617 0 50 22.383 50 50s-22.383 50-50 50-50-22.383-50-50S22.383.9 50 .9Z"
        fill="url(#a)"
      />
      <Path
        d="M31.777 39.513c10.059-9.824 26.387-9.824 36.446 0l1.21 1.192c.508.488.508 1.289 0 1.777l-4.14 4.043a.648.648 0 0 1-.918 0l-1.66-1.621c-7.031-6.856-18.399-6.856-25.43 0l-1.777 1.738a.648.648 0 0 1-.918 0L30.45 42.6a1.227 1.227 0 0 1 0-1.777l1.327-1.309Zm45.02 8.36 3.691 3.593c.508.489.508 1.29 0 1.778l-16.62 16.23c-.509.488-1.329.488-1.817 0L50.254 57.951a.33.33 0 0 0-.45 0L38.009 69.474c-.508.488-1.328.488-1.817 0l-16.68-16.23a1.227 1.227 0 0 1 0-1.778l3.692-3.593c.508-.489 1.328-.489 1.817 0l11.796 11.523a.33.33 0 0 0 .45 0l11.797-11.523c.507-.489 1.328-.489 1.816 0l11.797 11.523a.33.33 0 0 0 .449 0l11.797-11.523c.547-.489 1.367-.489 1.875 0Z"
        fill="#fff"
      />
      <Defs>
        <RadialGradient
          id="a"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(100 0 0 100 0 50.901)">
          <Stop stopColor="#5D9DF6" />
          <Stop offset={1} stopColor="#006FFF" />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

function LedgerLogo(props: SvgProps) {
  const {colors} = useTheme()
  return (
    <Svg width={30} height={30} fill="none" viewBox="0 0 100 101" {...props}>
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={7}
        width={100}
        height={88}>
        <Path d="M100 7.567H0V94.69h100V7.567Z" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M0 69.952V94.69h37.614v-5.487H5.48V69.952H0Zm94.52 0v19.252H62.385v5.485H100V69.952h-5.48ZM37.668 32.305v37.646h24.717v-4.948H43.149V32.305h-5.48ZM0 7.567v24.738h5.48V13.052h32.134V7.567H0Zm62.386 0v5.485h32.133v19.253H100V7.567H62.386Z"
          fill={colors.textBase1}
        />
      </G>
    </Svg>
  )
}
