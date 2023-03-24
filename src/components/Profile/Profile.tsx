import React, {useRef, useState} from 'react'

import {
  SectionList,
  // TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import {StyleSheet} from 'react-native'
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
// import Icon from 'react-native-vector-icons/Ionicons';

import {useThematicStyles} from 'src/hooks'
import {SHADOW_COLOR} from 'src/themes'
import {Color} from 'src/themeTypes'
import {TicketInfo, sheetPointsT} from 'src/types'
import {ANIMATION_DURATION} from 'src/variables'

import {Avatar, Background, Button, CustomHeader, Spacer, Text} from '../ui'
import {TicketCardRow} from '../ui/TicketCardRow'

const imageSize = 220

interface ProfileProps {
  onBack?: () => void
  onPressCreateEvent: () => void
  bgImageUrl: string
  avaUrl: string
  cryptoAddress: string
  ticketsData: {
    title: string
    data: TicketInfo[]
  }[]
}

export function Profile({
  onBack,
  onPressCreateEvent,
  bgImageUrl,
  avaUrl,
  // cryptoAddress,
  ticketsData,
}: ProfileProps) {
  const {styles /*, colors*/} = useThematicStyles(rawStyles)
  const {height, width} = useWindowDimensions()

  const {bottom} = useSafeAreaInsets()

  // ANIMATIONS VARIABLES
  const fullyOpenSnapPoint = 0
  const closedSnapPoint = imageSize
  const snapPointFromTop: sheetPointsT = [fullyOpenSnapPoint, closedSnapPoint]
  const mockedSnapPointFromTop: sheetPointsT = [
    fullyOpenSnapPoint,
    closedSnapPoint,
  ]

  const panGestureRef = useRef(Gesture.Pan())
  const blockScrollUntilAtTheTopRef = useRef(Gesture.Tap())
  const [snapPoint, setSnapPoint] = useState(closedSnapPoint)
  const translationY = useSharedValue(0)
  const scrollOffset = useSharedValue(closedSnapPoint)
  const sheetTranslateY = useSharedValue(closedSnapPoint)

  // ANIMATIONS

  const onHandlerEndOnJS = (point: number) => {
    setSnapPoint(point)
  }

  const onHandlerEnd = ({velocityY}: PanGestureHandlerEventPayload) => {
    'worklet'
    const dragToss = 0.05
    const endOffsetY =
      sheetTranslateY.value + translationY.value + velocityY * dragToss

    let destSnapPoint = fullyOpenSnapPoint

    if (snapPoint === fullyOpenSnapPoint && endOffsetY < fullyOpenSnapPoint) {
      return
    }

    mockedSnapPointFromTop.forEach((point, id) => {
      const distFromSnap = Math.abs(point - endOffsetY)
      if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
        destSnapPoint = snapPointFromTop[id]
      }
    })

    sheetTranslateY.value = sheetTranslateY.value + translationY.value
    translationY.value = 0

    sheetTranslateY.value = withTiming(destSnapPoint, {
      duration: ANIMATION_DURATION,
    })
    runOnJS(onHandlerEndOnJS)(destSnapPoint)
  }

  const clampedTranslateY = useDerivedValue(() => {
    const translateY = sheetTranslateY.value + translationY.value

    const minTranslateY = Math.max(fullyOpenSnapPoint, translateY)
    return Math.min(closedSnapPoint, minTranslateY)
  })

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (snapPoint === fullyOpenSnapPoint) {
        translationY.value = e.translationY - scrollOffset.value
      } else {
        translationY.value = e.translationY
      }
    })
    .onEnd(onHandlerEnd)
    .withRef(panGestureRef)

  const blockScrollUntilAtTheTop = Gesture.Tap()
    .maxDeltaY(snapPoint - fullyOpenSnapPoint)
    .maxDuration(100000)
    .simultaneousWithExternalGesture(panGesture)
    .withRef(blockScrollUntilAtTheTopRef)

  const headerGesture = Gesture.Pan()
    .onUpdate(e => {
      translationY.value = e.translationY
    })
    .onEnd(onHandlerEnd)

  const scrollViewGesture = Gesture.Native().requireExternalGestureToFail(
    blockScrollUntilAtTheTop,
  )

  // STYLES

  const imageAnimation = useAnimatedStyle(() => {
    return {
      height: clampedTranslateY.value,
    }
  })
  const contentAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: clampedTranslateY.value - closedSnapPoint}],
    }
  })
  const headerState = useDerivedValue(() => {
    return interpolate(
      clampedTranslateY.value,
      [imageSize / 3, imageSize],
      [1, 0],
      'clamp',
    )
  })
  const headerAnimation = useAnimatedStyle(() => {
    return {
      ...styles.headerStyles,
      opacity: headerState.value,
      display: headerState.value === 0 ? 'none' : 'flex',
    }
  }, [styles])
  const avaSizeAnimation = useAnimatedStyle(() => ({
    transform: [{scale: interpolate(headerState.value, [0, 1], [1, 0.6])}],
  }))

  // JSX
  return (
    <>
      <CustomHeader
        style={headerAnimation}
        title="Dmitry"
        iconLeft="arrow-back"
        colorLeft={Color.primary}
        onPressLeft={onBack}
      />
      <Animated.View style={[{height: height + imageSize}, contentAnimation]}>
        <View style={[styles.posterContainer, {height: closedSnapPoint}]}>
          <Animated.Image
            style={[styles.imgContainer, imageAnimation]}
            resizeMode="cover"
            source={{
              uri: bgImageUrl,
            }}
          />
        </View>
        <Animated.View style={[{height, width}, styles.mediumShadow]}>
          <Background style={{height, width}}>
            <GestureDetector gesture={headerGesture}>
              <View>
                <Animated.View style={[styles.ava, avaSizeAnimation]}>
                  <Avatar size="xLarge" uri={avaUrl} />
                </Animated.View>

                <Spacer height={120} />
                {/* <TouchableOpacity style={styles.addressLine}>
                  <Text color={Color.primary} numberOfLines={1} t12>
                    {cryptoAddress}
                  </Text>
                  <View style={styles.copyIconContainer}>
                    <Icon
                      size={18}
                      color={colors.primary}
                      name="copy-outline"
                    />
                  </View>
                </TouchableOpacity>
                <Spacer height={20} /> */}
              </View>
            </GestureDetector>
            <Button
              onPress={onPressCreateEvent}
              style={styles.createEventButton}>
              Create Event
            </Button>
            <GestureDetector
              gesture={Gesture.Simultaneous(panGesture, scrollViewGesture)}>
              <Animated.ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScrollBeginDrag={e => {
                  scrollOffset.value = e.nativeEvent.contentOffset.y
                }}
                style={styles.sectionList}>
                <SectionList
                  scrollEnabled={false}
                  style={styles.sectionList}
                  contentContainerStyle={styles.sectionListContainer}
                  renderItem={({item}) => <TicketCardRow {...item} />}
                  keyExtractor={item => item.id}
                  sections={ticketsData}
                  renderSectionHeader={({section: {title}}) => (
                    <Text t3 color={Color.primary}>
                      {title}
                    </Text>
                  )}
                />
                <Spacer height={bottom + 50} />
              </Animated.ScrollView>
            </GestureDetector>
          </Background>
        </Animated.View>
      </Animated.View>
    </>
  )
}

const rawStyles = StyleSheet.create({
  imgContainer: {
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
  },
  flexOne: {
    flex: 1,
  },
  createEventButton: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sectionListContainer: {
    padding: 20,
  },
  sectionList: {
    flex: 1,
  },
  headerStyles: {
    position: 'absolute',
    width: '100%',
    backgroundColor: Color.bg1,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  mediumShadow: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  ava: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  copyIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  posterContainer: {
    justifyContent: 'flex-end',
  },
})
