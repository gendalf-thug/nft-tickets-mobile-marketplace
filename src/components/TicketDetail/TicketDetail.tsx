import React, {useState} from 'react'

import {format} from 'date-fns'
import {ru} from 'date-fns/locale'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {formatPrice} from 'src/components/formatPrice'
import {
  Button,
  Categories,
  InfoWithLeftIcon,
  Spacer,
  Text,
} from 'src/components/ui'
import {Background} from 'src/components/ui/Background'
import {capitalize} from 'src/helpers'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {TicketInfo} from 'src/types'

import {TicketDetailBuy} from './TicketDetailBuy'

interface TicketDetailProps extends TicketInfo {
  onBack?: () => void
  onQRCode: () => void
  onBuy: (count: number) => void
  priceInDollars?: number
}

export function TicketDetail({
  onBack,
  onBuy,
  onQRCode,
  priceInDollars = 100,
  tags,
  title,
  date,
  description,
  // coordinates,
  creator,
  purchasedTicketCount,
  currencySymbol,
  price,
  shortPlacementDescription,
  images,
}: TicketDetailProps) {
  const [showBuy, setShowBuy] = useState(false)
  const insets = useSafeAreaInsets()
  const {styles, colors} = useThematicStyles(rawStyles)

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image source={{uri: images[0]}} style={styles.image} />
        <Spacer height={20} />
        <Categories onlyList list={tags} />
        <Spacer height={6} />
        <View style={styles.details}>
          <Text h1 numberOfLines={3}>
            {title}
          </Text>
          <Spacer height={4} />
          <View style={styles.row}>
            <View style={styles.rowTicket}>
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color={colors.textSecondary1}
              />
              <Spacer width={8} />
              <Text color={Color.textSecondary1} p1>
                Одноразовое использование
              </Text>
            </View>
            {price && currencySymbol && (
              <Text h2 color={Color.primary}>
                {formatPrice(price)} {currencySymbol.toUpperCase()}
              </Text>
            )}
          </View>
          <Spacer height={12} />
          <InfoWithLeftIcon
            icon="ios-calendar-sharp"
            content={
              <>
                <Text style={styles.textStyle} p1 bold>
                  {capitalize(format(date, 'LLLL dd, yyyy', {locale: ru}))}
                </Text>
                <Spacer height={2} />
                <Text style={styles.textStyle} color={Color.textBase2} p1>
                  {capitalize(
                    format(date, 'EEEE, HH:mm', {
                      locale: ru,
                    }),
                  )}
                </Text>
              </>
            }
          />
          <Spacer height={10} />
          <InfoWithLeftIcon
            icon="location-outline"
            content={
              <>
                <Text style={styles.textStyle} p1 bold>
                  Местоположение
                </Text>
                <Spacer height={2} />
                <Text style={styles.textStyle} color={Color.textBase2} p1>
                  {shortPlacementDescription}
                </Text>
              </>
            }
          />
          <Spacer height={10} />
          <InfoWithLeftIcon
            icon="person-circle-outline"
            content={
              <>
                <Text style={styles.textStyle} p1 bold>
                  Адрес создателя (minter)
                </Text>
                <Spacer height={2} />
                <Text
                  style={styles.textStyle}
                  onPress={() => console.log(`creator: ${creator}`)}
                  color={Color.primary}
                  p1>
                  {creator + creator}
                </Text>
              </>
            }
          />
          {description && (
            <>
              <Spacer height={18} />
              <Text h3>Описание</Text>
              <Spacer height={8} />
              <Text p1>{description}</Text>
            </>
          )}
          <Spacer height={18} />
          {purchasedTicketCount && purchasedTicketCount > 0 && (
            <>
              <Text p1 style={styles.ticketText} color={Color.primary}>
                Количество купленных билетов: {purchasedTicketCount}
              </Text>
              <Button onPress={onQRCode}>
                {purchasedTicketCount > 1
                  ? 'Использовать билеты'
                  : 'Использовать билет'}
              </Button>
              <Spacer height={16} />
            </>
          )}
          <Button onPress={() => setShowBuy(true)}>Купить билет</Button>
        </View>
        <Spacer height={insets.bottom} />
      </ScrollView>
      {showBuy && (
        <TicketDetailBuy
          onBuy={onBuy}
          price={price}
          currencySymbol={currencySymbol}
          priceInDollars={priceInDollars}
          onClose={() => setShowBuy(false)}
        />
      )}
    </Background>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ticketText: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  image: {
    aspectRatio: 1 / 1,
    width: '100%',
    resizeMode: 'cover',
  },
  details: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowTicket: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    width: '100%',
    flexWrap: 'wrap',
  },
  goBackContainer: {
    position: 'absolute',
    left: 25,
    top: 67,
  },
  flexOne: {
    flex: 1,
  },
})
