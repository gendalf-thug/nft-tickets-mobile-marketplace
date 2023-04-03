import {useEffect} from 'react'

import {useIsFocused} from '@react-navigation/native'
import Orientation from 'react-native-orientation-locker'

export const useScreenBlockPortrait = () => {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      Orientation.lockToPortrait()
    } else {
      Orientation.unlockAllOrientations()
    }
    return () => Orientation.unlockAllOrientations()
  }, [isFocused])
}
