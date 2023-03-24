import React from 'react'

import {StyleSheet, View} from 'react-native'

import {Spacer, Text} from 'src/components/ui'
import {cleanNumber} from 'src/helpers/CleanNumber'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import Logo from '../../../assets/images/logo.svg'

interface StakingEmptyProps {
  availableSum: number
}

export function StakingEmpty({availableSum}: StakingEmptyProps) {
  const {styles} = useThematicStyles(rawStyles)
  return (
    <>
      <Spacer />
      <View>
        <Text t12 center color={Color.textBase2}>
          Stake your cryptocurrency in any validator and get additional
          cryptocurrency
        </Text>
        <Spacer height={36} />
        <View style={styles.circleContainer}>
          <Logo width={60} height={60} style={styles.logo} />
        </View>
        <Spacer height={20} />
        <Text t6 center>
          Available
        </Text>
        <Text t2 center color={Color.primary}>
          {cleanNumber(availableSum)} ZLATO
        </Text>
      </View>
      <Spacer />
    </>
  )
}

const rawStyles = StyleSheet.create({
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: Color.primary1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    marginTop: 6,
  },
})
