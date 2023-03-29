import React from 'react'

import {StyleSheet, View, useWindowDimensions} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Text} from 'src/components/ui'
import {useTheme} from 'src/hooks'
import {Color} from 'src/themeTypes'

export function ProposalVotingEmpty() {
  const height = useWindowDimensions().height / 1.5
  const {colors} = useTheme()
  return (
    <View style={[styles.container, {height}]}>
      <MaterialCommunityIcons
        name="server"
        color={colors.graphicSecond3}
        style={styles.icon}
      />
      <Text t14 color={Color.textSecond1}>
        No proposal of category
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
    fontSize: 80,
  },
})
