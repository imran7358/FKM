import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  centerContainer,
  fontSize,
  inputBox,
  fontColor,
  commonMargin,
} from '../assets/styles/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../utils/request';
import Config from 'react-native-config';
import { Formik } from 'formik';
import * as yup from 'yup';
const END_URL = '/user/resetpass'
import ErroLabel from '../components/ErrorCom';
import SucessLbl from '../components/SuccessCom';

const ResetPassword = ({navigation}) => {
    const [success, setSucess] = useState('');
    const [error, setError] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/login-image.png')} />
      </View>
      <View>
        <Text style={[styles.headingSize]}>Login</Text>
      </View>
      <Formik initialValues={{
        otp: '',
        password: '',
        confirmpassword: '',
      }}
      onSubmit = {async(value)=>{
        console.log("Values", value)
        const getToken = await AsyncStorage.getItem('fToken');
        console.log("Forgot Token", getToken)
        try{
            const {data} = await request.post(navigation,Config.API_URL + END_URL, {
                apiAuth : Config.API_AUTH,
                device_type: Config.DEVICE_TYPE,
                verifycode: value.otp,
                newpass: value.password
            },{
                
                    headers: {
                        Authorization: getToken,
                    },
            })

            if(data.status === '1' && data.error === '0'){
                setSucess(data.message)
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 3000);
            }
            else {
                setError(data.message)
                setTimeout(() => {
                    setError('')
                }, 3000);
            }

        }catch(error){
            setError(error.message);
            setTimeout(() => {
                setError('')
            }, 3000);
        }
      }}
      validationSchema={yup.object().shape({
        otp: yup
        .string().required('Please enter your OTP'),
        password: yup
            .string().required('Please enter your password'),
            confirmpassword: yup
            .string().min(6, "Minimum 6 digit are required").max(8, "Maximum 8 digit are allowed").required('Please enter confirm password').oneOf([yup.ref('password'), null], 'Passwords must match'),
    })}
      >
         {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
             <View style={styles.inputView}>
             <View style={styles.inputBoxContainer}>
                 <Image
                   source={require('../assets/images/padlock.png')}
                   style={styles.icon}
                 />
                 <TextInput
                   style={[styles.inputText, styles.lableFont]}
                   placeholder="OTP"
                   placeholderTextColor="#666"
                   onChangeText={handleChange('otp')}
                   onBlur={() => setFieldTouched('otp')}
                   />
                   {touched.otp && errors.otp &&
                                    <Text style={styles.error}>{errors.otp}</Text>
                                }
               </View>
               <View style={styles.inputBoxContainer}>
                 <Image
                   source={require('../assets/images/padlock.png')}
                   style={styles.icon}
                 />
                 <TextInput
                   style={[styles.inputText, styles.lableFont]}
                   placeholder="New Password"
                   placeholderTextColor="#333"
                   onChangeText={handleChange('password')}
                   onBlur={() => setFieldTouched('password')}
                   secureTextEntry={true}
                    />
                     {touched.password && errors.password &&
                                    <Text style={styles.error}>{errors.password}</Text>
                                }
               </View>
               <View style={styles.inputBoxContainer}>
                 <Image
                   source={require('../assets/images/padlock.png')}
                   style={styles.icon}
                 />
                 <TextInput
                   style={styles.inputText}
                   placeholder="Confirm New Password"
                   placeholderTextColor="#333"
                   onChangeText={handleChange('confirmpassword')}
                   onBlur={() => setFieldTouched('confirmpassword')}
                   secureTextEntry={true}
                 />
                 {touched.confirmpassword && errors.confirmpassword &&
                                    <Text style={styles.error}>{errors.confirmpassword}</Text>
                                }
               </View>
               {
                success && <SucessLbl message={success}/>
               }
               {
                error && <ErroLabel message = {error} />
               }
                                           <TouchableOpacity onPress={handleSubmit}>
                         <View style={styles.loginButton}>
                                               <Text style={styles.loginTxt}>Submit</Text>
               </View>
                         </TouchableOpacity>
             </View>
         )}
      </Formik>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: '#FF0D10',
    marginTop: 7,
},
errorLabel: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
},
lableFont: {
    fontSize: fontSize.inputFont,
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

export default ResetPassword;
