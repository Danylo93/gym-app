/* eslint-disable react/react-in-jsx-scope */
import {Text, StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
// import {
//   useFonts,
//   Roboto_400Regular,
//   Roboto_700Bold,
// } from '@expo-google-fonts/roboto';
import React from 'react';
import {Loading} from '@components/Loading';
import {THEME} from './src/theme';
import {SignUp} from '@screens/SignUp';
import { Routes } from '@routes/index';
export default function App() {
  // const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Routes />
    </NativeBaseProvider>
  );
}
