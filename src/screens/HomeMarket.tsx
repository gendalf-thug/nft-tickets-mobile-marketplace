import React from 'react'

import {HomeMarket} from 'src/components/HomeMarket'
import {useTypedNavigation} from 'src/hooks'
import {TicketInfo} from 'src/types'

export function HomeMarketScreen() {
  const {navigate} = useTypedNavigation()

  const onPressCard = (item: TicketInfo) => {
    navigate('ticketDetail', item)
  }

  const onPressSearch = () => {
    navigate('search')
  }

  const onPressScan = () => {
    navigate('scan')
  }

  return (
    <HomeMarket
      onPressCard={onPressCard}
      onPressSearch={onPressSearch}
      onPressScan={onPressScan}
    />
  )
}
