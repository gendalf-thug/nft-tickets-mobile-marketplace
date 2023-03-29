import React, {useRef} from 'react'

import {QRScanner, QRScannerRefType} from 'src/components/QRScanner'
import {useTypedNavigation} from 'src/hooks'

export function QRScannerScreen() {
  const {navigate, goBack} = useTypedNavigation()
  const scannerRef = useRef<QRScannerRefType>(null)

  const onScanBarcode = (qrValue: string) => {
    const warningMessage = 'It not QR-event or QR-Ticket'
    try {
      const qrObject = JSON.parse(qrValue)
      if (
        qrObject.name &&
        qrObject.tags &&
        qrObject.startData &&
        qrObject.endData &&
        qrObject.geoPosition
      ) {
        navigate('ticketDetail', qrObject)
      } else {
        scannerRef.current?.showError(warningMessage)
      }
    } catch (error) {
      scannerRef.current?.showError(warningMessage)
    }
  }

  return (
    <QRScanner
      ref={scannerRef}
      onPressBack={goBack}
      onScanBarcode={onScanBarcode}
    />
  )
}
