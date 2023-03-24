import {useEffect, useState} from 'react'

import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native'
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions'

export function useCameraPermissions() {
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const onPermissionsFail = () =>
      Alert.alert(
        'Error',
        'The camera is locked for this app, but you can allow it in the app settings',
        [
          {
            text: 'Grant permission',
            onPress: Linking.openSettings,
            style: 'default',
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      )

    async function requestCameraPermissionAndroid() {
      const isCameraAuthorized = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )
      if (isCameraAuthorized === PermissionsAndroid.RESULTS.GRANTED) {
        setIsAllowed(true)
      } else onPermissionsFail()
    }
    async function requestCameraPermissionIos() {
      const isCameraAuthorized =
        (await check(PERMISSIONS.IOS.CAMERA)) === RESULTS.GRANTED
      if (isCameraAuthorized) setIsAllowed(true)
      else {
        const CameraPermissionStatus = await request(PERMISSIONS.IOS.CAMERA)
        if (CameraPermissionStatus === RESULTS.GRANTED) {
          setIsAllowed(true)
          return
        }
        onPermissionsFail()
      }
    }

    switch (Platform.OS) {
      case 'android':
        requestCameraPermissionAndroid()
        break
      case 'ios':
        requestCameraPermissionIos()
        break
    }
  }, [])
  return isAllowed
}
