import React from 'react'

import {Result} from 'src/components/Result'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'

export function ResultScreen() {
  const {navigate} = useTypedNavigation()
  const {isSuccessfully, text, navigateToScreenName} =
    useTypedRoute<'result'>().params ?? {}

  const onContinue = () => {
    // @ts-ignore
    navigate(navigateToScreenName ?? 'home')
  }

  return (
    <Result
      onContinue={onContinue}
      text={text}
      isSuccessfully={isSuccessfully}
    />
  )
}
