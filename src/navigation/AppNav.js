import React,{useEffect } from 'react';
//import AuthStack from '../navigation/AuthStack';
import { Linking,Alert } from 'react-native';
import Humburger from './humburger';
import {NavigationContainer} from '@react-navigation/native';
// import {linking} from '.././linking'
const AppNav = ({navigation}) => {
  const linking = {
    prefixes: ['https://m.freekaamaal.com/', 'm.freekaamaal://'],
    };
    useEffect(() => {
      // Get the deep link used to open the app
      const getUrl = async () => {
        const initialUrl = await Linking.getInitialURL();
  
        if (initialUrl === null) {
          return;
        }
  
        if (initialUrl.includes('Store')) {
          // Alert.alert(initialUrl);
          navigation.navigate('Store');
        }
      };
  
      getUrl();
    });
  
  return (

      // <AuthStack navigation= {navigation} />
      <NavigationContainer navigation={navigation} linking={linking}>
        <Humburger />
      </NavigationContainer>
  );
};

export default AppNav;

