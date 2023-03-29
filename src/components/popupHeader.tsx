import React, {useEffect} from 'react'

import {NavigationAction} from '@react-navigation/routers'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {IconButton, Text} from 'src/components/ui'
import {useTypedNavigation} from 'src/hooks'
import {Color} from 'src/themeTypes'

type PopupHeaderProps = {
  name: string
  tab?: boolean
  canBack?: boolean
}
const DEFAULT_HITSLOP = {top: 10, bottom: 10, left: 10, right: 10}

export function PopupHeader({canBack, name}: PopupHeaderProps) {
  const insets = useSafeAreaInsets()
  const navigation = useTypedNavigation()

  useEffect(() => {
    const subscription = (e: {
      preventDefault: () => void
      data: {action: NavigationAction}
    }) => {
      if (!canBack && !e.data.action.source) {
        e.preventDefault()
      }
    }

    navigation.addListener('beforeRemove', subscription)

    return () => {
      navigation.removeListener('beforeRemove', subscription)
    }
  }, [navigation])

  return (
    <View style={[style.container, {marginTop: insets.top}]}>
      {canBack ? (
        <IconButton onPress={navigation.goBack} hitSlop={DEFAULT_HITSLOP}>
          <MaterialCommunityIcons
            name="arrow-left"
            style={[style.icon, {color: Color.graphicBase1}]}
          />
        </IconButton>
      ) : (
        <View style={style.spacer} />
      )}
      <Text t8 center color={Color.textBase1}>
        {name}
      </Text>
      <View style={style.spacer} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 56,
    flexDirection: 'row',
    zIndex: 1,
  },
  spacer: {
    width: 24,
    height: 24,
  },
  icon: {
    fontSize: 24,
  },
})
