import React, {useState} from 'react'

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {Background, CustomHeader, Text} from 'src/components/ui'
import {useThematicStyles} from 'src/hooks'
import {Color} from 'src/themeTypes'
import {DatingData} from 'src/variables'

import {DatingPlaceholder} from './DatingPlaceholder'

const width = Dimensions.get('window').width

const length = DatingData.length - 1

export function HomeDating() {
  const [personId, setPersonId] = useState(0)
  const [isAgree, setIsAgree] = useState(false)
  const {colors, styles} = useThematicStyles(rawStyles)
  const next = () => {
    if (personId < length) setPersonId(personId + 1)
    else setPersonId(0)
  }
  if (!isAgree) return <DatingPlaceholder setAgree={setIsAgree} />
  return (
    <Background style={styles.container}>
      <CustomHeader
        title={'Dating'}
        iconLeft="navigate-outline"
        colorLeft={Color.primary}
        iconRight="chatbubbles-outline"
        colorRight={Color.primary}
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: DatingData[personId].photoUrl}}
        />
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text t1 color={Color.card} shadow>
              {DatingData[personId].name}
            </Text>
            <Text t21 color={Color.card} style={styles.ageText} shadow>
              {DatingData[personId].age}
            </Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="home" style={styles.shadowIcon} />
            <Text t8 color={Color.card} style={styles.iconText} shadow>
              Lives in {DatingData[personId].geo}
            </Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="enviromento" style={styles.shadowIcon} />
            <Text t8 color={Color.card} style={styles.iconText} shadow>
              {DatingData[personId].distance} away
            </Text>
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={next}
              style={[styles.iconBorder, {borderColor: colors.textRed1}]}>
              <FontAwesome name="close" size={40} color={colors.textRed1} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={next}
              style={[styles.iconBorder, {borderColor: colors.textGreen1}]}>
              <FontAwesome name="check" size={40} color={colors.textGreen1} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  )
}

const rawStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'flex-end',
  },
  shadowIcon: {
    fontSize: 20,
    color: Color.card,
    textShadowRadius: 2,
    textShadowColor: Color.black,
  },
  image: {
    width: width - 10,
    height: '98%',
    alignSelf: 'center',
    borderRadius: 15,
    position: 'absolute',
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageText: {
    marginLeft: 11,
  },
  iconText: {
    marginLeft: 4,
  },
  iconBorder: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1.5,
  },
  rowButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 16,
  },
})
