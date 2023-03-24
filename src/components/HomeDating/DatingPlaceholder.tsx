import React from 'react'

import {StyleSheet, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {Background, Button, Text} from 'src/components/ui'
import {useTheme} from 'src/hooks'
import {Color} from 'src/themeTypes'

import Logo from '../../../assets/images/logo.svg'

interface DatingPlaceholderProps {
  setAgree: React.Dispatch<React.SetStateAction<boolean>>
}

export function DatingPlaceholder({setAgree}: DatingPlaceholderProps) {
  const {colors} = useTheme()
  return (
    <Background style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Logo width={40} height={40} />
        <Text t20>Welcome to Dating.</Text>
        <Text t11 color={Color.graphicBase2} style={styles.description}>
          Please follow these House Rules.
        </Text>
      </View>
      <View>
        <View style={styles.ruleContainer}>
          <View style={styles.rowLine}>
            <Ionicons
              name={'checkmark-sharp'}
              size={24}
              color={colors.primary}
            />
            <Text t7 style={styles.rowText}>
              Be yourself.
            </Text>
          </View>
          <Text t11 color={Color.graphicBase2}>
            Make sure your photos, age, and bio are true to who you are.
          </Text>
        </View>
        <View style={styles.ruleContainer}>
          <View style={styles.rowLine}>
            <Ionicons
              name={'checkmark-sharp'}
              size={24}
              color={colors.primary}
            />
            <Text t7 style={styles.rowText}>
              Stay safe.
            </Text>
          </View>
          <Text t11 color={Color.graphicBase2}>
            Don’t be too quick to give out personal information. Date Safely
          </Text>
        </View>
        <View style={styles.ruleContainer}>
          <View style={styles.rowLine}>
            <Ionicons
              name={'checkmark-sharp'}
              size={24}
              color={colors.primary}
            />
            <Text t7 style={styles.rowText}>
              Play it cool.
            </Text>
          </View>
          <Text t11 color={Color.graphicBase2}>
            Respect others and treat them as you would like to be treated.
          </Text>
        </View>
        <View style={styles.ruleContainer}>
          <View style={styles.rowLine}>
            <Ionicons
              name={'checkmark-sharp'}
              size={24}
              color={colors.primary}
            />
            <Text t7 style={styles.rowText}>
              Be proactive.
            </Text>
          </View>
          <Text t11 color={Color.graphicBase2}>
            Always report bad behavior.
          </Text>
        </View>
      </View>
      <Button onPress={() => setAgree(true)} style={styles.button}>
        I AGREE
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  button: {
    height: 50,
  },
  description: {
    marginBottom: 40,
  },
  ruleContainer: {
    width: '100%',
    marginBottom: 24,
  },
  rowLine: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  rowText: {
    marginLeft: 14,
  },
})
