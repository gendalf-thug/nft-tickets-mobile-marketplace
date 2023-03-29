import React from 'react'

import {StyleSheet, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Text} from './Text'

interface TicketCardInfoBlockProps {
  icon: string
  text: string
  p2?: boolean
}

export function TicketCardInfoBlock({
  icon,
  text,
  p2,
}: TicketCardInfoBlockProps) {
  const {styles} = useThematicStyles(rawStyles)

  return (
    <View style={styles.iconWithTextContainer}>
      <Ionicons name={icon} style={styles.iconStyle} />
      <View style={styles.textContainer}>
        <Text p2={p2} style={styles.text} numberOfLines={2} p1={!p2}>
          {text}
        </Text>
      </View>
    </View>
  )
}

const rawStyles = StyleSheet.create({
  costAndTagContainer: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    color: Color.primary,
    marginRight: 8,
    fontSize: 30,
  },
  iconWithTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    flexWrap: 'wrap',
    width: '100%',
  },
})
