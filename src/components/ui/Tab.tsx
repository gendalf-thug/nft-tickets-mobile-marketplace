import React from 'react'

import {Pressable, StyleSheet, useWindowDimensions} from 'react-native'
import {ms, s} from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {useTheme} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Spacer} from './Spacer'
import {Text} from './Text/Text'

interface TabProps {
  onPress?: () => void
  tabId: number
  color?: Color
  activeColor?: Color
  isFocused: boolean
}

const navDataById = [
  {
    icon: 'store',
    name: 'Market',
  },
  {
    icon: 'ticket-alt',
    name: 'Билеты',
  },
  {icon: 'user-circle', name: 'Профиль'},
]

export function Tab({
  onPress,
  isFocused,
  tabId,
  color = Color.inactive,
  activeColor = Color.primary,
}: TabProps) {
  const tabWidth = useWindowDimensions().width / 5 - s(2) * 2
  const {colors} = useTheme()

  return (
    <Pressable onPress={onPress} style={icoContainer}>
      <FontAwesome5
        size={ms(20, 0.3)}
        style={[ico, {width: tabWidth}]}
        name={navDataById[tabId].icon}
        color={colors[isFocused ? activeColor : color]}
      />
      <Spacer height={s(2.5)} />
      <Text color={isFocused ? activeColor : color} l1>
        {navDataById[tabId].name}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  ico: {
    paddingTop: ms(5, 0.3),
    textAlign: 'center',
  },
  icoContainer: {
    flex: 1,
    marginHorizontal: s(2),
    alignItems: 'center',
  },
})

const {ico, icoContainer} = styles
