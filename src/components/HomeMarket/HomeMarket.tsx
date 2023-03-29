import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'

import {Background, Spacer, Text, TicketCardColumn} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {TicketInfo} from 'src/types'
import {fakeTicketsData} from 'src/variables/fakeData'

import {HomeMarketHeader} from './HomeMarketHeader'

import {Categories} from '../ui/Categories'

interface HomeMarketProps {
  onPressCard: (item: TicketInfo) => void
  onPressSearch: () => void
  onPressScan: () => void
}

export function HomeMarket({
  onPressCard,
  onPressSearch,
  onPressScan,
}: HomeMarketProps) {
  const {styles} = useThematicStyles(rawStyles)

  return (
    <Background>
      <HomeMarketHeader
        onPressSearch={onPressSearch}
        onPressScan={onPressScan}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Categories />
          <Spacer height={16} />
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal
              data={fakeTicketsData}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              renderItem={({item}) => (
                <TicketCardColumn onPress={onPressCard} {...item} />
              )}
              keyExtractor={item => String(item.id)}
              ItemSeparatorComponent={Separator}
            />
          </View>
          <Text style={styles.marginHorizontal} h3>
            Скоро начнутся
          </Text>
          <Spacer height={12} />
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal
              data={fakeTicketsData}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              renderItem={({item}) => (
                <TicketCardColumn onPress={onPressCard} {...item} />
              )}
              keyExtractor={item => String(item.id)}
              ItemSeparatorComponent={Separator}
            />
          </View>
          <Text style={styles.marginHorizontal} h3>
            Новые премьеры
          </Text>
          <Spacer height={12} />
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal
              data={fakeTicketsData}
              contentContainerStyle={styles.contentContainer}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TicketCardColumn onPress={onPressCard} {...item} />
              )}
              keyExtractor={item => String(item.id)}
              ItemSeparatorComponent={Separator}
            />
          </View>
        </View>
      </ScrollView>
    </Background>
  )
}

function Separator() {
  return <Spacer width={12.5} />
}

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  marginHorizontal: {
    marginHorizontal: 20,
  },
  flatListContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 22,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
})
