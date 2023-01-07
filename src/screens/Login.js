import axios from 'axios';
import Config from 'react-native-config';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {
  centerContainer,
  fontSize,
  inputBox,
  fontColor,
  commonMargin,
} from '../assets/styles/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ENDPOINT = '/user/login';


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);
  const handleLogin = async()=>{
    try {
      console.log(Config.API_URL + ENDPOINT,{
        apiAuth:Config.API_AUTH,
        device_type:Config.DEVICE_TYPE,
        app_device_id:'',
        password:password,
        email:email,
      });
    const { data } = await axios.post(Config.API_URL + ENDPOINT,{
      apiAuth:Config.API_AUTH,
      device_type:Config.device_type,
      app_device_id:'',
      password:password,
      email:email,
    });

    if(data.status == '1' && data.error == '0'){
      await AsyncStorage.setItem('userToken',data.token);
      navigation.navigate('Home');
    }
    else{
      setError(data.message);
    }
  } catch (e) {
    console.log(e);
  }
  };

  useEffect(()=>{
    // storeUser();
  })
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/login-image.png')} />
      </View>
      <View>
        <Text style={[styles.headingSize]}>Login</Text>
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputBoxContainer}>
          <Image
            source={require('../assets/images/email.png')}
            style={styles.icon}
          />
          <TextInput
            autoCapitalize="none"
            style={[styles.inputText, styles.lableFont]}
            placeholder="Email ID"
            placeholderTextColor="#003f5c"
            onChangeText={(em) => setEmail(em)} />
        </View>
        <View style={styles.inputBoxContainer}>
          <Image
            source={require('../assets/images/padlock.png')}
            style={styles.icon}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}

            onChangeText={(passw) => setPassword(passw)}
          />
        </View>
        <View style={styles.passwordContainer}>
									<Text onPress={()=> navigation.navigate('Forgot Paasword')} 
									style={styles.forgotPassword}> Forgot Password ?</Text></View>
									<TouchableOpacity onPress={handleLogin}>
                  <View style={styles.loginButton}>
										<Text style={styles.loginTxt}>Login</Text>
                  </View>
                  </TouchableOpacity>
									<View style={styles.orContainer}>
										<View style={styles.borderLeft}><Text></Text></View>
										<Text>OR</Text>
										<View style={styles.borderLeft}><Text></Text></View>
									</View>

									<View style={styles.socialLogin}>
											<View style={styles.googleLogin}>
							 <Image
            source={require('../assets/images/google.png')}
          />
											<Text style={styles.googleLoginTxt}>Goolge</Text>
											</View>
										<View style={[styles.googleLogin, styles.facebookLogin]}>
							 <Image
            source={require('../assets/images/google.png')}
          />
										<View style={styles.googleLoginTxt}>
											<Text style={styles.googleLoginTxt}>Facebook</Text>
											</View>
										</View>
										
									</View>
									<View style={styles.newLogin}>
										<Text style={styles.font16}>New to FreeKaaMaal ?</Text>
										<Text style={[styles.font16, styles.RegisterLink]} onPress = {()=>navigation.navigate('Register')}>Register</Text>
										</View>
      </View>
      <Text>{error}</Text>
    </View>
    </ScrollView>
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
  },
  icon: {
    position: 'absolute',
    top: 36,
    left: 20,
  },
  inputText: {
    height: inputBox.height,
    padding: inputBox.padding,
    borderWidth: inputBox.borderWidth,
    marginTop: inputBox.marginTop,
    borderColor: inputBox.borderColor,
    borderRadius: inputBox.borderRadius,
    paddingLeft: inputBox.paddingLeft,
    color: '#333333',
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

  orContainer: {
    marginTop: commonMargin.marginTop,
    alignItems: 'center',
    justifyContent: centerContainer.spcBetween,
    itemCenter: 'center',
    position: 'relative',
    flexDirection: 'row',
  },

  borderLeft: {
    borderColor: '#AAAAAA',
    borderTopWidth: 1,
    width: '40%',
    marginTop: 15,
  },

  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },

  googleLogin: {
    backgroundColor: '#FFF3F0',
    padding: 10,
    width: '47%',
    borderRadius: 6,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 15,
    height: 50,
  },

  width50: {
    width: '40%',
  },

  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  googleLoginTxt: {
    fontSize: 16,
    marginLeft: 20,
  },
  newLogin: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  RegisterLink: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#2453C6',
  },
		facebookLogin: {
			backgroundColor: '#e5f1ff'
		}
});

export default Login;
