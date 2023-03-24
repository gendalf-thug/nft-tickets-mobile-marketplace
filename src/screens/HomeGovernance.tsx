import React, {useState} from 'react'

import {HomeGovernance} from 'src/components/HomeGovernance'
import {useTypedNavigation} from 'src/hooks'
import {ProposalsCroppedList, ProposalsTagKeys} from 'src/types'
import {ProposalsTagType} from 'src/variables/proposal'

export function HomeGovernanceScreen() {
  const [statusFilter, setStatusFilter] = useState<ProposalsTagKeys>('all')
  const {navigate} = useTypedNavigation()

  const onPressCard = (id: number) => {
    navigate('proposal', {id})
  }

  const proposals: ProposalsCroppedList = [
    {
      id: 0,
      status: 'passed',
      title: 'Update Jailing Parameters',
    },
    {
      id: 1,
      status: 'rejected',
      title: 'Staking Param Change',
    },
    {
      id: 2,
      status: 'passed',
      title: 'Increase vote period',
    },
    {
      id: 3,
      status: 'passed',
      title: 'Randomly reward',
    },
    {
      id: 4,
      status: 'passed',
      title: 'Randomly reward',
    },
    {
      id: 5,
      status: 'rejected',
      title: 'Randomly reward',
    },
  ]

  const onSelect = (tag: ProposalsTagType) => () => {
    setStatusFilter(tag[0])
  }

  return (
    <HomeGovernance
      proposals={proposals}
      statusFilter={statusFilter}
      onSelect={onSelect}
      onPressCard={onPressCard}
    />
  )
}
