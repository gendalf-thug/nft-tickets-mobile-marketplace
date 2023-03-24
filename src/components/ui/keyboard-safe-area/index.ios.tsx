import React from 'react'

import {useHeaderHeight} from '@react-navigation/elements'
import {KeyboardAvoidingView, StyleSheet} from 'react-native'

import {KeyboardSafeAreaProps} from '.'

export function KeyboardSafeArea({
  children,
  style,
  ...props
}: KeyboardSafeAreaProps) {
  const header = useHeaderHeight()

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={header}
      style={[styles.flexOne, style]}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
})
