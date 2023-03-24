import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'

import {Background, Spacer, TicketCardColumn} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {TicketInfo} from 'src/types'
import {ticketsData} from 'src/variables/temporaryData'

import {HomeMarketHeader} from './HomeMarketHeader'

import {Categories} from '../ui/categories'
import {HeaderList} from '../ui/headerList'

interface HomeMarketProps {
  onPressCard: (item: TicketInfo) => void
  onPressProfile: () => void
  onPressSettings: () => void
  onPressSearch: () => void
  onPressScan: () => void
}

export function HomeMarket({
  onPressCard,
  onPressProfile,
  onPressSettings,
  onPressSearch,
  onPressScan,
}: HomeMarketProps) {
  const {styles} = useThematicStyles(rawStyles)

  return (
    <Background>
      <HomeMarketHeader
        onPressSettings={onPressSettings}
        onPressProfile={onPressProfile}
        onPressSearch={onPressSearch}
        onPressScan={onPressScan}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Categories />
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal
              data={ticketsData}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              renderItem={({item}) => (
                <TicketCardColumn onPress={onPressCard} {...item} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
            />
          </View>
          <HeaderList title="Newest Events" button="See all" />
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal
              data={ticketsData}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              renderItem={({item}) => (
                <TicketCardColumn onPress={onPressCard} {...item} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
            />
          </View>
          <HeaderList title="Expiring Soon" button="See all" />
          <View style={styles.flatListContainer}>
            <FlatList
              horizontal
              data={ticketsData}
              contentContainerStyle={styles.contentContainer}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TicketCardColumn onPress={onPressCard} {...item} />
              )}
              keyExtractor={item => item.id}
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
    paddingTop: 10,
  },
  flatListContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
})
