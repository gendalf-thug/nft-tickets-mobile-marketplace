import React, {useState} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {BottomSheet} from 'src/components/bottom-sheet'
import {Button, Spacer, Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {TicketInfo} from 'src/types'

interface TicketDetailBuyProps {
  onClose: () => void
  onBuy: (count: number) => void
  currencySymbol?: TicketInfo['currencySymbol']
  price?: TicketInfo['price']
  priceInDollars?: number
}

export function TicketDetailBuy({
  onClose,
  onBuy,
  currencySymbol,
  price,
  priceInDollars,
}: TicketDetailBuyProps) {
  const [count, setCount] = useState(1)
  const {styles} = useThematicStyles(rawStyles)
  const {height: H} = useWindowDimensions()

  const closeDistance = H / 5

  const pressMinus = () => {
    if (count === 1) return
    else setCount(count - 1)
  }
  const pressPlus = () => {
    if (count === 99) return
    else setCount(count + 1)
  }
  return (
    <BottomSheet onClose={onClose} closeDistance={closeDistance}>
      <View style={styles.rowAmount}>
        <Text h4>Количество</Text>
        <View style={styles.count}>
          <TouchableOpacity
            style={styles.cube}
            activeOpacity={0.7}
            onPress={pressMinus}>
            <MaterialCommunityIcons name={'minus'} style={styles.iconStyle} />
          </TouchableOpacity>
          <Text h3>{count}</Text>
          <TouchableOpacity
            style={styles.cube}
            activeOpacity={0.7}
            onPress={pressPlus}>
            <MaterialCommunityIcons name={'plus'} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <Spacer height={16} />
      <View style={styles.rowTotal}>
        <Text h2>Всего</Text>
        <View style={styles.price}>
          {price && currencySymbol && (
            <Text h3 color={Color.primary}>
              {`${(price * count).toLocaleString()} ${currencySymbol}`}
            </Text>
          )}
          {priceInDollars && (
            <Text p1 color={Color.textBase2}>
              {priceInDollars.toLocaleString()} $
            </Text>
          )}
        </View>
      </View>
      <Button
        onPress={() => {
          onBuy(count)
          onClose()
        }}
        style={styles.button}>
        Купить
      </Button>
    </BottomSheet>
  )
}

const rawStyles = StyleSheet.create({
  rowAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 26,
  },
  price: {
    alignItems: 'flex-end',
  },
  button: {
    marginBottom: 20,
  },
  count: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
  },
  cube: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Color.primaryOpacity2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 24,
    color: Color.primary,
  },
})
