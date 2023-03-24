import {NavigatorScreenParams} from '@react-navigation/native'
import {SvgProps} from 'react-native-svg'

// NAVIGATION

export type TabParamList = {
  homeStaking: undefined
  homeGovernance: undefined
  homeTicketsMarket: undefined
  homeDating: undefined
}
export type RootStackParamList = {
  home?: NavigatorScreenParams<TabParamList>
  welcome: undefined
  settings: undefined
  ticketDetail: TicketInfo
  profile: undefined
  search: undefined
  scan: undefined
  qr: TicketInfo
  result: {
    isSuccessfully: boolean
    text: string
    navigateToScreenName?: keyof RootStackParamList
  }
  proposal: {
    id: number
  }
  connectWallet: undefined
  createEvent: undefined
}

// INTERFACES

export interface TicketInfo {
  id: string
  name: string
  tags: string[]
  startData: number
  endData: number
  geoPosition: string
  imageUrl: string
  price?: number
  tickets: number
  currencySymbols?: string
  description?: string
}

export interface PersonInfo {
  id: string
  name: string
  age: number
  distance: string
  geo: string
  photoUrl: string
  description: string
}

export interface connectMethodType {
  name: string
  /**
   * @returns Is success or not */
  onConnect: () => Promise<void>
  Logo: (props: SvgProps) => JSX.Element
  isAvailable: boolean
}

// UTILS

export type InputNameType =
  | 'eventName'
  | 'location'
  | 'country'
  | 'price'
  | 'cover'
  | 'categories'
  | 'date'

export type EventError =
  | 'eventName'
  | 'location'
  | 'country'
  | 'date'
  | 'price'
  | 'none'

export type VoteNamesType = 'yes' | 'no' | 'abstain' | 'veto'

export type VotesType = {
  yes: number
  no: number
  abstain: number
  veto: number
}

export type ProposalsCroppedList = {
  id: number
  status: ProposalsTagKeys
  title: string
}[]

export type sheetPointsT = [number, number]

export type ProposalsTagKeys =
  | 'all'
  | 'voting'
  | 'deposited'
  | 'passed'
  | 'rejected'

export type ArrayElementType<
  ArrayType extends readonly unknown[] | null | undefined,
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never
