import React, {useState} from 'react'

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import {format} from 'date-fns'
import {Controller} from 'react-hook-form'
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'

interface FormDateTimeProps {
  style?: StyleProp<ViewStyle>
  placeholder?: string
  name: string
  isTime: boolean
}

export function FormDateTime({
  style,
  name,
  placeholder,
  isTime,
}: FormDateTimeProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const {styles, colors} = useThematicStyles(rawStyles)

  return (
    <>
      <Controller
        name={name}
        render={({field: {onChange, value}}) => {
          const onPickDate = (
            event: DateTimePickerEvent,
            date: Date | undefined,
          ) => {
            const {type} = event
            if (type === 'set' && date) {
              if (!hasChanges) setHasChanges(true)
              onChange(date)
            } else if (type === 'dismissed') {
              setShowPicker(false)
            }
          }
          const onPickTime = (
            event: DateTimePickerEvent,
            date: Date | undefined,
          ) => {
            const {type} = event
            if (type === 'set' && date) {
              if (!hasChanges) setHasChanges(true)
              onChange(date)
            } else if (type === 'dismissed') {
              setShowPicker(false)
            }
          }
          return (
            <>
              <View style={styles.dateContainer}>
                {!isTime && (
                  <Pressable
                    style={styles.row}
                    onPress={() => setShowPicker(pr => !pr)}>
                    <View style={[styles.inputAlternate, style]}>
                      <Text t9 color={Color.primary}>
                        {hasChanges ? format(value, 'dd.MM.yyyy') : placeholder}
                      </Text>
                    </View>
                    <View style={styles.part2}>
                      <MaterialCommunityIcons
                        name="calendar-check-outline"
                        color={colors.primary}
                        size={30}
                      />
                    </View>
                  </Pressable>
                )}
                {isTime && (
                  <Pressable
                    style={styles.row}
                    onPress={() => setShowPicker(pr => !pr)}>
                    <View style={[styles.inputAlternate, style]}>
                      <Text t9 color={Color.primary}>
                        {hasChanges ? format(value, 'HH:mm') : placeholder}
                      </Text>
                    </View>
                    <View style={styles.part2}>
                      <MaterialCommunityIcons
                        name="clock-outline"
                        color={colors.primary}
                        size={30}
                      />
                    </View>
                  </Pressable>
                )}
              </View>
              {showPicker && !isTime && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  onChange={onPickDate}
                  value={value}
                  minimumDate={new Date()}
                />
              )}
              {showPicker && isTime && (
                <DateTimePicker
                  mode="time"
                  display="spinner"
                  onChange={onPickTime}
                  value={value}
                />
              )}
            </>
          )
        }}
      />
    </>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    paddingVertical: 12.5,
    width: '100%',
    alignItems: 'flex-start',
  },
  dateContainer: {
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 5,
  },
  input2: {
    marginTop: 10,
  },
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
  row: {
    flexDirection: 'row',
  },
})
