import React, {forwardRef, useImperativeHandle, useState} from 'react'

import {useIsFocused} from '@react-navigation/native'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {CameraScreen} from 'react-native-camera-kit'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Background, Loading, Text} from 'src/components/ui'
import {useCameraPermissions, useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
interface QRScannerProps {
  onScanBarcode: (qrValue: string) => void
  onPressBack: () => void
}

export interface QRScannerRefType {
  showError: (errorText: string) => void
}

export const QRScanner = forwardRef<QRScannerRefType, QRScannerProps>(
  ({onScanBarcode, onPressBack}, ref) => {
    const isFocused = useIsFocused()
    const isCameraAllowed = useCameraPermissions()
    const {top} = useSafeAreaInsets()
    const [warning, setWarning] = useState('')
    const {styles, colors} = useThematicStyles(rawStyles)

    useImperativeHandle(ref, () => ({
      showError(error?: string) {
        setWarning(error ?? '')
      },
    }))

    return isFocused ? (
      <Background style={styles.container}>
        {isCameraAllowed ? (
          <CameraScreen
            scanBarcode={true}
            zoomMode={'off'}
            onReadCode={event =>
              onScanBarcode(event.nativeEvent.codeStringValue)
            }
            cameraRatioOverlay={undefined}
            captureButtonImage={undefined}
            cameraFlipImage={undefined}
            hideControls={true}
            showFrame={false}
            laserColor="transparent"
            frameColor="transparent"
            torchOnImage={undefined}
            torchOffImage={undefined}
            torchImageStyle={{}}
            captureButtonImageStyle={{}}
            cameraFlipImageStyle={{}}
            onBottomButtonPressed={() => {}}
          />
        ) : (
          <Loading text={'Loading the camera, please wait.'} />
        )}
        {isCameraAllowed && (
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={'scan-helper'} style={styles.icon} />
          </View>
        )}
        {warning && (
          <View style={[styles.hint, {marginTop: top + 20}]}>
            <Text t17 color={Color.textBase3}>
              {warning}
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={onPressBack}
          style={[styles.backContainer, {paddingTop: top}]}>
          <Icon name="arrow-back" size={24} color={colors.textBase1} />
        </TouchableOpacity>
      </Background>
    ) : null
  },
)

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 300,
    opacity: 0.5,
    color: Color.primary,
  },
  hint: {
    position: 'absolute',
    alignSelf: 'center',
    width: 180,
    height: 40,
    borderRadius: 100,
    backgroundColor: Color.graphicBase1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
})
