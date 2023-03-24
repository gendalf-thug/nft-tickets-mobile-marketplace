import React, {useMemo} from 'react'

import {format} from 'date-fns'
import {Pressable, ScrollView, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Background, Badge, Spacer, Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {ProposalsTags} from 'src/variables/proposal'

import {PopupHeader} from '../popupHeader'

interface ProposalProps {
  item?: {
    status: string
    orderNumber: string
    title: string
    createdAt: number
    depositEnd: number
    description: string
    dateEnd: number
    dateStart: number
  }
}

export function Proposal({item}: ProposalProps) {
  const {bottom} = useSafeAreaInsets()
  const {styles} = useThematicStyles(rawStyles)

  const badgeStatus = useMemo(
    () => ProposalsTags.find(tag => tag[0] === item?.status),
    [item?.status],
  )

  if (!item) {
    return <></>
  }

  const {orderNumber, title, description} = item

  return (
    <Background style={styles.container}>
      <PopupHeader name={'Proposal'} canBack />
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Pressable onPress={() => {}}>
          <Spacer height={24} />
          {badgeStatus && (
            <Badge
              center
              text={badgeStatus[1]}
              labelColor={badgeStatus[2]}
              textColor={badgeStatus[3]}
              iconLeftName={badgeStatus[4]}
            />
          )}
          <Spacer height={16} />
          <Text center color={Color.textBase2} t14>
            #{orderNumber}
          </Text>
          <Spacer height={2} />
          <Text center t3>
            {title}
          </Text>
          <Spacer height={24} />
          <Text t8>Info</Text>
          <View style={styles.row}>
            <View style={styles.block}>
              <Text t12 color={Color.textBase2}>
                Type
              </Text>
              <Spacer height={4} />
              <Text t12>PASS</Text>
            </View>
            <Spacer width={16} />
            <View style={styles.block}>
              <Text t12 color={Color.textBase2}>
                Total deposit
              </Text>
              <Spacer height={4} />
              <Text t12>PASS</Text>
            </View>
          </View>
          <View style={styles.block}>
            <Text t12 color={Color.textBase2}>
              Description
            </Text>
            <Spacer height={4} />
            <Text t12>{description}</Text>
          </View>
          <Spacer height={24} />
          <Text t8>Parameter changes</Text>
          <Spacer height={12} />
          <View style={styles.codeBlock}>
            <Text t12 color={Color.textBase1}>
              {`[
  PASS
]`}
            </Text>
          </View>
          <Spacer height={24} />
          <Text t8>Date</Text>
          <View style={styles.row}>
            <View style={styles.block}>
              <Text t12 color={Color.textBase2}>
                Created at (GTM)
              </Text>
              <Spacer height={4} />
              <Text t12>
                {item.createdAt && format(item.createdAt, 'dd MMM yyyy, H:mm')}
              </Text>
              <Spacer height={8} />
              <Text t12 color={Color.textBase2}>
                Vote start (GMT)
              </Text>
              <Spacer height={4} />
              <Text t12>
                {item.dateStart && format(item.dateStart, 'dd MMM yyyy, H:mm')}
              </Text>
            </View>
            <Spacer width={16} />
            <View style={styles.block}>
              <Text t12 color={Color.textBase2}>
                Deposit End (GMT)
              </Text>
              <Spacer height={4} />
              <Text t12>
                {item.depositEnd &&
                  format(item.depositEnd, 'dd MMM yyyy, H:mm')}
              </Text>
              <Spacer height={8} />
              <Text t12 color={Color.textBase2}>
                Vote end (GTM)
              </Text>
              <Spacer height={4} />
              <Text t12>
                {item.dateEnd && format(item.dateEnd, 'dd MMM yyyy, H:mm')}
              </Text>
            </View>
          </View>
          <Spacer height={bottom + 28} />
        </Pressable>
      </ScrollView>
    </Background>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  block: {
    marginTop: 12,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  codeBlock: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.graphicSecond1,
    padding: 12,
  },
  infoBlockMargin: {
    marginTop: 8,
  },
})
