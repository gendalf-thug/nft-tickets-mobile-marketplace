import React, {useCallback, useState} from 'react'

import {useFocusEffect} from '@react-navigation/native'
import BackgroundTimer from 'react-native-background-timer'
import Orientation from 'react-native-orientation-locker'

import {Welcome} from 'src/components/Welcome'
import {useTypedNavigation} from 'src/hooks'

import welcomeImages from 'assets/images/welcome-images'

export function WelcomeScreen() {
  const {replace} = useTypedNavigation()
  const [imageId, setImageId] = useState(0)

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait()
      BackgroundTimer.runBackgroundTimer(() => {
        setImageId(pr => {
          if (pr >= welcomeImages.length - 1) {
            return 0
          } else {
            return pr + 1
          }
        })
      }, 12000)
      return () => {
        BackgroundTimer.stopBackgroundTimer()
        Orientation.unlockAllOrientations()
      }
    }, []),
  )

  const onContinue = () => {
    replace('connectWallet')
  }

  return (
    <Welcome
      images={welcomeImages}
      currentImageId={imageId}
      onContinue={onContinue}
    />
  )
}
