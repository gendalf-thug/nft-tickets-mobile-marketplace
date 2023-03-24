import React from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Text} from './text/text'

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
      style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.gradient, style]}
        colors={['#F997FE', '#FF71A7']}>
        <Text t6 color={Color.white}>
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 30,
  },
  gradient: {
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
