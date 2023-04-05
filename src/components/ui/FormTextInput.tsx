import React from 'react'

import {Controller, useFormContext} from 'react-hook-form'
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Text} from '.'

interface FormTextInputProps {
  style?: StyleProp<ViewStyle>
  isPrice: boolean
  placeholder?: string
  name: string
  nextField?: string
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export function FormTextInput({
  isPrice,
  style,
  name,
  nextField,
  autoCapitalize,
  placeholder,
}: FormTextInputProps) {
  const {styles, colors} = useThematicStyles(rawStyles)
  const {control, setFocus} = useFormContext()
  return (
    <View style={styles.row}>
      <Controller
        name={name}
        render={({field: {onChange, onBlur, ref, value}}) => {
          return (
            <TextInput
              ref={ref}
              onBlur={onBlur}
              style={[
                styles.input,
                isPrice && styles.inputAlternate,
                style,
                {color: colors.primary},
              ]}
              autoCapitalize={autoCapitalize}
              placeholder={placeholder}
              blurOnSubmit={true}
              onChangeText={onChange}
              onSubmitEditing={() => nextField && setFocus(nextField)}
              value={value}
              selectionColor={colors.primary}
              keyboardType={isPrice ? 'phone-pad' : 'default'}
              placeholderTextColor={colors.primaryOpacity1}
              returnKeyType={nextField ? 'next' : 'default'}
            />
          )
        }}
        control={control}
      />
      {isPrice && (
        <TouchableOpacity style={styles.part2}>
          <Text h4 color={Color.primary}>
            ETH
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const rawStyles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Color.inputBg,
    fontFamily: 'PTSans-Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  inputAlternate: {
    height: 50,
    width: '80%',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 16,
    backgroundColor: Color.inputBg,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  part2: {
    width: '20%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.inputBg,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
})
