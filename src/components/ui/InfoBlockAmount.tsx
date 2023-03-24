import React, {useState} from 'react'

import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import {Spacer, Text, TextSum} from 'src/components/ui'
import {cleanNumber} from 'src/helpers/CleanNumber'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

type valueType = {
  amount: number
  suffix?: string
}

export type InfoBlockAmountProps = {
  style?: StyleProp<ViewStyle>
  values?: number[] | valueType[]
  value?: number | valueType
  text: string
  amountColor?: Color
  isLarge?: boolean
}

export function InfoBlockAmount({
  style,
  values = [],
  value = 0,
  text,
  amountColor = Color.textBase1,
  isLarge,
}: InfoBlockAmountProps) {
  const [isShow, setIsShow] = useState(false)
  const {styles} = useThematicStyles(rawStyles)

  let mapValues = values
  if (mapValues.length === 0) {
    mapValues = [value] as number[] | valueType[]
  }
  mapValues = mapValues.map(item => {
    if (typeof item === 'number') {
      return {amount: item}
    }
    return item
  })

  const buttonExists = mapValues.length > 2

  const onPressShow = () => {
    setIsShow(pr => !pr)
  }

  return (
    <View style={[styles.blockContainer, !isLarge && styles.flexOne, style]}>
      <View style={styles.infoBlock}>
        <Text t15 center color={Color.textBase2}>
          {text}
        </Text>
        <Spacer height={2} />
        {mapValues.slice(0, isShow ? undefined : 2).map((val, id) => (
          <TextSum
            key={id}
            color={amountColor}
            center
            suffix={val.suffix}
            sum={cleanNumber(val.amount)}
          />
        ))}
        {buttonExists && (
          <TouchableOpacity activeOpacity={0.7} onPress={onPressShow}>
            <Text color={Color.primary} center>
              {isShow ? 'Hide' : 'Show other'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const rawStyles = StyleSheet.create({
  infoBlock: {
    borderWidth: 1,
    borderColor: Color.graphicSecond2,
    borderRadius: 12,
    flex: 1,
    padding: 12,
  },
  blockContainer: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
  },
})
