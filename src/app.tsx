import React from 'react'

import {IS_DEVELOPMENT} from '@env'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useWalletConnect} from '@walletconnect/react-native-dapp'
import {useColorScheme} from 'react-native'

import {navigator} from 'src/navigator'
import {Home} from 'src/screens/home'
import {TicketDetailScreen} from 'src/screens/TicketDetail'
import {WelcomeScreen} from 'src/screens/Welcome'
import {RootStackParamList} from 'src/types'

import {useTheme} from './hooks'
import {ConnectWalletScreen} from './screens/ConnectWallet'
import {CreateEventScreen} from './screens/CreateEvent'
import {ProfileScreen} from './screens/Profile'
import {ProposalScreen} from './screens/Proposal'
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
  const isWalletConnected = useWalletConnect().connected
  const {colors} = useTheme()
  const isDark = useColorScheme() === 'dark'
  const initialScreen = isWalletConnected ? 'home' : 'welcome'
  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          background: colors.bg1,
          border: colors.grayStroke,
          card: colors.card,
          primary: colors.primary,
          text: colors.textBase1,
          notification: colors.primary,
        },
      }}
      ref={navigator}>
      <Stack.Navigator
        initialRouteName={IS_DEVELOPMENT ? 'home' : initialScreen}
        screenOptions={basicScreenOptions}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="home" component={Home} />

        <Stack.Group screenOptions={gestureEnabled}>
          <Stack.Screen name="connectWallet" component={ConnectWalletScreen} />
          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="ticketDetail" component={TicketDetailScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="proposal" component={ProposalScreen} />
          <Stack.Screen name="scan" component={QRScannerScreen} />
          <Stack.Screen name="result" component={ResultScreen} />
          <Stack.Screen name="createEvent" component={CreateEventScreen} />
          <Stack.Screen name="qr" component={QRCodeScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
