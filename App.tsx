import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'

import { CartContextProvider } from './src/contexts/CartContext'

OneSignal.initialize('8ef39774-5759-4872-bc67-2bd28b58ab4b')
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  useEffect(() => {
    const handleNotificationClick = (e: NotificationClickEvent) => {
      console.log('[NOTIFICATION]', e)
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick,
      )
    }
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
