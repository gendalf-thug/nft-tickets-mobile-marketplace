import React from 'react'

import {format} from 'date-fns'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {formatPriceSmall} from 'src/components/formatPrice'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {TicketInfo} from 'src/types'

import {Spacer} from './spacer'
import {Text} from './text/text'
import {TicketCardTags} from './TicketCardTags'

import {dark, light} from '../../../assets/images/cryproCoins/mapping'

export function TicketCardRow({
  onPress,
  ...itemProps
}: TicketInfo & {onPress?: (item: TicketInfo) => void}) {
  const {styles, colors} = useThematicStyles(rawStyles)
  const isDark = useColorScheme() === 'dark'
  const {
    name,
    startData,
    endData,
    tags,
    imageUrl,
    geoPosition,
    price,
    currencySymbols,
  } = itemProps

  const iconName = currencySymbols?.toLowerCase()
  // @ts-ignore
  const SvgIcon = !isDark ? dark[iconName] : light[iconName]

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onPress?.(itemProps)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: imageUrl}} />
        </View>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} t5 color={Color.textBase1}>
            {name}
          </Text>
          <Spacer height={6} />
          <View style={styles.costAndTagContainer}>
            <TicketCardTags tags={tags} />
            {price && currencySymbols && (
              <View style={styles.priceContainer}>
                <Text t7 color={Color.primary}>
                  {formatPriceSmall(price)}
                </Text>
                {SvgIcon && (
                  <>
                    <Spacer width={4} />
                    <SvgIcon.default
                      fill={colors.primary}
                      width={20}
                      height={20}
                    />
                  </>
                )}
              </View>
            )}
          </View>
          <Spacer height={8} />
          <View style={styles.iconWithTextContainer}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              style={styles.iconStyle}
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} t14>
                {geoPosition}
              </Text>
            </View>
          </View>
          <Spacer height={8} />
          <View style={styles.iconWithTextContainer}>
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              style={styles.iconStyle}
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} t14>
                Start: {format(startData, 'MMM d, y')}
              </Text>
              <Text numberOfLines={1} t14>
                End: {format(endData, 'MMM d, y')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const borderW = 0.6
const rawStyles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 150,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: Color.card,
  },
  imageContainer: {
    width: 150,
    height: 150,
  },
  image: {
    flex: 1,
  },
  infoContainer: {
    flex: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: Color.grayStroke,
    borderTopWidth: borderW,
    borderBottomWidth: borderW,
    borderRightWidth: borderW,
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
  },
  costAndTagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWithTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: Color.textSecond1,
    marginRight: 8,
    fontSize: 25,
  },
  textContainer: {
    flexWrap: 'wrap',
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
