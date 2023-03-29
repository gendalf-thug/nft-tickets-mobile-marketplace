import React, {useEffect, useState} from 'react'

import {HeaderButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types'
import {FlatList, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {useTheme, useTypedNavigation} from 'src/hooks'
import {TicketInfo} from 'src/types'
import {IS_ANDROID} from 'src/variables'
import {fakeTicketsData} from 'src/variables/fakeData'

import {SearchNoResults} from './SearchNoResults'

import {Background, Spacer, TicketCardRow} from '../ui'

function SearchData(searchPhrase: string) {
  let data: TicketInfo[] = []
  fakeTicketsData.map(item => {
    if (searchPhrase === '') {
      return data.push(item)
    }
    if (
      item.title
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    )
      return data.push(item)
    else return
  })
  return data
}

interface SearchProps {
  onPressCard: (item: TicketInfo) => void
}

function HeaderRight({isFocused}: HeaderButtonProps & {isFocused: boolean}) {
  const {colors} = useTheme()
  if (IS_ANDROID && isFocused) return <></>
  return (
    <TouchableOpacity>
      <Ionicons color={colors.primary} name="swap-vertical-sharp" size={24} />
    </TouchableOpacity>
  )
}
export function Search({onPressCard}: SearchProps) {
  const {bottom} = useSafeAreaInsets()
  const [searchPhrase, setSearchPhrase] = useState('')
  const navigation = useTypedNavigation()
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const headerRight = (props: HeaderButtonProps) => (
      <HeaderRight isFocused={isFocused} {...props} />
    )
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitle: 'Search',
      headerRight,
      headerSearchBarOptions: {
        placeholder: 'Search',
        hideWhenScrolling: true,
        onChangeText({nativeEvent: {text}}) {
          setSearchPhrase(text)
        },
        onFocus() {
          setIsFocused(true)
        },
        onBlur() {
          setIsFocused(false)
        },
      },
    })
  }, [isFocused])

  const footer = () => <Spacer height={bottom} />

  return (
    <Background style={[styles.container]}>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={SearchNoResults}
        data={SearchData(searchPhrase)}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TicketCardRow onPress={onPressCard} {...item} />
        )}
        ListFooterComponent={footer}
        keyExtractor={item => String(item.id)}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 20,
  },
})
