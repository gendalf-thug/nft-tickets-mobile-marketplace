import React from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Text} from './Text'

interface ButtonT {
  children: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress: () => void
}
export function Button({children, style, onPress, disabled}: ButtonT) {
  const {styles} = useThematicStyles(rawStyles)
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[styles.container, style]}>
      <Text h4 color={Color.white}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Color.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
