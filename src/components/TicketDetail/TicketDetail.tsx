import React, {useState} from 'react'

import {format} from 'date-fns';
import {ScrollView, StyleSheet, View, useColorScheme} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {formatPrice} from 'src/components/formatPrice';
import {Button, CustomHeader, Spacer, Text} from 'src/components/ui';
import {Background} from 'src/components/ui/Background';
import {useThematicStyles} from 'src/hooks';
import {Color} from 'src/themeTypes';
import {TicketInfo} from 'src/types';

import {TicketDetailBuy} from './TicketDetailBuy'
import {TicketDetailTags} from './TicketDetailTags'

import {dark, light} from '../../../assets/images/cryproCoins/mapping'
interface TicketDetailProps extends TicketInfo {
  onBack?: () => void
  onQRCode: () => void
  priceInDollars?: number
}

export function TicketDetail({
  onBack,
  onQRCode,
  priceInDollars = 100,
  ...item
}: TicketDetailProps) {
  const [showBuy, setShowBuy] = useState(false)
  const insets = useSafeAreaInsets()
  const {styles, colors} = useThematicStyles(rawStyles)

  const isDark = useColorScheme() === 'dark'

  const iconName = item.currencySymbols?.toLowerCase()
  // @ts-ignore
  const SvgIcon = !isDark ? dark[iconName] : light[iconName]

  return (
    <Background>
      <CustomHeader
        title={item.name}
        iconLeft="arrow-back"
        onPressLeft={onBack}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <FastImage source={{uri: item.imageUrl}} style={styles.image} />
        <View style={styles.details}>
          <TicketDetailTags tags={item.tags} />
          <Text t19 style={styles.name}>
            {item.name}
          </Text>
          <View style={styles.row}>
            <View style={styles.rowTicket}>
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                style={styles.iconStyle1}
              />
              <Text t11>One time usage</Text>
            </View>
            <View style={styles.price}>
              {item.price && item.currencySymbols && (
                <View style={styles.priceContainer}>
                  <Text t2 color={Color.primary}>
                    {formatPrice(item.price)}
                  </Text>
                  {SvgIcon && (
                    <>
                      <Spacer width={6} />
                      <SvgIcon.default
                        fill={colors.primary}
                        width={30}
                        height={30}
                      />
                    </>
                  )}
                </View>
              )}
              <View style={styles.priceContainer}>
                {item.currencySymbols && (
                  <Text t12 color={Color.graphicSecond4}>
                    {item.currencySymbols}
                  </Text>
                )}
                {priceInDollars && (
                  <Text t12 color={Color.graphicSecond4}>
                    {' '}
                    - {priceInDollars} $
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <View style={styles.circle}>
              <MaterialCommunityIcons
                name="calendar-check"
                style={styles.iconStyle2}
              />
            </View>
            <View style={styles.flexOne}>
              <Text t7 style={styles.dateText}>
                Start Date: {format(item.startData, 'MMM d, y')}
              </Text>
              <Text t9 style={styles.dateText}>
                {format(item.startData, 'EEEE, hh:mm a')}
              </Text>
              <Spacer height={10} />
              <Text t7 style={styles.dateText}>
                End Date: {format(item.endData, 'MMM d, y')}
              </Text>
              <Text t9 style={styles.dateText}>
                {format(item.endData, 'EEEE, hh:mm a')}
              </Text>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <View style={styles.circle}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                style={styles.iconStyle2}
              />
            </View>
            <View>
              <Text t7 style={styles.dateText}>
                Location
              </Text>
              <Text t9>{item.geoPosition}</Text>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <View style={styles.circle}>
              <MaterialCommunityIcons
                name="account"
                style={styles.iconStyle2}
              />
            </View>
            <View>
              <Text t7 style={styles.dateText}>
                Ticket Provider
              </Text>
              <Text t9>0x0da46c783f8cxv85x6z5cxhxv12382</Text>
              <Spacer height={8} />
              <Text t7 style={styles.dateText}>
                Ticket Approval
              </Text>
              <Text t9>0x0cd46a783f8cxv45x6z5cxhxv13782</Text>
            </View>
          </View>
          {item.description && (
            <>
              <Text t7 style={styles.dateText}>
                Desciption
              </Text>
              <Spacer height={20} />
              <Text t9>{item.description}</Text>
              <Spacer height={36} />
            </>
          )}
          {item.tickets > 0 && (
            <View>
              <Text t11 style={styles.ticketText} color={Color.primary}>
                Tickets available: {item.tickets}
              </Text>
              <Button style={styles.ticketButton} onPress={onQRCode}>
                {item.tickets > 1
                  ? 'Show QR-code of the tickets'
                  : 'Show QR-codes of ticket'}
              </Button>
            </View>
          )}
          <Button style={styles.button} onPress={() => setShowBuy(true)}>
            {item.tickets > 0 ? 'Buy more' : 'Buy'}
          </Button>
        </View>
        <Spacer height={insets.bottom} />
      </ScrollView>
      {showBuy && (
        <TicketDetailBuy
          price={item.price}
          currencySymbols={item.currencySymbols}
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
  ticketButton: {
    alignSelf: 'center',
  },
  button: {
    marginVertical: 20,
  },
  image: {
    aspectRatio: 1 / 1,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 25,
  },
  iconStyle1: {
    color: Color.textSecond1,
    marginRight: 10,
    fontSize: 24,
  },
  iconStyle2: {
    color: Color.primary,
    fontSize: 30,
  },
  dateText: {
    marginBottom: 2,
  },
  details: {
    paddingHorizontal: 24,
  },
  name: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 45,
  },
  rowTicket: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    alignItems: 'center',
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  circle: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 100,
    backgroundColor: Color.primary1,
  },
  goBackContainer: {
    position: 'absolute',
    left: 25,
    top: 67,
  },
  flexOne: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
