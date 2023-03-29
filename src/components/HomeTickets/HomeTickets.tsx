import React from 'react'

import {Background, CustomHeader, Spacer} from 'src/components/ui'

export interface HomeTicketsProps {}

export function HomeTickets({}: HomeTicketsProps) {
  return (
    <Background>
      <CustomHeader
        title="Governance"
        disabledLeft
        iconRight="shield-outline"
      />
      <Spacer height={12} />
    </Background>
  )
}

// const styles = StyleSheet.create({})
