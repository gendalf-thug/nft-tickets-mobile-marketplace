import React from 'react'

import {StyleSheet, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Spacer} from './Spacer'

interface InfoWithLeftIconProps {
  icon: string
  content: JSX.Element
}

export function InfoWithLeftIcon({icon, content}: InfoWithLeftIconProps) {
  const {styles, colors} = useThematicStyles(rawStyles)
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={26} color={colors.primary} />
      <Spacer width={10} />
      <View style={styles.separatorLine} />
      <Spacer width={10} />
      <View style={styles.contentContainer}>{content}</View>
    </View>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  separatorLine: {
    backgroundColor: Color.border,
    width: 1,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    flexWrap: 'wrap',
  },
})
