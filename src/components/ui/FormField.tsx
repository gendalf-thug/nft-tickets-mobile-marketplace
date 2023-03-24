import React from 'react'

import {useFormContext} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'

import {
  BlockMessage,
  FormDateTime,
  FormTextInput,
  Text,
} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'

interface FormFieldProps {
  // style?: StyleProp<ViewStyle>;
  title: string
  name: string
  fieldType: 'date' | 'time' | 'price' | 'input'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  placeholder?: string
  nextField?: string
}

/**
 * USE WITH HOOK FORM PROVIDER
 */
export function FormField({
  title,
  fieldType,
  autoCapitalize,
  nextField,
  name,
  placeholder,
}: FormFieldProps) {
  const {styles} = useThematicStyles(rawStyles)
  const {
    formState: {errors},
  } = useFormContext()

  const error = errors[name]

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text t12 style={styles.title}>
          {title}
        </Text>
      </View>
      {(fieldType === 'date' || fieldType === 'time') && (
        <FormDateTime
          placeholder={placeholder}
          name={name}
          isTime={fieldType === 'time'}
        />
      )}
      {(fieldType === 'price' || fieldType === 'input') && (
        <FormTextInput
          placeholder={placeholder}
          nextField={nextField}
          autoCapitalize={autoCapitalize}
          isPrice={fieldType === 'price'}
          name={name}
        />
      )}
      {error && (
        <BlockMessage style={styles.errorBlock} blockType="error">
          {error.message as string}
        </BlockMessage>
      )}
    </View>
  )
}

const rawStyles = StyleSheet.create({
  errorBlock: {
    marginTop: 12,
    marginHorizontal: 6,
  },
  container: {
    paddingVertical: 12.5,
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
})
