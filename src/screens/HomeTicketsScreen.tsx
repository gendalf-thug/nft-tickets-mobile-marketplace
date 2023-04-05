import React from 'react'

import {HomeTickets} from 'src/components/HomeTickets'
import {useTypedNavigation} from 'src/hooks'
import {fakeTicketsData} from 'src/variables/fakeData'

export function HomeTicketsScreen() {
  const {navigate} = useTypedNavigation()
  const onCreateTickets = () => {
    navigate('createTickets')
  }
  return (
    <HomeTickets
      onPressCreateTickets={onCreateTickets}
      ticketSections={[
        {
          title: 'Tickets created by yourself',
          data: fakeTicketsData,
        },
        {
          title: 'Tickets where are you a ticket collector',
          data: fakeTicketsData,
        },
        {
          title: 'Liked',
          data: fakeTicketsData,
        },
        {
          title: 'Tickets where are you a ticket collector',
          data: fakeTicketsData,
        },
      ]}
    />
  )
}
