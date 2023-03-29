import React from 'react'

import {StyleSheet, View} from 'react-native'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Text} from '.'

interface TagT {
  name: string
  withMarginLeft?: boolean
}
export function Tag({name, withMarginLeft}: TagT) {
  const {styles, colors} = useThematicStyles(rawStyles)

  return (
    <View
      style={[
        styles.container,
        {borderColor: colors.primary},
        withMarginLeft && styles.marginLeft,
      ]}>
      <Text color={Color.primary} l1>
        {name}
      </Text>
    </View>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  marginLeft: {
    marginLeft: 5,
  },
})
