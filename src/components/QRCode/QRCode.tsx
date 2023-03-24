import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import QRCodeGenerator from 'react-native-qrcode-svg'

import {useTheme} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {TicketInfo} from 'src/types'

import {Background, CustomHeader, Text} from '../ui'

interface QRCodeProps {
  onBack: () => void
  item: TicketInfo
}

function QRCodeGenerate(tickets: number) {
  const {colors} = useTheme()
  const ticketsMas = []
  const randomAdress = () => {
    let adress = ''
    for (let i = 0; i < 10; i++) {
      adress = adress.concat(String(Math.floor(Math.random() * 10)))
    }
    return adress
  }
  for (let i = 0; i < tickets; i++) {
    ticketsMas.push(
      <View key={i} style={styles.qr}>
        <Text t4 style={styles.qrText}>
          Ticket {i + 1}
        </Text>
        <QRCodeGenerator
          value={randomAdress()}
          color={colors.primary}
          logo={require('../../../assets/images/logo.svg')}
          logoSize={100}
          size={300}
        />
      </View>,
    )
  }
  return ticketsMas
}

export function QRCode({onBack, item}: QRCodeProps) {
  return (
    <Background>
      <CustomHeader
        iconLeft={'arrow-back'}
        onPressLeft={onBack}
        colorLeft={Color.primary}
        title={'QR-codes'}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {QRCodeGenerate(item.tickets)}
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  qr: {
    marginVertical: 10,
  },
  qrText: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    alignItems: 'center',
  },
})
