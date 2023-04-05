import React from 'react'

import {Search} from 'src/components/Search/'
import {useTypedNavigation} from 'src/hooks'
import {TicketInfo} from 'src/types'

export function SearchScreen() {
  const {navigate} = useTypedNavigation()
  const onPressCard = (item: TicketInfo) => {
    navigate('ticketDetail', {ticketId: item.id})
  }
  return <Search onPressCard={onPressCard} />
}
