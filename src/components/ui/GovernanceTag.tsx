import React, {memo} from 'react'

import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import {Text} from 'src/components/ui/text'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

export type TagProps = {
  tagVariant?: 'active' | 'inactive' | undefined
  text?: string
  style?: StyleProp<ViewStyle>
  marginHorizontal?: number
  onPress?: () => void
}

export const GovernanceTag = memo(
  ({
    text,
    tagVariant = 'inactive',
    style,
    marginHorizontal = 4,
    onPress,
  }: TagProps) => {
    const {styles, colors} = useThematicStyles(rawStyles)
    const bgColor = tagVariant === 'active' ? colors.primary : colors.bg1
    const textColor = tagVariant === 'active' ? Color.textBase3 : Color.primary

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.touch, {backgroundColor: bgColor, marginHorizontal}]}>
        <View style={[styles.itemButton, style]}>
          <Text t13 color={textColor} style={styles.text}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
)

const rawStyles = StyleSheet.create({
  text: {
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  touch: {
    borderRadius: 100,
  },
  itemButton: {
    borderColor: Color.primary,
    borderWidth: 2,
    borderRadius: 100,
  },
})
