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
              placeholderTextColor={colors.primary2}
              returnKeyType={nextField ? 'next' : 'default'}
            />
          )
        }}
        control={control}
      />
      {isPrice && (
        <TouchableOpacity style={styles.part2} activeOpacity={0.75}>
          <Text t3 color={Color.primary}>
            ZLT
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
    borderRadius: 25,
    paddingLeft: 25,
    backgroundColor: Color.bg2,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  inputAlternate: {
    height: 50,
    width: '80%',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 25,
    backgroundColor: Color.bg2,
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
    borderRightRadius: 25,
    backgroundColor: Color.bg2,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
})
