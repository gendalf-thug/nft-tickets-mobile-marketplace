import React from 'react'

import {TicketDetail} from 'src/components/TicketDetail'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {fakeTicketsData} from 'src/variables/fakeData'

export function TicketDetailScreen() {
  const {ticketId} = useTypedRoute<'ticketDetail'>().params
  const {goBack, navigate} = useTypedNavigation()
  const item = fakeTicketsData.find(a => a.id === ticketId)

  if (!item) {
    return null
  }
  const onQRCode = () => {
    navigate('qr', item)
  }

  const onBuy = (count: number) => {
    console.log(`buy tickets - ${count}`)
  }
  return (
    <TicketDetail onBuy={onBuy} onBack={goBack} onQRCode={onQRCode} {...item} />
  )
}
