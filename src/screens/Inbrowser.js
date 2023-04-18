import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import { useSelector } from 'react-redux';
const Inbrowser = ({ navigation,route}) => {
    const LandingUrl  = route.params.LandingUrl; 
  const userInfo = useSelector(state => state.user.userInfo);
  useEffect(()=>{
    console.log('LandingUrl',LandingUrl)
    if(userInfo!='')
    {
    }
    else
      {
        navigation.navigate('Login')
      }
  },[userInfo]);
        return (
        <WebView
        style={{ flex: 1,resizeMode: 'cover',width: '100%' }}
        source={{
          uri: LandingUrl,
        }}
        
      />
    );
};
export default Inbrowser;
