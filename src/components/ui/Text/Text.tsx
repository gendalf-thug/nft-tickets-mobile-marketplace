import * as React from 'react'

import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native'

import {useTheme} from 'src/hooks'
import {Color} from 'src/themeTypes'

export type TextProps = Omit<RNTextProps, 'style' | 'children'> & {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  p1?: boolean
  p2?: boolean
  l1?: boolean
  l2?: boolean
  bold?: boolean
  center?: boolean
  right?: boolean
  color?: Color
  style?: StyleProp<TextStyle>
  children?: React.ReactNode
}

/**
 * @param h1 - Headline 32 Bold
 * @param h2 - Headline 26 Bold
 * @param h3 - Headline 20 Bold
 * @param h4 - Headline 18 Bold
 * @param p1 - Paragraph 14
 * @param p2 - Paragraph 12
 * @param l1 - Label 10 Bold
 * @param l2 - Label 12 Bold
 * @param bold - It makes the text bold
 * @param center - "textAlign: center"
 * @param right - "textAlign: right"
 * @param color - From enum Color
 * @param style - Additional style
 * @param children - Text
 */

export function Text({
  h1,
  h2,
  h3,
  h4,
  p1,
  p2,
  l1,
  l2,
  bold,
  center,
  right,
  color = Color.textBase1,
  style,
  children,
  ...props
}: TextProps) {
  const textColor = useTheme().colors[color]
  return (
    <RNText
      allowFontScaling={false}
      testID="text"
      style={[
        h1 && styles.headline1,
        h2 && styles.headline2,
        h3 && styles.headline3,
        h4 && styles.headline4,
        p1 && (bold ? styles.paragraphBold1 : styles.paragraph1),
        p2 && (bold ? styles.paragraphBold2 : styles.paragraph2),
        l1 && styles.label1,
        l2 && styles.label2,
        style,
        {color: textColor},
        center && styles.center,
        right && styles.right,
      ]}
      {...props}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  headline1: {
    fontFamily: 'Oswald-Bold',
    fontSize: 32,
  },
  headline2: {
    fontFamily: 'Oswald-Bold',
    fontSize: 26,
  },
  headline3: {
    fontFamily: 'Oswald-Bold',
    fontSize: 20,
  },
  headline4: {
    fontFamily: 'Oswald-Bold',
    fontSize: 18,
  },
  paragraph1: {
    fontFamily: 'PTSans-Regular',
    fontSize: 14,
  },
  paragraphBold1: {
    fontFamily: 'PTSans-Bold',
    fontSize: 14,
  },
  paragraph2: {
    fontFamily: 'PTSans-Regular',
    fontSize: 12,
  },
  paragraphBold2: {
    fontFamily: 'PTSans-Bold',
    fontSize: 12,
  },
  label1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
  },
  label2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
})
