import React, {useState} from 'react'

import {FlatList, StyleSheet, View} from 'react-native'

import {Text} from 'src/components/ui'
import {Color} from 'src/themeTypes'
import {fakeCategoriesData} from 'src/variables/fakeData'

import {CategoryItem} from '.'
import {Spacer} from '../Spacer'

export function Categories() {
  const [selectItem, setSelectItem] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.text} h3>
        Категории
      </Text>
      <Spacer height={8} />
      <FlatList
        horizontal
        data={fakeCategoriesData}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CategoryItem
            onPress={() => setSelectItem(index)}
            isSelected={selectItem === index}
            title={item}
          />
        )}
        keyExtractor={(item, id) => String(id)}
        ItemSeparatorComponent={() => <Spacer width={7.5} />}
      />
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
