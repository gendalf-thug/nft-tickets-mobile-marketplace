import React from 'react'

import {StyleSheet, TouchableHighlight, View} from 'react-native'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Text} from '..'

interface CategoryItemProps {
  canPress?: boolean
  title: string
  isSelected: boolean
  onPress: () => void
}

export function CategoryItem({
  title,
  isSelected,
  onPress,
  canPress,
}: CategoryItemProps) {
  const {styles, colors} = useThematicStyles(useStyles)
  const color = isSelected ? Color.card : Color.primary
  const background = isSelected ? colors.primary : colors.card
  return (
    <TouchableHighlight
      underlayColor={colors.primaryOpacity2}
      activeOpacity={canPress ? 0.65 : 1}
      style={[
        styles.touchable,
        {
          backgroundColor: background,
        },
      ]}
      onPress={canPress ? onPress : undefined}>
      <View style={styles.itemButton}>
        <Text l2 color={color} style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

const useStyles = StyleSheet.create({
  itemButton: {
    borderRadius: 150,
    borderColor: Color.primary,
    borderWidth: 2,
  },
  text: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  touchable: {
    borderRadius: 100,
  },
})
