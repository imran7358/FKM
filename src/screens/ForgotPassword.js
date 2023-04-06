import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, } from 'react-native';
import { centerContainer, fontSize, inputBox, fontColor, commonMargin, } from '../assets/styles/common';
import Config from 'react-native-config';
import request from '../utils/request';
import { Formik } from 'formik';
import * as yup from 'yup'
import ErroLabel from '../components/ErrorCom';
import SucessLbl from '../components/SuccessCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeybaordAvoidingWrapper from '../components/keyboardAvoidingWrapper';
import { ScrollView } from 'react-native-gesture-handler';

const END_URL = '/user/forgetpass';

const ForgotPassword = ({ navigation }) => {
    const [success, setSucess] = useState('');
    const [error, setError] = useState('');
    return (
        <ScrollView contentContainerStyle={{flex:1}}>
        <KeybaordAvoidingWrapper>
            <Formik initialValues={{
                username: ''
            }}
                validationSchema={yup.object().shape({
                    username: yup
                        .string().required('Please enter email/user id'),
                })}
                onSubmit =  {async (value)=> { 
                    try {
                        const {data} = await request.post(navigation,Config.API_URL + END_URL, {
                            apiAuth : Config.API_AUTH,
                            device_type: Config.DEVICE_TYPE,
                            useremail: value.username,
                        })
                        if(data.status === '1' && data.error === '0'){
                            await AsyncStorage.setItem("fToken", data.token)
                            setSucess(data.message)
                            setError('')
                            setTimeout(() => {
                                navigation.navigate("ResetPassword")
                            }, 3000);
                        }
                        else {
                            setError(data.message);
                            setSucess('')
                            setTimeout(() => {
                            setError(data.message);
                            }, 3000);
                        }
                    }catch(err){
                        setError(err.message);
                    }

                }}>
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/images/login-image.png')} />
                    </View>
                    <View>
                        <Text style={[styles.headingSize]}>Forgot Password</Text>
                    </View>
                    <View style={styles.forgotParagraph}>
                        <Text style={styles.innerPara}>
                            Don’t worry ! It happens. Please enter the
                            address Associated with your account.
                        </Text>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputBoxContainer}>
                            <Image
                                source={require('../assets/images/email.png')}
                                style={styles.icon}
                            />
                            <TextInput
                                style={[styles.inputText, styles.lableFont]}
                                placeholder="Email ID / Mobile Number"
                                value={values.username}
                                placeholderTextColor="#666"
                                onChangeText={handleChange('username')}
                                onBlur={() => setFieldTouched('username')}
                            />
                        </View>
                        {touched.username && errors.username &&
                                    <Text style={styles.error}>{errors.username}</Text>
                                }

                        <View style={styles.passwordContainer}>
                        </View>
                        {
                            error && <ErroLabel message = {error}/>
                        }
                        {
                            success && <SucessLbl message={success} />
                        }
                        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                            <Text style={styles.loginTxt}
                            >Submit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                 )}
            </Formik>
        </KeybaordAvoidingWrapper>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        flex:1,
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
});

export default ForgotPassword;
