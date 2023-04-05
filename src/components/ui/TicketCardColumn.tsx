import React from 'react'

import {format} from 'date-fns'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {formatPriceSmall} from 'src/helpers/formatPrice'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {TicketInfo} from 'src/types'

import {CryptoIcons} from 'assets/images/crypto-coins/mapping'

import {TicketCardInfoBlock} from './TicketCardInfoBlock'
import {TicketCardTags} from './TicketCardTags'

import {Spacer, Text} from './'

interface AdditionalTicketCardColumnProps {
  onPress?: (item: TicketInfo) => void
  onLike?: () => void
  isLiked?: boolean
}

export function TicketCardColumn({
  onPress,
  onLike,
  isLiked,
  ...itemProps
}: TicketInfo & AdditionalTicketCardColumnProps) {
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
        <Text h3 numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.costAndTagContainer}>
          <TicketCardTags tags={tags} />
          <View style={styles.costContainer}>
            {price && currencySymbol && (
              <>
                <Text numberOfLines={1} h4 color={Color.primary}>
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
              </>
            )}
          </View>
        </View>
        <Spacer height={2} />
        <View style={styles.infoAndLikeContainer}>
          <View style={styles.flexOne}>
            <TicketCardInfoBlock
              icon="location-outline"
              text={shortPlacementDescription}
            />
            <Spacer height={6} />
            <TicketCardInfoBlock
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
    width: 225,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    backgroundColor: Color.card,
  },
  imageContainer: {
    width: '100%',
    height: 180,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  infoContainer: {
    paddingTop: 2,
    paddingBottom: 14,
    paddingHorizontal: 12,
    borderColor: Color.border,
    borderLeftWidth: borderW,
    borderBottomWidth: borderW,
    borderRightWidth: borderW,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
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
  costAndTagContainer: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
