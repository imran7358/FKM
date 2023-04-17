import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import { useSelector } from 'react-redux';
const About = ({ navigation }) => {
  const userInfo = useSelector(state => state.user.userInfo);
  useEffect(()=>{
    if(userInfo!='')
    {
      Alert.alert('loggedin',userInfo)
      console.log(userInfo)
    }
      else{
        Alert.alert('Kindly LogIn to Play')
        navigation.navigate('Home')
      }
  },[userInfo]);
        return (
        <WebView
        style={{ flex: 1,resizeMode: 'cover',width: '100%' }}
        source={{
          uri: 'https://m.freekaamaal.com/fkm-fantasy?api=1&&user_id=417423&&fantasyAuth=FPL04052023',
        }}
        
      />
    );
};
export default About;
