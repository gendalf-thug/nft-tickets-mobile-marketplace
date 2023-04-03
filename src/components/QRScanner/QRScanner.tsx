import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useIsFocused} from '@react-navigation/native'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import {Camera, useCameraDevices} from 'react-native-vision-camera'
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner'

import {Background, BlockMessage, Loading, Spacer} from 'src/components/ui'
import {
  useCameraPermissions,
  useIsForeground,
  useThematicStyles,
} from 'src/hooks'
import {Color} from 'src/themeTypes'
interface QRScannerProps {
  onScanBarcodes: (qrValues: string[]) => void
  onPressBack: () => void
  onChoiceImage?: () => void
}

export interface QRScannerRefType {
  showError: (errorText: string) => void
}

type coordinatesType = {x: number; y: number}

export const QRScanner = forwardRef<QRScannerRefType, QRScannerProps>(
  ({onScanBarcodes, onPressBack, onChoiceImage}, ref) => {
    const isFocused = useIsFocused()
    const {top, bottom} = useSafeAreaInsets()

    const isCameraAllowed = useCameraPermissions()
    const cameraRef = useRef<Camera>(null)
    const [flashEnabled, setFlashEnabled] = useState(false)

    const [warning, setWarning] = useState('')
    const {styles, colors} = useThematicStyles(rawStyles)

    // FOCUS RECT
    const [focusRectPoint, setFocusRectPoint] = useState<
      coordinatesType | undefined
    >(undefined)
    const rectFade = useSharedValue(0)

    const devices = useCameraDevices()
    const device = devices.back
    const [frameProcessor, barcodes] = useScanBarcodes(
      [BarcodeFormat.QR_CODE],
      {
        checkInverted: true,
      },
    )
    const isForeground = useIsForeground()

    const barcodeValues = Array.from(
      new Set(
        barcodes
          .map(barcode => barcode.displayValue)
          .filter(Boolean) as string[],
      ),
    )

    const toggleFlash = () => {
      setFlashEnabled(pr => !pr)
    }

    useEffect(() => {
      onScanBarcodes(barcodeValues)
    }, [barcodeValues])

    // 200 IQ мув с useMemo()
    const showError = useMemo(() => {
      let timeoutId: any
      return (error: string) => {
        if (error) {
          clearTimeout(timeoutId)
          setWarning(error ?? '')
          timeoutId = setTimeout(() => {
            setWarning('')
          }, 2000)
        }
      }
    }, [])

    useImperativeHandle(ref, () => ({
      showError,
    }))

    const changeFocus = (coordinates: coordinatesType) => {
      device?.supportsFocus && cameraRef.current?.focus(coordinates)
      setFocusRectPoint(coordinates)
      rectFade.value = 0
      rectFade.value = withTiming(1, {duration: 300})
    }

    const rectAnim = useAnimatedStyle(() => {
      return {
        opacity: rectFade.value,
        top: focusRectPoint?.y,
        left: focusRectPoint?.x,
        transform: [
          {translateX: -30},
          {translateY: -30},
          {scale: interpolate(rectFade.value, [0, 1], [1.2, 1])},
        ],
      }
    })

    const flashlightGesture = Gesture.Tap()
      .numberOfTaps(1)
      .onFinalize(() => runOnJS(toggleFlash)())

    const imageChoiceGesture = Gesture.Tap()
      .numberOfTaps(1)
      .onFinalize(() => onChoiceImage && runOnJS(onChoiceImage)())

    const focusGesture = Gesture.Tap()
      .numberOfTaps(1)
      .requireExternalGestureToFail(flashlightGesture, imageChoiceGesture)
      .onEnd(e => {
        if (e.x !== 0 && e.y !== 0) runOnJS(changeFocus)({x: e.x, y: e.y})
      })

    if (device == null || !isCameraAllowed) return <Loading />

    return isFocused ? (
      <Background style={styles.container}>
        <GestureDetector gesture={focusGesture}>
          <Animated.View style={styles.container}>
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={!isForeground}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
              torch={flashEnabled ? 'on' : 'off'}
            />
            <Animated.View style={[rectAnim, styles.focusRect]} />
            <TouchableOpacity
              onPress={onPressBack}
              style={[styles.backContainer, {marginTop: top + 20}]}>
              <Icon name="arrow-back" size={28} color={colors.primary} />
            </TouchableOpacity>
            <View style={[styles.bottomView, {marginBottom: bottom + 26}]}>
              <View style={styles.buttonsContainer}>
                <GestureDetector gesture={flashlightGesture}>
                  <Animated.View
                    style={[
                      styles.actionButton,
                      {
                        borderColor: flashEnabled
                          ? colors.primary
                          : colors.inactive,
                      },
                    ]}>
                    <Icon
                      name={flashEnabled ? 'ios-flash' : 'ios-flash-off'}
                      size={28}
                      color={flashEnabled ? colors.primary : colors.inactive}
                    />
                  </Animated.View>
                </GestureDetector>
                {onChoiceImage && (
                  <GestureDetector gesture={imageChoiceGesture}>
                    <Animated.View
                      style={[
                        styles.actionButton,
                        {
                          borderColor: colors.inactive,
                        },
                      ]}>
                      <Icon
                        name="ios-image"
                        size={28}
                        color={colors.inactive}
                      />
                    </Animated.View>
                  </GestureDetector>
                )}
              </View>
              <Spacer height={24} />
              <View style={[styles.warningContainer]}>
                {warning && (
                  <BlockMessage blockType="error">{warning}</BlockMessage>
                )}
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </Background>
    ) : null
  },
)

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    padding: 6,
    borderRadius: 100,
    backgroundColor: Color.primaryOpacity2,
  },
  actionButton: {
    alignSelf: 'center',
    padding: 8,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: Color.primaryOpacity2,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  warningContainer: {
    marginHorizontal: 20,
    backgroundColor: Color.bg,
    borderRadius: 8,
  },
  focusRect: {
    borderWidth: 1,
    borderColor: Color.primary,
    width: 60,
    height: 60,
    position: 'absolute',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 56,
  },
})
