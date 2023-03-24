import {PersonInfo, TicketInfo} from 'src/types'

export const DatingData: PersonInfo[] = [
  {
    id: '0',
    name: 'Dmitry',
    age: 42,
    geo: 'Phangan',
    distance: '3074 meters',
    photoUrl:
      'https://i.pinimg.com/564x/f5/88/49/f588498882ac739fd2d7003b935c3cbe.jpg',
    description: '',
  },
  {
    id: '1',
    name: 'Diego',
    age: 26,
    geo: 'Nai Wok',
    distance: '200 meters',
    photoUrl:
      'https://wedgo.ru/data/photo/Photosession/4077/d3e7f2a047fed64f4a8dae1384f3c21b.jpg',
    description: '',
  },
  {
    id: '2',
    name: 'Michelle',
    age: 27,
    geo: 'Nai Wok',
    distance: '176,4 meters',
    photoUrl:
      'https://phanganist.com/sites/default/files/pictures/14-Jane-Vurt-Phanganist-Koh%20Phangan-Party-Girl-2014.jpg',
    description: '',
  },
  {
    id: '3',
    name: 'Alex',
    age: 30,
    geo: 'Wok Tum',
    distance: '1054 meters',
    photoUrl: 'https://schlock.ru/wp-content/uploads/2019/03/7gbE3_-6UMQ.jpg',
    description: '',
  },
  {
    id: '4',
    name: 'Ulia',
    age: 27,
    geo: 'Nai Suan',
    distance: '4324 meters',
    photoUrl:
      'https://thumbs.dreamstime.com/b/girl-dj-beach-club-playing-mixing-music-island-koh-phangan-thailand-december-vinyl-turntable-full-moon-party-71947413.jpg',
    description: '',
  },
  {
    id: '5',
    name: 'Max',
    age: 23,
    geo: 'Ban Wok',
    distance: '6173 meters',
    photoUrl:
      'https://i.pinimg.com/736x/46/02/a6/4602a63afd7b469ad2897645fd274d95--male-witch-male-elf.jpg',
    description: '',
  },
  {
    id: '6',
    name: 'Timotei',
    age: 30,
    geo: 'Ban Tai',
    distance: '4996 meters',
    photoUrl:
      'https://avatars.dzeninfra.ru/get-zen_doc/198359/pub_5af30052799d9ddc1ed569ed_5af3015ba815f14484527e0e/scale_1200',
    description: '',
  },
]

export const categoriesData = [
  {
    id: '0',
    title: 'All',
  },
  {
    id: '1',
    title: 'Music',
  },
  {
    id: '2',
    title: 'Festival',
  },
  {
    id: '3',
    title: 'Bootcamp',
  },
  {
    id: '4',
    title: 'Fair',
  },
  {
    id: '5',
    title: 'Geek',
  },
]

