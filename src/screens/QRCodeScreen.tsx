import React from 'react'

import {QRCode} from 'src/components/QRCode'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'

export function QRCodeScreen() {
  const item = useTypedRoute<'ticketDetail'>().params
  const {goBack} = useTypedNavigation()
  return <QRCode item={item} onBack={goBack} />
}
