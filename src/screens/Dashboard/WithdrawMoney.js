import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { centerContainer, fontSize, inputBox } from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import Config from 'react-native-config';
import request from '../../utils/request';
import { useSelector, useDispatch } from 'react-redux';
const END_URL = '/cashback/withdraw-payment-mode';
import WidthdarawlForm from './WithdrawaForm';
import WidthdarawlOtp from './WithdrawOtp';

const WidthdarawlMoney = ({ navigation }) => {
    const [value, setValue] = useState('');
    const [dataRes, setDataRes] = useState(null);
    const dispatch = useDispatch();

    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const mydata = [
        { label: 'Bank', value: 'bank' },
        { label: 'Paytm', value: 'paytm' },
    ];
    const getAccount = async () => {
        request.post(navigation, Config.API_URL + END_URL, {
            'apiAuth': Config.API_AUTH,
            'device_type': '4',
            'wallet_type': value,
        }, {
            headers: {
                'Authorization': userToken,
            },
        }).then(({ data }) => {
            setDataRes({ account: data.account, label: data.label_msg, coupon: data.promocodes });
        }).catch((error) => {
            console.log('Error', error);
        });
    };

    useEffect(() => {
        if (value) {
            getAccount();
        }
    }, [value])

    useEffect(() => {
    }, [dataRes])
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <View>
                    <Text style={styles.storeName}>Select Account</Text>
                </View>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={mydata}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Method"
                    placeholderTextColor="grey"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                        setValue(item.value);
                    }}

                />
                {
                    value === 'paytm' ? <View>
                        <Text style={styles.notification}>
                            Kindly note, Minimum withdrawal amount for paytm is Rs.100 and you will be charged a convenience fee of 3% on all PayTM withdrawal request
                        </Text>
                    </View>
                        : null
                }
                {/* <TouchableOpacity>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginTxt}>Next</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
            {value && dataRes ? <WidthdarawlForm payType={value} label={dataRes.label} account={dataRes.account} coupon={[
                { "code": dataRes.coupon.code, "couponid": dataRes.coupon.couponid, "request_amount": 0, "usage_text": "Use No coupon" },
                ...dataRes.coupon
            ]} /> : null}
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

export default WidthdarawlMoney;
