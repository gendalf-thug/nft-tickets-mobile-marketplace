import React, {useEffect} from 'react'

import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Button, Spacer, Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

interface WelcomeProps {
  onContinue: () => void
  images: any[]
  currentImageId: number
}

export function Welcome({onContinue, currentImageId, images}: WelcomeProps) {
  const {styles} = useThematicStyles(rawStyles)
  const insets = useSafeAreaInsets()
  const {width, height} = useWindowDimensions()

  const moveDistanceX = (926 / height) * 1300 - width

  const IMG_HEIGHT = height
  const IMG_WIDTH = (926 / height) * 1300

  const imageX = useSharedValue(0)
  const imageOpacity = useSharedValue(0)

  useEffect(() => {
    imageOpacity.value = 1
    imageX.value = 0

    imageX.value = withTiming(moveDistanceX, {
      duration: 12000,
      easing: Easing.out(Easing.sin),
    })
    setTimeout(() => {
      imageOpacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.sin),
      })
    }, 11000)
  }, [currentImageId])

  const animImage = useAnimatedStyle(() => ({
    transform: [{translateX: -imageX.value}],
    opacity: imageOpacity.value,
  }))

  return (
    <View style={styles.root}>
      {images.map((item, index) => {
        const isActive = index === currentImageId
        const isNext =
          index ===
          (currentImageId + 1 >= images.length - 1 ? 0 : currentImageId + 1)
        if (!isNext && !isActive) return <View key={index} />
        return (
          <Animated.Image
            source={item}
            key={index}
            style={[
              styles.image,
              isActive && styles.activeImage,
              isNext && styles.nextImage,
              isActive && animImage,
              {width: IMG_WIDTH, height: IMG_HEIGHT},
            ]}
          />
        )
      })}

      <View style={styles.container}>
        <Text h4 style={styles.textStyle} color={Color.white}>
          Добро пожаловать в
        </Text>
        <Spacer height={6} />
        <Text h1 color={Color.primary} style={styles.textStyle}>
          NFT Tickets Marketplace
        </Text>
        <Spacer height={26} />
        <Button style={styles.buttonContainer} onPress={onContinue}>
          ДАЛЕЕ
        </Button>
        <Spacer height={insets.bottom + 16} />
      </View>
    </View>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 15,
  },
  root: {
    backgroundColor: Color.specialDark,
    flex: 1,
  },
  imagesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    height: '100%',
  },
  activeImage: {
    zIndex: 10,
  },
  nextImage: {
    zIndex: 5,
  },
  alphaTitle: {
    position: 'absolute',
    top: '45%',
    fontSize: 90,
  },
  buttonContainer: {
    width: '85%',
    alignSelf: 'center',
  },
  textStyle: {
    textShadowColor: Color.black,
    textShadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 7,
  },
})
