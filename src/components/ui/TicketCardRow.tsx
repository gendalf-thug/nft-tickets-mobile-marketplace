import React from 'react'

import {format} from 'date-fns'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {formatPriceSmall} from 'src/helpers/formatPrice'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {TicketInfo} from 'src/types'

import {CryptoIcons} from 'assets/images/crypto-coins/mapping'

import {Spacer} from './Spacer'
import {Text} from './Text/Text'
import {TicketCardInfoBlock} from './TicketCardInfoBlock'
import {TicketCardTags} from './TicketCardTags'

interface AdditionalTicketCardRowProps {
  onPress?: (item: TicketInfo) => void
  onLike?: () => void
  isLiked?: boolean
}

export function TicketCardRow({
  onPress,
  onLike,
  isLiked,
  ...itemProps
}: TicketInfo & AdditionalTicketCardRowProps) {
  const {styles, colors} = useThematicStyles(rawStyles)
  const {
    title,
    date,
    tags,
    images,
    shortPlacementDescription,
    price,
    currencySymbol,
  } = itemProps

  const iconName = currencySymbol?.toLowerCase()
  // @ts-ignore
  const SvgIcon = CryptoIcons[iconName]

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => onPress?.(itemProps)}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: images[0]}} />
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} h3 color={Color.textBase1}>
          {title}
        </Text>
        <Spacer height={2} />
        <View style={styles.costAndTagContainer}>
          <TicketCardTags tags={tags} />
          {price && currencySymbol && (
            <View style={styles.priceContainer}>
              <Text h4 color={Color.primary}>
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
        <Spacer height={2} />
        <View style={styles.infoAndLikeContainer}>
          <View style={styles.flexOne}>
            <TicketCardInfoBlock
              p2
              icon="location-outline"
              text={shortPlacementDescription}
            />
            <Spacer height={6} />
            <TicketCardInfoBlock
              p2
              icon="ios-calendar-sharp"
              text={`Date: ${format(date, 'MMM d, y')}\nTime: ${format(
                date,
                'HH:mm',
              )}`}
            />
          </View>
          <TouchableOpacity onPress={onLike} style={styles.likeContainer}>
            <Ionicons
              color={isLiked ? colors.primary : colors.inactive}
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const borderW = 1
const rawStyles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 148,
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: Color.card,
  },
  imageContainer: {
    width: 175,
    height: '100%',
  },
  image: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 6,
    paddingLeft: 6,
    paddingRight: 12,
    borderColor: Color.border,
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
    color: Color.textSecondary1,
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
  infoAndLikeContainer: {
    flexDirection: 'row',
  },
  likeContainer: {
    alignSelf: 'flex-end',
  },
  flexOne: {
    flex: 1,
  },
})
