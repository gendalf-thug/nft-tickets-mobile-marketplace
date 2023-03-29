import {TicketInfo} from 'src/types'

export const fakeTicketsData: TicketInfo[] = [
  {
    id: 1,
    images: [
      'https://ipfs.io/ipfs/bafybeidiena6ykzagn3lts2bsunyks3qw3afxmjkvgltvonnqoytargsuy/LCPImageForCard.jpg',
    ],
    title: 'Выступление ЛСП',
    tags: ['Рэп', '16+'],
    date: 1693904400,
    coordinates: '55.739771, 37.610132',
    shortPlacementDescription: 'Moscow, VK Gipsy Night Club',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Viverra vitae congue eu consequat ac felis. Aliquam sem fringilla ut morbi tincidunt augue interdum. Lorem ipsum dolor sit amet.',
    price: 65,
    currencySymbol: 'USDT',
    amountTotal: 1000,
    amountAvailable: 300,
  },
  {
    id: 2,
    images: [
      'https://ipfs.io/ipfs/bafybeicsthkgqnzlpf4ranydvh22jjjyhdxhbrcitybpud3ymymatmsbe4/YanixImageForCard.jpg',
      'https://ipfs.io/ipfs/bafybeihrj6iluiofkkbrqa3q2ww7ffd7w4mai7bftlrngshysgusczf3ua/YanixImageForCard2.jpg',
    ],
    title: 'Yanix concert 18.02',
    tags: ['Рэп'],
    date: 1676725200,
    coordinates: '51.777953, 55.166946',
    shortPlacementDescription: 'Russia, Оренбург\n”СТUDИЯ” клуб',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra justo. Viverra vitae congue eu consequat ac felis. Aliquam sem fringilla ut morbi tincidunt augue interdum. Lorem ipsum dolor sit amet.',
    price: 25,
    currencySymbol: 'USDC',
    amountTotal: 500,
    amountAvailable: 0,
  },
]

export const fakeCategoriesData = [
  'Все',
  'Рок',
  'Фестиваль',
  'Рэп',
  'Джаз',
  'Танцы',
]
