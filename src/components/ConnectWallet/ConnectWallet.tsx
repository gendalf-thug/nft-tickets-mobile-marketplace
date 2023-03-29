import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {connectMethodType} from 'src/types'

import {ConnectWalletButton} from './ConnectWalletButton'

import {Background, Spacer, Text} from '../ui'
import {AppLogo} from '../ui/icons/AppLogo'

export function ConnectWallet({
  methodsList,
}: {
  methodsList: connectMethodType[]
}) {
  const {top} = useSafeAreaInsets()

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <Spacer height={top + 50} />
        <AppLogo height={100} />
        <Spacer height={40} />
        <Text center h1>
          Подключитe кошелек
        </Text>
        <Spacer height={12} />
        <Text center p1>
          Интегрируйтесь с одним из доступных у нас поставщиков кошельков.
        </Text>
        <Spacer height={12} />
        {methodsList.map((item, id) => {
          return (
            <ConnectWalletButton
              style={styles.buttonMargin}
              {...item}
              key={id}
            />
          )
        })}
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonMargin: {
    marginVertical: 12,
  },
})
