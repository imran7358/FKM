import axios from 'axios';
import Config from 'react-native-config';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import ErroLabel from '../components/ErrorCom';
import KeybaordAvoidingWrapper from '../components/keyboardAvoidingWrapper';


import {
    centerContainer,
    fontSize,
    inputBox,
    fontColor,
    commonMargin,
} from '../assets/styles/common';
import request from '../utils/request';
import { useDispatch } from 'react-redux';
import { SIGNEDIN } from '../redux/actionTypes';
const ENDPOINT = '/user/login';


const Login = ({ navigation }) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    return (
        <KeybaordAvoidingWrapper>
            <Formik initialValues={{
                email: '',
                password: '',
            }}
                onSubmit={async (values) => {
                    try {
                        const { data } = await request.post(navigation, Config.API_URL + ENDPOINT, {
                            apiAuth: Config.API_AUTH,
                            device_type: Config.device_type,
                            app_device_id: '',
                            password: values.password,
                            email: values.email,
                        });
                        if (data.status == '1' && data.error == '0') {
                            dispatch({
                                type: SIGNEDIN,
                                userToken: data.token,
                                userInfo: data.data,
                            });
                            navigation.navigate("Home")
                        }
                        else {
                            setError(data.message);
                        }

                    } catch (e) {
                        setError(e.message);
                    }
                }}
                validationSchema={yup.object().shape({
                    email: yup
                        .string().required('Please enter email/username/phone'),
                    password: yup
                        .string().required('Please enter your password'),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
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
                                    style={styles.inputText}
                                    value={values.email}
                                    placeholderTextColor="#666"
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    placeholder="Email/Phone"
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.error}>{errors.email}</Text>
                                }
                            </View>

                            <View style={styles.inputBoxContainer}>
                                <Image
                                    source={require('../assets/images/padlock.png')}
                                    style={styles.icon}
                                />
                                <TextInput
                                    autoCapitalize="none"
                                    style={styles.inputText}
                                    value={values.password}
                                    placeholderTextColor="#666"
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                />
                                {touched.password && errors.password &&
                                    <Text style={styles.error}>{errors.password}</Text>
                                }
                            </View>

                            <View style={styles.passwordContainer}>
                                <Text onPress={() => navigation.navigate('ForgotPaasword')}
                                    style={styles.forgotPassword}> Forgot Password ?</Text></View>
                                    {
                                        error && <ErroLabel message={error}/>
                                    }
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.loginButton}>
                                    <Text style={styles.loginTxt}>Login</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.newLogin}>
                                <Text style={styles.font16}>New to FreeKaaMaal ?</Text>
                                <Text style={[styles.font16, styles.RegisterLink]} onPress={() => navigation.navigate('Register')}>Register</Text>
                            </View>
                        </View>
                    </View>

                )}

            </Formik>
        </KeybaordAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: centerContainer.alignCenter,
    },
    headingSize: {
        fontSize: fontSize.headingFont,
        fontWeight: '800',
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
        fontSize: 14,
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
        backgroundColor: '#e5f1ff',
    },
});

export default Login;
