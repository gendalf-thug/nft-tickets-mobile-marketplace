import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useColorScheme} from 'react-native'

import {navigator} from 'src/navigator'
import {Home} from 'src/screens/Home'
import {TicketDetailScreen} from 'src/screens/TicketDetail'
import {WelcomeScreen} from 'src/screens/Welcome'
import {RootStackParamList} from 'src/types'

import {useTheme} from './hooks'
import {ConnectWalletScreen} from './screens/ConnectWallet'
import {CreateEventScreen} from './screens/CreateEvent'
import {QRCodeScreen} from './screens/QRCodeScreen'
import {QRScannerScreen} from './screens/QRScanner'
import {ResultScreen} from './screens/ResultScreen'
import {SearchScreen} from './screens/Search'
import {SettingsScreen} from './screens/SettingsScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const basicScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
}

const gestureEnabled = {
  gestureEnabled: true,
}

export function App() {
  const {colors} = useTheme()
  const isDark = useColorScheme() === 'dark'
  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          background: colors.bg,
          border: colors.border,
          card: colors.card,
          primary: colors.primary,
          text: colors.textBase1,
          notification: colors.primary,
        },
      }}
      ref={navigator}>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={basicScreenOptions}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="home" component={Home} />

        <Stack.Group screenOptions={gestureEnabled}>
          <Stack.Screen name="connectWallet" component={ConnectWalletScreen} />
          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="ticketDetail" component={TicketDetailScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="scan" component={QRScannerScreen} />
          <Stack.Screen name="result" component={ResultScreen} />
          <Stack.Screen name="createEvent" component={CreateEventScreen} />
          <Stack.Screen name="qr" component={QRCodeScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
