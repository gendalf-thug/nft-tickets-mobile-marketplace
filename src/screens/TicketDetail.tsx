import React from 'react'

import {TicketDetail} from 'src/components/TicketDetail'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'

export function TicketDetailScreen() {
  const item = useTypedRoute<'ticketDetail'>().params
  const {goBack, navigate} = useTypedNavigation()
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
