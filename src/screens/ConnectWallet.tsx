import React from 'react'

import {ConnectWallet} from 'src/components/ConnectWallet'
import {useTypedNavigation} from 'src/hooks'
import {MMSDK} from 'src/services'
import {connectMethodType} from 'src/types'

export function ConnectWalletScreen() {
  const {navigate} = useTypedNavigation()

  const walletConnectMethods: connectMethodType[] = [
    {
      name: 'MetaMask',
      async onConnect() {
        await MMSDK.getProvider().request({
          method: 'eth_requestAccounts',
        })
        navigate('home')
        // if(accounts[0]){
        //   navigate('home')
        // }
      },
      logoName: 'metamask',
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
      logoName: 'ledger',
      isAvailable: false,
    },
  ]

  return <ConnectWallet methodsList={walletConnectMethods} />
}
