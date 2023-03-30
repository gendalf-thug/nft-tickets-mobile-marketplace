import React from 'react'

import {HomeMarket} from 'src/components/HomeMarket'
import {useTypedNavigation} from 'src/hooks'
import {TicketInfo} from 'src/types'
import {fakeCategoriesData} from 'src/variables/fakeData'

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
      categoriesList={fakeCategoriesData}
      onPressCard={onPressCard}
      onPressSearch={onPressSearch}
      onPressScan={onPressScan}
    />
  )
}
