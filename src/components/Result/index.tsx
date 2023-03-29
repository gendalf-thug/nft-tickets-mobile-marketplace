import React, {useState} from 'react'

import {StyleSheet, View} from 'react-native'
import {
  OrientationType,
  useOrientationChange,
} from 'react-native-orientation-locker'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import Error from './Error.svg'
import Successfully from './Successfully.svg'

import {Background, Button, Text} from '../ui'

interface ResultT {
  onContinue: () => void
  isSuccessfully: boolean
  text: string
}
export function Result({onContinue, isSuccessfully, text}: ResultT) {
  const {styles} = useThematicStyles(rawStyles)
  const [isLandscape, setIsLandscape] = useState<boolean>()

  useOrientationChange(orientation => {
    setIsLandscape(
      orientation === OrientationType['LANDSCAPE-LEFT'] ||
        orientation === OrientationType['LANDSCAPE-RIGHT'],
    )
  })

  return (
    <Background style={[styles.container, isLandscape && styles.lsContainer]}>
      <View style={styles.imgContainer}>
        {isSuccessfully ? (
          <Successfully width="70%" height="70%" />
        ) : (
          <Error width="70%" height="70%" />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text color={Color.textBase1} center t6>
          {text}
        </Text>
        <Button
          style={styles.buttonStyle}
          onPress={onContinue}
          children="Confirm"
        />
      </View>
    </Background>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  lsContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    width: '85%',
    alignSelf: 'center',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
