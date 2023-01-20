
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
    centerContainer,
    fontSize,
    inputBox,
} from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';

const ReferralMoney = () => {
    const [value, setValue] = useState('Bank');
    useEffect(() => {
    }, [value]);
    const data = [
        { label: 'Bank', value: 'Bank' },
        { label: 'Paytm', value: 'Paytm' },
    ];
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
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    placeholderTextColor="grey"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                        setValue(item.value);
                    }}

                />
                {
                    value === 'Paytm' ? <View >
                        <Text style={styles.notification}>
                        Kindly note, Minimum withdrawal amount for paytm is Rs.100 and you will be charged a convenience fee of 3% on all PayTM withdrawal request
                        </Text>
                    </View>
                    : null
                }
                 <View>
                    <Text style={styles.storeName}>Enter the amount you want to redeem</Text>
                </View>
                <View style={styles.inputBoxContainer}>
              <TextInput
               style={[styles.inputText, styles.lableFont]}
                placeholder="Account Number"
              />
              </View>
                <TouchableOpacity>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginTxt}>WITHDRAW</Text>
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
        backgroundColor: '#fff',
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
    notification:{
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
    }

})

export default ReferralMoney;




