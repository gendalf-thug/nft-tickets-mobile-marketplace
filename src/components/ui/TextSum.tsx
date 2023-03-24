import React from 'react'

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'

import {Text} from 'src/components/ui'
import {cleanNumber} from 'src/helpers/CleanNumber'
import {Color} from 'src/themeTypes'

import {Spacer} from './spacer'

interface TextSumProps {
  sum: string
  rightText?: string
  color?: Color
  center?: boolean
  right?: boolean
  suffix?: string
  style?: StyleProp<ViewStyle>
}

export function TextSum({
  sum,
  rightText,
  color = Color.textBase1,
  center,
  right,
  suffix = '',
  style,
}: TextSumProps) {
  const hasRightText = typeof rightText !== 'undefined'
  const text = hasRightText ? rightText : 'ZLATO' + suffix

  const viewStyles = StyleSheet.flatten([
    center && styles.center,
    right && styles.right,
    style,
  ])

  return (
    <View style={[styles.container, viewStyles]}>
      <Text t13 center color={color}>
        {cleanNumber(sum)}
      </Text>
      <Spacer width={2} />
      <Text t13 center style={styles.opacityText} color={color}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  opacityText: {
    opacity: 0.5,
  },
  center: {
    alignSelf: 'center',
  },
  right: {
    alignSelf: 'flex-end',
  },
})
