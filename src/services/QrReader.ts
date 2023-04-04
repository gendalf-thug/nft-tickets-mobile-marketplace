import {NativeModules} from 'react-native'

export const readQR = NativeModules.QrReader.readerQR as (
  uri: string,
) => Promise<string[]>
