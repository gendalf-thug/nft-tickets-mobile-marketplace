import {ImageStyle, TextStyle, ViewStyle} from 'react-native'

export interface ThemeColors {
  primary: string
  primaryOpacity1: string
  primaryOpacity2: string

  secondary: string
  bg: string
  card: string
  border: string
  inactive: string

  inputBg: string

  textBase1: string
  textBase2: string

  textSecondary1: string

  white: string
  black: string
  specialDark: string

  textRed1: string
  opacityRed1: string
  textBlue1: string
  opacityBlue1: string
  textYellow1: string
  opacityYellow1: string
}

export interface ThemeDictionaryType {
  [key: string]: ThemeColors
}

export type SomeStyle = ViewStyle | TextStyle | ImageStyle
export type NamedStyles<T> = {
  [P in keyof T]: SomeStyle
}

export enum Color {
  primary = 'primary',
  primaryOpacity1 = 'primaryOpacity1',
  primaryOpacity2 = 'primaryOpacity2',

  secondary = 'secondary',
  bg = 'bg',
  card = 'card',
  border = 'border',
  inactive = 'inactive',

  inputBg = 'inputBg',

  textBase1 = 'textBase1',
  textBase2 = 'textBase2',

  textSecondary1 = 'textSecondary1',

  white = 'white',
  black = 'black',
  specialDark = 'specialDark',

  textBlue1 = 'textBlue1',
  opacityBlue1 = 'opacityBlue1',
  textRed1 = 'textRed1',
  opacityRed1 = 'opacityRed1',
  textYellow1 = 'textYellow1',
  opacityYellow1 = 'opacityYellow1',
}
