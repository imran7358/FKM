
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErroLabel from '.././components/ErrorCom';
import SucessLbl from '.././components/SuccessCom';
import {
  centerContainer,
  fontSize,
  inputBox,
  fontColor,
  commonMargin,
} from '../assets/styles/common';
import OTPin from '../components/OTPeight';
import KeybaordAvoidingWrapper from '../components/keyboardAvoidingWrapper';
const ENDPOINT = "/cashback/verifycashbackaccount";
const BASE_URL = Config.API_URL;
const API_AUTH = Config.API_AUTH;
import { useSelector } from 'react-redux';
const EnterOTP = ({navigation}) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
  
  const [message , setMessage ] = useState(null); 
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
 
  const [email,setEmail] = useState(null);
  useEffect(  () =>{
    const get = async()=>{
      const mail = await AsyncStorage.getItem('email');
      setEmail(mail);
    }
    get();
  },[])
  const verifyOTP = async(otp) => {
    try {
      const { data } = await axios.post(BASE_URL + ENDPOINT,{
        apiAuth: API_AUTH,
        verificatoncode: otp,
      },{
        headers : {
          Authorization:userToken,
        },
      });
      if (data.status == 1 && data.error==0) {
        console.log(data)
        setSuccess(true)
        setError(false)
        setMessage(data.message);
        setTimeout(()=>{
            navigation.navigate('Profile');
        },2000);
      }
      else if(data.status == 0 && data.error==1)
      {
        setError(true)
        setSuccess(false)
        setMessage(data.message);
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
        <Text style={styles.registeredNumber}> {email}</Text>
      </View>
      <View>
        <OTPin in={8} onDone={(otp)=>{
          verifyOTP(otp);
        }}></OTPin>
      </View>
      <View style={styles.inputView}>
        <View style={styles.passwordContainer}>
            </View>
      </View>
      {
     success  ? <SucessLbl message={message} /> : null
    }
    {
    error ? <ErroLabel message = {message} /> : null
    }
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
