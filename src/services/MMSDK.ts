import MetaMaskSDK from '@metamask/sdk'
import {Linking} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'

export const MMSDK = new MetaMaskSDK({
  openDeeplink: link => {
    Linking.openURL(link) // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'NFT Tickets Marlketplace', // The name of your application
    url: 'https://gendalf-portfolio-site.vercel.app/', // The url of your website
  },
})
