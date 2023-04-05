import React, {useEffect} from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useTypedNavigation} from 'src/hooks'
import {Color} from 'src/themeTypes'

import {Background, Button, CustomHeader, FormField, Spacer, Text} from '../ui'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'

interface CreateTicketsProps {
  onBack: () => void
  handleSubmit: () => void
}

export function CreateTickets({onBack, handleSubmit}: CreateTicketsProps) {
  const {bottom} = useSafeAreaInsets()

  const {setOptions} = useTypedNavigation()

  useEffect(() => {
    setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitle: 'Create Tickets',
    })
  }, [])

  return (
    <Background style={styles.background}>
      <KeyboardSafeArea>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            {paddingBottom: bottom + 10},
          ]}>
          <Spacer height={18} />
          <Text h2>Create new event</Text>
          <Spacer height={10} />
          <Text p1>
            You need to specify the data for the event for which you want to
            generate tickets.
          </Text>
          <Spacer height={24} />
          <FormField
            fieldType="input"
            nextField="location"
            title="Event name *"
            placeholder="Event name"
            name="eventName"
          />
          <FormField
            fieldType="input"
            title="Location"
            nextField="country"
            placeholder="Location"
            name="location"
          />
          <FormField
            fieldType="input"
            title="Country"
            nextField="price"
            placeholder="Country"
            name="country"
          />
          <FormField
            fieldType="date"
            title="Date"
            placeholder="__.__.____"
            name="date"
          />
          <FormField
            fieldType="time"
            title="Time"
            placeholder="same as now"
            name="time"
          />
          <FormField
            fieldType="price"
            title="Price"
            placeholder="0 ETH"
            name="price"
          />

          <Button style={styles.button} onPress={handleSubmit}>
            Create
          </Button>
        </ScrollView>
      </KeyboardSafeArea>
    </Background>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  button: {
    width: '80%',
    marginTop: 16,
    alignSelf: 'center',
  },
  container: {
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
  },
})
