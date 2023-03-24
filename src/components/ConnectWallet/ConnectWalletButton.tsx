import React from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

import {Spacer, Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {connectMethodType} from 'src/types'

interface ConnectWalletButtonProps extends connectMethodType {
  style?: StyleProp<ViewStyle>
}

export function ConnectWalletButton({
  name,
  onConnect,
  isAvailable,
  Logo,
  style,
}: ConnectWalletButtonProps) {
  const {styles} = useThematicStyles(rawStyles)
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onConnect}
      disabled={!isAvailable}
      activeOpacity={0.7}>
      <Logo />
      <Spacer width={12} />
      <Text style={styles.nameText} t4>
        {name}
      </Text>
      <Spacer />
      <Text color={isAvailable ? Color.primary : Color.textBase2} t11>
        {isAvailable ? 'Connect' : 'Coming Soon!'}
      </Text>
    </TouchableOpacity>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.card,
    borderColor: Color.grayStroke,
    borderWidth: 0.3,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    flex: 1,
  },
})
