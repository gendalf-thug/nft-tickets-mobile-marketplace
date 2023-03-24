import React from 'react'

import {ProposalsTagKeys} from 'src/types'

import {VotingCardCompleted} from './VotingCardCompleted'

interface VotingCardProps {
  id: number
  status: ProposalsTagKeys
  onPress?: (hash: number) => void
}

export function VotingCard({id, onPress}: VotingCardProps) {
  return <VotingCardCompleted id={id} onPress={onPress} />
}
