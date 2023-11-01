/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect, useState } from 'react';
import { Typography } from './src/assets/styles';

import {
    Alert,StyleSheet,Linking,
    useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppNav from './src/navigation/AppNav';
import { Provider } from 'react-redux';
import { store, persistedStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
// import messaging from '@react-native-firebase/messaging'
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = ({navigation}) => {
  //  const getUniqueid = async()=>{
  //       const app_device_id = await DeviceInfo.getUniqueId();
  //       console.log('appdeviceId',app_device_id)
  //    }
  //   const getDeviceToken = async () => {
  //       let token = await messaging().getToken();
  //       console.log('deviceToken',token);
  //   }
    useEffect(() => {
      Linking.addEventListener('url', handleDeepLink);
      return () => {
        // Linking.removeEventListener('url', handleDeepLink);
      };
    }, []);
  // Main Handling For Deep Linking ://
    const handleDeepLink = ({ url }) => {
      if (url.startsWith('https://freekaamaal.com/') || url.startsWith('http://freekaamaal.com/') ||
          url.startsWith('https://m.freekaamaal.com/') || url.startsWith('http://m.freekaamaal.com/')) {
        // Split the URL into two parts
        const parts = url.split('/');
        const domain = parts[2];
        const slug = parts[3];
        

        console.log('slug:', slug);
        console.log('domain:', domain);
        navigation.navigate('Login');
      }
      else if(url.startsWith('http://fkm.asia/xyz') || url.startsWith('https://fkm.asia/xyz'))
              {
              // Split the URL into two parts
              const parts = url.split('/');
              const domain = parts[2];
              const slug = parts[3];
              

              console.log('slug:', slug);
              console.log('domain:', domain);
              }
      Alert.alert('Deep Link', url);
    };
  
    useEffect(() => {
      // Check if the app was opened through a deep link when it was not already running
      Linking.getInitialURL()
        .then((url) => {
          if (url) {
            handleDeepLink({ url });
          }
        })
        .catch((error) => console.error('Error getting initial URL:', error));
    }, []);
    useEffect(() => {
      // getDeviceToken();
      //   getUniqueid();
      //   const unsubscribe = messaging().onMessage(async remoteMessage => {
      //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //   });
    
      //   return unsubscribe;
      }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
            <AppNav />
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        fontFamily: Typography,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
