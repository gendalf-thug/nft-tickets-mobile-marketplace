import {NavigatorScreenParams} from '@react-navigation/native'

import {availableConnectMethodLogos} from './components/ui/icons/connect-method-logos'

// NAVIGATION

export type TabParamList = {
  homeMarket: undefined
  homeTickets: undefined
  homeProfile: undefined
}

export type RootStackParamList = {
  home?: NavigatorScreenParams<TabParamList>
  welcome: undefined
  connectWallet: undefined
  settings: undefined
  ticketDetail: {
    ticketId: number
  }
  search: undefined
  collectorAddressScanner: undefined
  qr: TicketInfo
  result: {
    isSuccessfully: boolean
    text: string
    navigateToScreen?: keyof RootStackParamList
  }
  createTickets: undefined
}

// INTERFACES

export interface TicketInfo {
  id: number
  images: string[]
  title: string
  tags: string[]
  date: number
  coordinates: string
  shortPlacementDescription: string
  description?: string

  price: number
  currencySymbol?: string
  amountTotal: number
  amountAvailable: number
  creator: string
  purchasedTicketCount?: number
}

export interface PersonInfo {
  id: string
  name: string
  distance: string
  photoUrl: string
  description: string
}

export interface connectMethodType {
  name: string
  /**
   * @returns Is success or not */
  onConnect: () => Promise<void>
  logoName: availableConnectMethodLogos
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

export type sheetPointsT = [number, number]

export type ArrayElementType<
  ArrayType extends readonly unknown[] | null | undefined,
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never
