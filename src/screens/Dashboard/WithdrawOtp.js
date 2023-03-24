import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { centerContainer, fontSize, inputBox } from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import Config from 'react-native-config';
import request from '../../utils/request';
import { useSelector, useDispatch } from 'react-redux';
const END_URL = '/cashback/withdraw-money';

const WidthdarawlOtp = ({ navigation, response, payType, couponSelected, account }) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const request_id = response.request_id;
    const [OTP, setOTP] = useState("");
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const mydata = [
        { label: 'Bank', value: 'bank' },
        { label: 'Paytm', value: 'paytm' },
    ];
    const sendAPIreq = (opt) => {
        request.post(navigation, Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: '4',
            option: opt,
            code: couponSelected.code || null,
            couponid: couponSelected.couponid || null,
            request_id: response.request_id,
            wallet_name: payType,
            userotp: OTP,
            code_reference: response.code_reference,
        }, {
            headers: {
                'Authorization': userToken,
            },
        }).then(({ data }) => {
            
            // setLoading(false);
            // Resp(data);
        }).catch((error) => {
            console.log('Error', error.message);
        });
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <View>
                    <Text style={styles.storeName}>OTP</Text>
                    <Text>{response.msg}</Text>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            autoCapitalize="none"
                            style={styles.inputText}
                            placeholderTextColor="#666"
                            placeholder="OTP"
                            onChangeText={(e) => {
                                setOTP(e);
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    sendAPIreq("confirmotp")
                }}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginTxt}>Submit</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    cbform: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    inputText: {
        height: inputBox.height,
        padding: inputBox.padding,
        borderWidth: inputBox.borderWidth,
        borderColor: inputBox.borderColor,
        borderRadius: inputBox.borderRadius,
        color: '#333333',
        fontSize: 14,
        backgroundColor: '#fff',
    },
    loginButton: {
        alignItems: centerContainer.alignCenter,
        justifyContent: centerContainer.justifyCenter,
        backgroundColor: '#F27935',
        padding: 10,
        marginTop: 10,
        borderRadius: 6,
        fontWeight: 'bold',
        height: 50,
    },
    loginTxt: {
        fontSize: fontSize.headingFont,
        fontWeight: '900',
        color: '#fff',
    },
    activeTab: {
        color: '#F27935',
        fontWeight: '900',
        borderColor: '#f27935',
        borderBottomWidth: 1,
    },
    txtActive: {
        color: '#f27935',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'capitalize',
    },
    dropdown: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderRadius: 3,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    notification: {
        color: 'green',
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 15,

    },
    innerContainer: {
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    notes: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 10,
    },
    storeName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    margin10: {
        marginTop: 10,
    },

});

export default WidthdarawlOtp;
