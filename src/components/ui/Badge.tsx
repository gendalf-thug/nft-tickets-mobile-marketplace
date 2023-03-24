import React, {useMemo} from 'react'

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Spacer, Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

export type BadgeProps = {
  iconLeftName?: string
  labelColor?: Color | string
  textColor?: Color
  style?: StyleProp<ViewStyle>
  center?: boolean
  text: string
}
export function Badge({
  text,
  center,
  iconLeftName,
  labelColor,
  textColor = Color.textBase3,
  style,
}: BadgeProps) {
  const {styles, colors} = useThematicStyles(rawStyles)
  const container = useMemo(
    () => [
      styles.container,
      labelColor ? {backgroundColor: labelColor} : styles.bordered,
      style,
    ],
    [labelColor, style],
  )

  const iconColor =
    text === 'Rejected'
      ? colors.textRed1
      : text === 'Passed'
      ? colors.textGreen1
      : colors.textBase3

  return (
    <View style={[container, center && styles.center]}>
      {iconLeftName && (
        <>
          <MaterialCommunityIcons
            name={iconLeftName}
            color={iconColor}
            style={[styles.icon]}
          />
          <Spacer width={4} />
        </>
      )}
      <Text t10 color={textColor}>
        {text}
      </Text>
    </View>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bordered: {
    borderWidth: 1,
    borderColor: Color.graphicSecond3,
  },
  center: {
    alignSelf: 'center',
  },
  icon: {
    fontSize: 20,
  },
})
