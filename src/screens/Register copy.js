import Config from "react-native-config";
import React, { useState } from 'react';
import {View,Text,StyleSheet,Image,TextInput,SafeAreaView,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {centerContainer,fontSize,inputBox,fontColor,commonMargin,} from '../assets/styles/common';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Formik } from "formik";
import * as yup from 'yup';
import ErroLabel from "../components/ErrorCom";
import SucessLbl from '../components/SuccessCom';

const ENDPOINT = "/user/register";
const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    phone: '',
    referral_code: '99361389',
  });
  const [err, setErr] = useState(null);
  const handleChange = (value, name) => {
    let obj = Object.assign({}, formData);
    obj[name] = value;
    setFormData(obj);
  };
//   const handleSubmit = async (event) => {
//     try {
//       const {data} = await axios.post(Config.API_URL + ENDPOINT,{
//         apiAuth : Config.API_AUTH,
//         device_type: Config.DEVICE_TYPE,
//         ...formData,
//       });
//       if (data.token) {
//         await AsyncStorage.setItem('registerToken', data.token);
//         await AsyncStorage.setItem('phone', formData.phone);
//         navigation.navigate('Verify');
//       }
//       else {
//         setErr(data.message);
//       }
//     } catch (e) {
//       setErr(e.message)
//     }
//   };
  return (
    <SafeAreaView>
      <ScrollView>
        <Formik initialValues={{
            name:'',
            email: '',
            phone: '',
            password: '',
            referral: '',
        }}
        validationSchema = { yup.object().shape({
            name:yup.string().required("Please enter name"),
            email: yup.string().required('Please enter Usename / Email id'),
            phone: yup.string().required("Please enter mobile number"),
            password:yup.string().required('Please Enter password').min(6,'Minimum 6 Chareter are required').max(8,'Maxmimum 8 Chareter are required')})}
            onSubmit = {async(values)=>{
                console.log(values)
            }}
            >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <View style={styles.container}>
                    <View style={styles.imageContainer}>
                      <Image source={require('../assets/images/login-image.png')} />
                    </View>
                    <View>
                      <Text style={[styles.headingSize]}>Sign Up & Earn</Text>
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
                          placeholder="Name"
                          name="name"
                          placeholderTextColor="#666"
                          value={formData["name"]}
                          onChangeText={(value) => { handleChange(value, "name") }} />
                      </View>
                      <View style={styles.inputBoxContainer}>
                        <Image
                          source={require('../assets/images/email.png')}
                          style={styles.icon}
                        />
                        <TextInput
                          autoCapitalize="none"
                          style={[styles.inputText, styles.lableFont]}
                          name="email"
                          placeholder="Email ID"
                          placeholderTextColor="#666"
                          value={formData['email']}
                          onChangeText={(value) => { handleChange(value, 'email') }} />
                      </View>
                      <View style={styles.inputBoxContainer}>
                        <Image
                          source={require('../assets/images/email.png')}
                          style={styles.icon}
                        />
                        <TextInput
                          autoCapitalize="none"
                          style={[styles.inputText, styles.lableFont]}
                          placeholder="Phone"
                          name="phone"
                          placeholderTextColor="#666"
                          value={formData["phone"]}
                          onChangeText={(value) => { handleChange(value, "phone") }} />
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
                          name="pass"
                          placeholderTextColor="#666"
                          value={formData["pass"]}
                          secureTextEntry={true}
                          onChangeText={(value) => { handleChange(value, "pass") }} />
                      </View>
                      {<Text>{err}</Text>}
                      <TouchableOpacity
                        // onPress={()=>{navigation.navigate("Enter OTP")}}
                        onPress={handleSubmit}>
                        <View style={styles.loginButton} >
                          <Text style={styles.loginTxt}>Sign Up</Text>
                        </View>
                      
                      </TouchableOpacity>
                      <View style={styles.socialLogin}>
                        <View style={styles.googleLogin}>
                          <Image source={require('../assets/images/google.png')} />
                          <Text style={styles.googleLoginTxt}>Goolge</Text>
                        </View>
                        <View style={[styles.googleLogin, styles.facebookLogin]}>
                          <Image source={require('../assets/images/google.png')} />
                          <View style={styles.googleLoginTxt}>
                            <Text style={styles.googleLoginTxt}>Facebook</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.newLogin}>
                        <Text style={styles.font16}>New to FreeKaaMaal ?</Text>
                        <Text style={[styles.font16, styles.RegisterLink]} onPress={() => navigation.navigate('Login')}>Login</Text>
                      </View>
                    </View>
                  </View>
            )}
        </Formik>
        
      </ScrollView>
    </SafeAreaView>
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
    top: 33,
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

export default Register;
