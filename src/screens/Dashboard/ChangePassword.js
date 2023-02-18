import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView} from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {centerContainer,fontSize,inputBox,fontColor,commonMargin} from '../../assets/styles/common';
import { Formik } from 'formik';
import * as yup from 'yup';
const END_URL = "/user/updatepass"
import request from '../../utils/request';
import Config from 'react-native-config';
import axios from 'axios';
import { useSelector } from 'react-redux';


const ChangePassword = ({navigation}) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const [success, setSucess] = useState(false)
    return (
    
        <ScrollView>
        <Formik initialValues={{
            password: '',
            confirmpassword: '',
        }}
            onSubmit={async (values) => {
                console.log(values.password)
                try {
                    const { data } = await request.post(navigation, Config.API_URL + END_URL, {
                        apiAuth: Config.API_AUTH,
                        device_type: Config.device_type,
                        newpass: values.password,
                    },{
                        headers:{
                            Authorization: userToken,
                        },
                    })
                    setSucess(true)
                } catch (error) {
                    console.log(error);
                }
            }}
            validationSchema={yup.object().shape({
                password: yup
                    .string().required('Please enter your password'),
                    confirmpassword: yup
                    .string().min(6, "Minimum 6 digit are required").max(8, "Maximum 8 digit are allowed").required('Please enter confirm password').oneOf([yup.ref('password'), null], 'Passwords must match'),
            })}
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <View style={styles.inputBoxContainer}>
                            <Image
                                source={require('../../assets/images/padlock.png')}
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

                        <View style={styles.inputBoxContainer}>
                            <Image
                                source={require('../../assets/images/padlock.png')}
                                style={styles.icon}
                            />
                            <TextInput
                                autoCapitalize="none"
                                style={styles.inputText}
                                value={values.confirmpassword}
                                placeholderTextColor="#666"
                                onChangeText={handleChange('confirmpassword')}
                                onBlur={() => setFieldTouched('confirmpassword')}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                            />
                            {touched.confirmpassword && errors.confirmpassword &&
                                <Text style={styles.error}>{errors.confirmpassword}</Text>
                            }
                        </View>

                        {
                success ? <View style={styles.copyCode}>
                    <Text style={styles.copiedTxt}>Successfully Copied !!</Text></View> : null
            }

                        <TouchableOpacity onPress={handleSubmit}>
                            <View style={styles.loginButton}>
                                <Text style={styles.loginTxt}>Submit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            )}

        </Formik>
    </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    inputBoxContainer: {
        position: 'relative',
      },
      changeLink: {
        color: '#397EF5',
        fontSize: 14,
        fontWeight: '700',
        marginTop:20,
      },
    cashBackInfo: {
        marginTop: 20,
    },
    copyCode: {
        position: 'relative',
        marginTop: 10,
    },
    copiedTxt: {
        fontSize: 12,
        color: '#1AA253',
    },
    pInfo: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f27935',
        borderRadius: 6,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 45,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f7f7f7',
    },
    profileInfoName: {
        marginLeft: 10,
    },
    pName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 5,
    },
    profileTax: {
        fontSize:12,
        color: '#fff',
    },

    cashBackBox: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 20,
    },


    margin15: {
        marginBottom: 15,
    },
    profileMenu: {
        marginTop: 30,
    },
    lblInfo:{
        fontSize: 14,
        color: '#B1B1B1',
        marginBottom:7,
    },
    inputText: {
        height: inputBox.height,
        padding: inputBox.padding,
        borderWidth: inputBox.borderWidth,
        borderColor: inputBox.borderColor,
        borderRadius: inputBox.borderRadius,
        color: '#333333',
        fontSize: 14,
      },
      boxContainer: {
        marginTop: 15,
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

});

export default ChangePassword;
