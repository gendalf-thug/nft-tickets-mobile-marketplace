import React, {useCallback, useState} from 'react'

import {useFocusEffect} from '@react-navigation/native'
import BackgroundTimer from 'react-native-background-timer'

import {Welcome} from 'src/components/Welcome'
import {useScreenBlockPortrait, useTypedNavigation} from 'src/hooks'

import welcomeImages from 'assets/images/welcome-images'

export function WelcomeScreen() {
  const {replace} = useTypedNavigation()
  const [imageId, setImageId] = useState(0)
  useScreenBlockPortrait()

  useFocusEffect(
    useCallback(() => {
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
