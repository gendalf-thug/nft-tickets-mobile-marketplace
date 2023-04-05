import React from 'react'

import {SectionList, StyleSheet, View} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {TicketInfo} from 'src/types'

import {
  Background,
  Button,
  HomeHeader,
  Spacer,
  Text,
  TicketCardRow,
} from '../ui'

interface HomeTicketsProps {
  ticketSections: {data: TicketInfo[]; title: string}[]
  onPressScan?: () => void
  onPressSearch?: () => void
  onPressCard?: () => void
  onPressCreateTickets: () => void
}

export function HomeTickets({
  onPressScan,
  onPressSearch,
  ticketSections,
  onPressCard,
  onPressCreateTickets,
}: HomeTicketsProps) {
  const scrollY = useSharedValue(0)
  const isVisible = useSharedValue(1)

  const handleScroll = useAnimatedScrollHandler(event => {
    const currentOffset = event.contentOffset.y

    if (currentOffset > scrollY.value) {
      // scrolling down
      const diff = currentOffset - scrollY.value
      if (diff > 10) {
        // adjust this threshold to your liking
        isVisible.value = withTiming(0, {duration: 200})
      }
    } else if (scrollY.value - currentOffset > 10) {
      // scrolling up by at least 10 units
      isVisible.value = withTiming(1, {duration: 200})
    }

    scrollY.value = currentOffset
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: isVisible.value,
      transform: [{translateY: interpolate(isVisible.value, [0, 1], [80, 0])}],
    }
  })

  const {styles} = useThematicStyles(rawStyles)

  return (
    <Background>
      <HomeHeader onPressScan={onPressScan} onPressSearch={onPressSearch} />
      <Animated.ScrollView
        style={styles.container}
        onScroll={handleScroll}
        bounces={false}
        scrollEventThrottle={1}>
        <SectionList
          scrollEnabled={false}
          renderItem={({item}) => (
            <TicketCardRow onPress={onPressCard} {...item} />
          )}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={item => String(item.id)}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.sectionHeaderContainer}>
              <Spacer height={8} />
              <Text h3>{title}</Text>
              <Spacer height={2} />
            </View>
          )}
          sections={ticketSections}
        />
      </Animated.ScrollView>
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <Button onPress={onPressCreateTickets}>Create tickets</Button>
      </Animated.View>
    </Background>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    bottom: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  sectionHeaderContainer: {
    width: '100%',
    backgroundColor: Color.bg,
  },
})
