import React, {useEffect, useState} from 'react'

import {Proposal} from 'src/components/Proposal'
import {useTypedRoute} from 'src/hooks'
import {votingCardsData} from 'src/variables/temporaryData'

export function ProposalScreen() {
  const {id} = useTypedRoute<'proposal'>().params

  const [item, setItem] = useState(votingCardsData[id])

  useEffect(() => {
    setItem(votingCardsData[id])
  }, [id])

  return <Proposal item={item} />
}
