import React, {useCallback} from 'react'

import {HomeStaking} from 'src/components/HomeStaking'
import {useTypedNavigation} from 'src/hooks'

const initData = {
  stakingSum: 0,
  rewardsSum: 0,
  unDelegationSum: 0,
  loading: false,
  availableSum: 136,
}

export function HomeStakingScreen() {
  const navigation = useTypedNavigation()

  const onPressValidators = useCallback(() => {
    //navigation.navigate('stakingValidators');
  }, [navigation])

  return (
    <HomeStaking
      loading={initData.loading}
      availableSum={initData.availableSum}
      stakingSum={initData.stakingSum}
      rewardsSum={initData.rewardsSum}
      unDelegationSum={initData.unDelegationSum}
      onPressValidators={onPressValidators}
    />
  )
}
