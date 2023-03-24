import React from 'react'

import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {RouteProp} from '@react-navigation/native'

import {TabBar} from 'src/components/ui'
import {TabParamList} from 'src/types'

import {HomeDatingScreen} from './HomeDating'
import {HomeGovernanceScreen} from './HomeGovernance'
import {HomeStakingScreen} from './HomeStakingScreen'
import {HomeTicketsMarketScreen} from './HomeTicketsMarket'

const Tab = createBottomTabNavigator<TabParamList>()

export const screenOptions = ({}: {
  route: RouteProp<TabParamList>
  navigation: any
}): BottomTabNavigationOptions => ({
  headerShadowVisible: false,
})

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />

export function Home() {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="homeTicketsMarket"
        component={HomeTicketsMarketScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeStaking"
        component={HomeStakingScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeGovernance"
        component={HomeGovernanceScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeDating"
        component={HomeDatingScreen}
        options={screenOptions}
      />
    </Tab.Navigator>
  )
}