export const ticketsData: TicketInfo[] = [
  {
    id: '0',
    imageUrl:
      'https://i.pinimg.com/564x/ad/17/c9/ad17c9419100fdb5d1e4a1777806bc8c.jpg',
    name: "999 Kingdom Phangan party for Women's Day",
    tags: [
      '8March',
      'kohPhangan',
      '999NFT',
      'blueramakohphangan',
      'openSea',
      'phanganparty',
    ],
    startData: 1678291680000,
    endData: 1678302680000,
    geoPosition: 'Phangan island',
    price: 2500,
    tickets: 2,
    currencySymbols: 'ZLT',
    description: `999 Kingdom, ruled by 999 NFT owners who depict unique marriage palaces. The first 9 palaces will be minted on March 8 in honor of International Women’s Day and will be available on the OpenSea marketplace. Join this unique project that combines art and new technologies and immerse yourself in the world of fairy tales.

Women's Day:
An exclusive event dedicated to the International Women's Day with a female composition of DJs and musicians from different countries, bringing together the most beautiful people of the island.
    
Metaverse Presentation:
A unique opportunity to learn about the latest technologies and innovations in digital art, including the DAO 999 NFT metaverse.
https://dao999nft.com
    
Party:
The event will take place in the prestigious Blurama club with exceptional sound quality, with the added bonus of a live broadcast of the celebration of the opening of the Far Far Away Kingdom to the whole world.
    
Dress code:
The dress code for the event is white and pastel pink.
    
➵ Line Up:
    
15:00 - @katrinalil.dj 
16:00 - @kayaa_ko 
17:00 - @playra 
18:00 - @lorensiya 
19:30 - @dj_makosha 
21:00 - @karin.stepaniuk 
22:30 - @eva_toya 
    
NFT Collection @999kigdomnft
Promo @mns.audio @cmmnt77 @ghashtag @ghashtagapp 

↡ ↡ ↡ ↡ ↡ ↡
➵ Tickets:
Women all day free with repost in Instagram
Men are free until 15:00
Early birds - 600 THB total of 30 tickets
With poster repost 500 THB
On the door - 1000 THB
Table reservation +66 92 424 6439`,
  },
  {
    id: '1',
    name: '⛩ Road to Dub ⛩',
    tags: [],
    startData: 1678460400000,
    endData: 1678467600000,
    geoPosition: 'Amara Beach Resort',
    price: 1,
    tickets: 3,
    currencySymbols: 'ZLT',
    imageUrl:
      'https://phangan.events/wp-content/uploads/2023/03/23103_image_329904631_1572174116639876_1600696936419286492_n.jpg',
  },
  {
    id: '2',
    name: '💃🏼 LATIN SOCIAL PARTY 🕺🏼',
    tags: [],
    price: 1,
    currencySymbols: 'ZLT',
    startData: 1684346400000,
    tickets: 1,
    endData: 1679090400000,
    geoPosition: 'La Casa',
    imageUrl:
      'https://phangan.events/wp-content/uploads/2023/02/22598_image_328487197_665509908702688_2843232002226012842_n.jpg',
  },
  {
    id: '3',
    name: 'SATURDAY WALKING STREET',
    tags: [],
    price: 1,
    currencySymbols: 'ZLT',
    startData: 1678487400000,
    endData: 1678512600000,
    tickets: 0,
    geoPosition: 'Walking street',
    imageUrl:
      'https://phangan.events/wp-content/uploads/2023/03/IMG_898D716705B8-1.jpeg',
  },
  {
    id: '4',
    name: 'SOLAR CONEXION @ RETRO MOUNTAIN',
    tags: [],
    price: 1,
    currencySymbols: 'ZLT',
    startData: 1692640800000,
    endData: 1692651600000,
    tickets: 0,
    geoPosition: 'Retro Mountain Koh Phangan',
    imageUrl:
      'https://phangan.events/wp-content/uploads/2023/03/22931_image_334090622_146304188306297_2382397955518306255_n.jpg',
  },
  {
    id: '5',
    name: 'DMT BREATHWORK',
    tags: [],
    price: 2300,
    currencySymbols: 'ZLT',
    startData: 1690927200000,
    endData: 1690970400000,
    tickets: 5,
    geoPosition: 'Orion Healing Center ( Detox & Yoga ) Koh Phangan',
    imageUrl:
      'https://phangan.events/wp-content/uploads/2023/03/23095_image_335147529_502233855246058_2469248052993055604_n.jpg',
  },
  {
    id: '6',
    name: 'RISE ECSTATIC DANCE @ PYRAMID WITH JONNY T FUSION',
    tags: [],
    price: 1,
    currencySymbols: 'ZLT',
    startData: 1700593200000,
    endData: 1700604000000,
    tickets: 0,
    geoPosition: 'Pyramid Yoga Center',
    imageUrl:
      'https://phangan.events/wp-content/uploads/2023/03/22998_image_329287712_914959506293579_6832003462502429261_n.jpg',
  },
].reverse()
export const votingCardsData = [
  {
    status: 'passed',
    orderNumber: '465',
    title: 'Increase Signed Blocks Window',
    description:
      'Just testing, no need to vote by validators. You can do it, if you want :)',
    createdAt: 1674335097000,
    depositEnd: 1674498852000,
    dateStart: 1674381600000,
    dateEnd: 1674410400000,
  },
  {
    status: 'rejected',
    orderNumber: '342',
    title: 'Stacking Param Change',
    description:
      'Just testing, no need to vote by validators. You can do it, if you want :)',
    createdAt: 1676735052000,
    depositEnd: 1676754781000,
    dateStart: 1676743200000,
    dateEnd: 1676746800000,
  },
  {
    status: 'rejected',
    orderNumber: '526',
    title: 'Minimum commisison rate 5%',
    description:
      'Just testing, no need to vote by validators. You can do it, if you want :)',
    createdAt: 1676822400000,
    depositEnd: 1676841181000,
    dateEnd: 1676833200000,
    dateStart: 1676822400000,
  },
  {
    status: 'passed',
    orderNumber: '153',
    title: 'La sosison de bulochka',
    description:
      'Just testing, no need to vote by validators. You can do it, if you want :)',
    createdAt: 1678270381000,
    depositEnd: 1678317481000,
    dateStart: 1678280400000,
    dateEnd: 1678309201000,
  },
  {
    status: 'passed',
    orderNumber: '746',
    title: 'One more chance',
    description:
      'Just testing, no need to vote by validators. You can do it, if you want :)',
    createdAt: 1670004421000,
    depositEnd: 1670017021000,
    dateStart: 1670011201000,
    dateEnd: 1670014801000,
  },
  {
    status: 'passed',
    orderNumber: '111',
    title: 'Buying lot in AccessPassWorld',
    description:
      'Just testing, no need to vote by validators. You can do it, if you want :)',
    createdAt: 1659972841000,
    depositEnd: 1660008961000,
    dateStart: 1659974401000,
    dateEnd: 1659992401000,
  },
]
