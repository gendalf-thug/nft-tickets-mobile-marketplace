import React, {useState} from 'react'

import {FlatList, StyleSheet, View} from 'react-native'

import {Text} from 'src/components/ui'
import {Color} from 'src/themeTypes'

import {CategoryItem} from '.'
import {Spacer} from '../Spacer'

interface CategoriesProps {
  list: string[]
  onlyList?: boolean
  canPress?: boolean
  onSelect?: (item: string) => void
  defaultSelection?: string
}

export function Categories({
  list,
  onSelect,
  onlyList,
  canPress,
  defaultSelection,
}: CategoriesProps) {
  const [selectItem, setSelectItem] = useState(defaultSelection)
  const renderList = (
    <FlatList
      horizontal
      data={list}
      contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <CategoryItem
          canPress={canPress}
          onPress={() => {
            onSelect?.(item)
            setSelectItem(item)
          }}
          isSelected={selectItem === item}
          title={item}
        />
      )}
      keyExtractor={(item, id) => String(id)}
      ItemSeparatorComponent={() => <Spacer width={6} />}
    />
  )

  if (onlyList) return renderList

  return (
    <View style={styles.container}>
      <Text style={styles.text} h3>
        Категории
      </Text>
      <Spacer height={8} />
      {renderList}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  itemButton: {
    borderRadius: 150,
    borderColor: Color.primary,
    borderWidth: 2,
  },
  separator: {
    marginHorizontal: 7.5,
  },
  text: {
    paddingHorizontal: 20,
  },
  touchable: {
    borderRadius: 100,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
})
