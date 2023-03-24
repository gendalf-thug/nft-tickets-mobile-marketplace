import React from 'react'

import {format} from 'date-fns'
import {Pressable, StyleSheet, View} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Spacer, Text} from 'src/components/ui'
import {useThematicStyles, useTheme} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {votingCardsData} from 'src/variables/temporaryData'

export enum VotingCompletedStatuses {
  passed = 'Passed',
  rejected = 'Rejacted',
}

export type VotingCompletedStatusesKeys = keyof typeof VotingCompletedStatuses
type VotingCardCompletedProps = {
  id: number

  onPress?: (id: number) => void
}

export function VotingCardCompleted({id, onPress}: VotingCardCompletedProps) {
  const item = votingCardsData[id]
  const {styles} = useThematicStyles(rawStyles)
  const {colors} = useTheme()

  const isVoted = false // PASS

  const status =
    VotingCompletedStatuses[item.status as VotingCompletedStatusesKeys]

  const isRejected = status === VotingCompletedStatuses.rejected
  const iconColor = isRejected ? colors.textRed1 : colors.textGreen1
  const textColor = isRejected ? Color.textRed1 : Color.textGreen1

  const handlePress = () => onPress?.(id)

  return (
    <Pressable onPress={handlePress} style={styles.backgroundContainer}>
      <View style={styles.topInfoBlock}>
        <MaterialCommunityIcons
          style={[styles.icon, {color: iconColor}]}
          name={isRejected ? 'close-circle' : 'check'}
        />
        <Spacer width={5.5} />
        <Text t12 color={textColor}>
          {status}
        </Text>
        <Spacer />
        {isVoted && (
          <Text t17 color={Color.textBase2}>
            You voted
          </Text>
        )}
      </View>
      <View style={styles.container}>
        <Text t14 color={Color.textBase2}>
          #{item.orderNumber}
        </Text>
        <Spacer height={2} />
        <Text t8 numberOfLines={2} color={Color.textBase2}>
          {item.title}
        </Text>
        <Spacer height={12} />
        <View style={styles.dateContainer}>
          <View>
            <Text t14 color={Color.textBase2}>
              Voting start
            </Text>
            <Spacer height={4} />
            <Text t14 color={Color.textBase1}>
              {item.dateStart && format(item.dateStart, 'dd MMM yyyy, H:mm')}
            </Text>
          </View>
          <Spacer width={16} />
          <View>
            <Text t14 color={Color.textBase2}>
              Voting end
            </Text>
            <Spacer height={4} />
            <Text t14 color={Color.textBase1}>
              {item.dateEnd && format(item.dateEnd, 'dd MMM yyyy, H:mm')}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const rawStyles = StyleSheet.create({
  backgroundContainer: {
    borderRadius: 12,
    paddingTop: 6,
    borderWidth: 1,
    backgroundColor: Color.card,
    borderColor: Color.grayStroke,
  },
  container: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    backgroundColor: Color.card,
    borderColor: Color.grayStroke,
    marginHorizontal: -1,
    marginBottom: -1,
  },
  topInfoBlock: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
})
