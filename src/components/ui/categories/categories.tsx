import React, {useState} from 'react'

import {FlatList, StyleSheet, View} from 'react-native'

import {Color} from 'src/themeTypes'
import {categoriesData} from 'src/variables/temporaryData'

import {CategoryItem} from '.'
import {Separator} from '..'
import {HeaderList} from '../headerList'

function SeparatorMargin() {
  return <Separator margin={7.5} />
}

export function Categories() {
  const [selectItem, setSelectItem] = useState('0')
  return (
    <View style={styles.container}>
      <HeaderList title={'Categories'} button={'See all'} />
      <FlatList
        horizontal
        data={categoriesData}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        renderItem={({item: {id, title}}) => (
          <CategoryItem
            onPress={() => setSelectItem(id)}
            isSelected={selectItem === `${id}`}
            title={title}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={SeparatorMargin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginBottom: 20,
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
    paddingHorizontal: 21,
    paddingVertical: 9,
  },
  touchable: {
    borderRadius: 100,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
})
