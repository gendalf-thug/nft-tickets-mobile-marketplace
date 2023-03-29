import React from 'react'

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

import {Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

const Icons = {
  error: {
    component: (props: SvgIconProps) => <ErrorIcon {...props} />,
    color: Color.textRed1,
    bgColor: Color.opacityRed1,
  },
  warning: {
    component: (props: SvgIconProps) => <WarningIcon {...props} />,
    color: Color.textYellow1,
    bgColor: Color.opacityYellow1,
  },
  info: {
    component: (props: SvgIconProps) => <InfoIcon {...props} />,
    color: Color.textBlue1,
    bgColor: Color.opacityBlue1,
  },
}

interface BlockMessageProps {
  blockType?: keyof typeof Icons
  hideIcon?: boolean
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  numberOfLines?: number
}

export function BlockMessage({
  blockType = 'info',
  style,
  hideIcon,
  children,
  numberOfLines,
}: BlockMessageProps) {
  const {styles, colors} = useThematicStyles(rawStyles)
  const {component: IconComponent, color, bgColor} = Icons[blockType]

  const textStyle = [styles.text, !hideIcon ? styles.iconText : null]
  const containerStyle = [styles.container, {backgroundColor: colors[bgColor]}]

  return (
    <View style={[containerStyle, style]}>
      {!hideIcon && <IconComponent size={18} color={colors[color]} />}
      <View style={styles.textContainer}>
        <Text
          numberOfLines={numberOfLines}
          ibm3
          style={textStyle}
          color={color}>
          {children}
        </Text>
      </View>
    </View>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  textContainer: {
    flex: 1,
    flexWrap: 'wrap',
  },
  iconText: {marginLeft: 6},
  text: {},
})

export type SvgIconProps = SvgProps & {size?: number}

export function InfoIcon({
  size = 16,
  color = '#007AFF',
  ...props
}: SvgIconProps) {
  return (
    <Svg viewBox="0 0 16 16" width={size} height={size} fill="none" {...props}>
      <Path
        d="M3.285 12.713a6.667 6.667 0 1 1 9.43-9.425 6.667 6.667 0 0 1-9.43 9.425ZM3.9 4.01c-.888.886-1.386 2.202-1.51 3.45-.124 1.248.246 2.668.942 3.711.696 1.044 1.816 1.821 3.016 2.186s2.714.276 3.873-.204c1.16-.479 2.195-1.26 2.787-2.367.592-1.106.857-2.94.613-4.171-.244-1.23-.979-2.259-1.948-3.055-.97-.796-2.422-1.23-3.676-1.23-1.436-.001-3.08.667-4.097 1.68Z"
        fill={color}
      />
      <Path
        d="M7.212 7.747v2.794a.787.787 0 0 0 1.571 0V7.747a.787.787 0 0 0-1.571 0ZM7.362 5.05a.777.777 0 0 0-.14.427v-.001a.786.786 0 0 0 .777.797.777.777 0 1 0-.637-1.222Z"
        fill={color}
      />
    </Svg>
  )
}

export function WarningIcon({
  size = 16,
  color = '#B26F1D',
  ...props
}: SvgIconProps) {
  return (
    <Svg viewBox="0 0 16 16" width={size} height={size} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.166 2.46c.2-.402.53-.727.94-.923 1.013-.486 2.235-.072 2.729.923l4.625 9.321c.136.274.207.575.207.88 0 1.108-.914 2.006-2.041 2.006H3.375c-.31 0-.616-.07-.895-.203a1.99 1.99 0 0 1-.94-2.683l4.626-9.32ZM8 6.642c-.375 0-.68.3-.68.669v2.006c0 .37.305.669.68.669.376 0 .68-.3.68-.669V7.311A.675.675 0 0 0 8 6.642Zm-.68 4.681c0 .37.305.669.68.669.376 0 .68-.3.68-.669a.675.675 0 0 0-.68-.669c-.375 0-.68.3-.68.67Zm.069-8.742a.686.686 0 0 1 1.223 0l4.86 9.966a.66.66 0 0 1 .068.293c0 .37-.304.67-.68.67H3.12a.69.69 0 0 1-.298-.069.664.664 0 0 1-.313-.894l4.88-9.966Z"
        fill={color}
      />
    </Svg>
  )
}

export function ErrorIcon({
  size = 16,
  color = '#E16363',
  ...props
}: SvgIconProps) {
  return (
    <Svg viewBox="0 0 16 16" width={size} height={size} fill="none" {...props}>
      <Path
        d="M8 14.667A6.674 6.674 0 0 1 1.333 8 6.674 6.674 0 0 1 8 1.333 6.674 6.674 0 0 1 14.667 8 6.674 6.674 0 0 1 8 14.667ZM8 2.2C4.858 2.201 2.183 4.857 2.183 8c0 3.143 2.675 5.736 5.817 5.736 3.143 0 5.81-2.593 5.81-5.736S11.142 2.201 8 2.201Z"
        fill={color}
      />
      <Path
        d="M10.771 11.33a.482.482 0 0 1-.342-.141L4.887 5.647a.484.484 0 1 1 .684-.684l5.542 5.542a.484.484 0 0 1-.342.825Z"
        fill={color}
      />
      <Path
        d="M5.229 11.33a.483.483 0 0 1-.342-.825l5.542-5.542a.484.484 0 1 1 .684.684L5.57 11.189a.484.484 0 0 1-.342.141Z"
        fill={color}
      />
    </Svg>
  )
}
