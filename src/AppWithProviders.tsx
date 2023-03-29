import React, {useEffect} from 'react'

import {StatusBar, StyleSheet} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import {App} from 'src/App'

import {ThemeProvider} from './contexts'

export function AppWithProviders() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={styles.flexOne}>
        <SafeAreaProvider>
          <StatusBar />
          <App />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  flexOne: {flex: 1},
})
