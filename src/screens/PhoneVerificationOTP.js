
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View,Alert, Text, StyleSheet, Image, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  centerContainer,
  fontSize,
  inputBox,
  fontColor,
  commonMargin,
} from '../assets/styles/common';
import OTPin from '../components/OTPin';
import KeybaordAvoidingWrapper from '../components/keyboardAvoidingWrapper';
import { useSelector } from 'react-redux';
const ENDPOINT = "/user/verifyphone";
const BASE_URL = Config.API_URL;
const API_AUTH = Config.API_AUTH;

const EnterOTP = ({navigation}) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
  const [ Error , setError ] = useState(null);
  const [ message , setMessage ] = useState(null); 
  const [mobile,setMobile] = useState(null);
  useEffect(  () =>{
    const get = async()=>{
      const numb = await AsyncStorage.getItem('phone');
      setMobile(numb);
    
      console.log("apiauth agaya ",API_AUTH)
      console.log("token agaya ",userToken)
    }
    get();
  },[])
  const verifyOTP = async(otp) => {
    const token =  await AsyncStorage.getItem("registerToken");
    try {
      const { data } = await axios.post(BASE_URL + ENDPOINT,{
        apiAuth: API_AUTH,
        phoneotp: otp,
      },{
        headers : {
          Authorization:userToken,
        },
      });
      if (data.status == '1') {
        console.log("response agaya ",data)
        setMessage(data.message);
        setTimeout(()=>{
            navigation.navigate('Profile');
        },2000);
      }
      else if(data.status == '0')
      {
        // Alert.alert( 'Wrong OTP! Please Re Check and Enter')
      }
      else {
        console.log("error===>>>",e)
        Alert.alert( 'Wrong OTP! Please Re Check and Enter')
        setMessage( 'Wrong OTP! Please Re Check and Enter' );
      }
    } catch (e){
      console.log("error===>>>",e)
      setError(e);
      
    }
  };
  return (
    <KeybaordAvoidingWrapper>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/login-image.png')} />
      </View>
      <View>
        <Text style={[styles.headingSize]}>Verify OTP</Text>
      </View>
      <View style={styles.forgotParagraph}>
        <Text style={styles.innerPara}>An 6 digit code has been send to</Text>
        <Text style={styles.registeredNumber}>+ 91 {mobile}</Text>
      </View>
      <View>
        <OTPin in={6} onDone={(otp)=>{
          verifyOTP(otp);
        }}></OTPin>
      </View>
      <View style={styles.inputView}>
        {/* <View style={[styles.inputBoxContainer, styles.otpBoxContainer]}>
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
        </View> */}
        <View style={styles.passwordContainer}>
            </View>
		{/* <TouchableOpacity onPress={()=> navigation.navigate('Reset Password')}>
    <View style={styles.loginButton}>
									<Text style={styles.loginTxt}>Submit</Text>
        </View>
    </TouchableOpacity> */}
      </View>
    </View>
    </KeybaordAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  imageContainer: {
    alignItems: centerContainer.alignCenter,
  },
  headingSize: {
    fontSize: fontSize.headingFont,
    fontWeight: '900',
  },
  logo: {
    height: 128,
    width: 128,
  },
  inputBoxContainer: {
    position: 'relative',
    marginTop: 30,
  },
  icon: {
    position: 'absolute',
    top: 36,
    left: 20,
  },
  inputText: {
    padding: 10,
    borderWidth: inputBox.borderWidth,
    marginTop: inputBox.marginTop,
    borderColor: inputBox.borderColor,
    borderRadius: inputBox.borderRadius,
    color: '#333333',
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: '#f0f0f0',
  },

  lableFont: {
    fontSize: fontSize.inputFont,
  },
  forgotPassword: {
    color: fontColor.linkColor,
    fontSize: fontSize.inputFont,
    fontWeight: '700',
    marginTop: commonMargin.marginTop,
    justifyContent: 'flex-end',
  },
  passwordContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loginButton: {
    alignItems: centerContainer.alignCenter,
    justifyContent: centerContainer.justifyCenter,
    backgroundColor: '#F27935',
    padding: 10,
    marginTop: 30,
    borderRadius: 6,
    fontWeight: 'bold',
    height: 50,
  },
  loginTxt: {
    fontSize: fontSize.headingFont,
    fontWeight: '900',
    color: '#fff',
  },

  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  forgotParagraph: {
    fontSize: fontSize.lableFont,
    marginTop: commonMargin.margin10,
  },
  innerPara: {
    lineHeight: 25,
    fontSize: fontSize.lableFont,
  },
  registeredNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 7,
  },
  otpBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyCenter: 'center',
  },
});

export default EnterOTP;
