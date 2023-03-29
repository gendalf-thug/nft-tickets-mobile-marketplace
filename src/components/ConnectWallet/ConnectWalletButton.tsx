import React from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

import {Spacer, Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {connectMethodType} from 'src/types'

import {ConnectMethodLogos} from '../ui/icons/connect-method-logos'

interface ConnectWalletButtonProps extends connectMethodType {
  style?: StyleProp<ViewStyle>
}

export function ConnectWalletButton({
  name,
  onConnect,
  isAvailable,
  logoName,
  style,
}: ConnectWalletButtonProps) {
  const {styles} = useThematicStyles(rawStyles)

  const Logo = ConnectMethodLogos[logoName]

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onConnect}
      disabled={!isAvailable}
      activeOpacity={0.7}>
      <Logo height={30} width={30} />
      <Spacer width={16} />
      <Text style={styles.nameText} h3>
        {name}
      </Text>
      <Spacer />
      <Text color={isAvailable ? Color.primary : Color.inactive} l1>
        {isAvailable ? 'Connect' : 'Coming Soon!'}
      </Text>
    </TouchableOpacity>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.card,
    borderColor: Color.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    flex: 1,
  },
})
