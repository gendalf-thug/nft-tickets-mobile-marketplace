import React, {useRef, useState} from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'

import {Background, Button, Spacer} from 'src/components/ui'
import {NUM_PRECISION} from 'src/variables/common'

import {StakingActive, StakingActiveInterface} from './StakingActive'
import {StakingEmpty} from './StakingEmpty'

import {Loading} from '../loading'

export type StakingHomeProps = {
  loading: boolean
  availableSum: number
  stakingSum: number
  rewardsSum: number
  unDelegationSum: number
  onPressValidators: () => void
  onPressGetRewards?: () => void
}

export function HomeStaking({
  loading,
  stakingSum,
  rewardsSum,
  availableSum,
  unDelegationSum,
  onPressValidators,
  onPressGetRewards,
}: StakingHomeProps) {
  const [isAnimation, setIsAnimation] = useState(false)
  const stakingActiveRef = useRef<StakingActiveInterface>(null)

  const canGetRewards = rewardsSum >= 1 / NUM_PRECISION

  const handleGetRewards = () => {
    stakingActiveRef.current?.getReward()
    setIsAnimation(true)
    setTimeout(() => setIsAnimation(false), 2000)
    onPressGetRewards?.()
  }

  const hasStaking = stakingSum >= 1 / NUM_PRECISION

  if (loading) {
    return <Loading />
  }
  return (
    <Background>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        style={styles.container}>
        {hasStaking ? (
          <StakingActive
            ref={stakingActiveRef}
            stakedSum={stakingSum}
            rewardSum={rewardsSum}
            unDelegationSum={unDelegationSum}
            availableSum={availableSum}
          />
        ) : (
          <StakingEmpty availableSum={availableSum} />
        )}
        <View>
          {hasStaking && (
            <Button
              onPress={handleGetRewards}
              disabled={!canGetRewards || isAnimation}
              style={styles.margin}>
              Get rewards
            </Button>
          )}
          <Button onPress={onPressValidators} style={styles.margin}>
            Validators
          </Button>
          <Spacer height={12} />
        </View>
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  margin: {
    marginVertical: 8,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})
