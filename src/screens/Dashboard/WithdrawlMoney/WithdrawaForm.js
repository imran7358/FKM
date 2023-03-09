import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { centerContainer, fontSize, inputBox } from '../../../assets/styles/common';
import Config from 'react-native-config';
import request from '../../../utils/request';
import { useSelector } from 'react-redux';
import WidthdarawlOtp from './WithdrawOtp';
const END_URL = '/cashback/withdraw-money';
import { Formik } from 'formik';
import * as yup from "yup"


const WidthdarawlForm = ({ navigation, payType, coupon, account, label }) => {
    const [userToken, withdrawInfo] = useSelector(state => {
        return [state.user.userToken, state.withdraw.withdrawInfo];
    });
    const [amount, setAmount] = useState(null);
    const [couponSelected, setCouponSelected] = useState(null);
    const [allCoupon, setAllCoupon] = useState(coupon.map((e, i) => {
        if (i === 0) return { selected: true, ...e };
        return { selected: false, ...e };
    }));
    const [pipe, Resp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sucess, setSuccess] = useState(false);
    const RadioButton = ({ onPress, selected, children }) => {
        return (
            <View style={styles.radioButtonContainer}>
                <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                    {selected ? <View style={styles.radioButtonIcon} /> : null}
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.radioButtonText}>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return pipe ? <WidthdarawlOtp response={pipe} payType={payType} couponSelected={{code: pipe.coupon_code, couponid: pipe.couponid}} account={account} /> : (
        <ScrollView style={styles.container}>
            <Formik initialValues={{
                amount:'',
            }}
            validationSchema = {yup.object().shape({
                amount:yup.string().required("Please enter the amount")
            })}
            onSubmit ={async(values,opt)=>{
                const cpnSel = coupon.find(e => e.code == couponSelected)
        setLoading(true);
        request.post(navigation, Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: '4',
            option: 'cbrequest',
            account_ref_id: account[0].account_ref_id,
            wallet_type: payType,
            amount:values.amount,
            code_reference: couponSelected,
            code: cpnSel.code || null,
            couponid: cpnSel.couponid || null,
        }, {
            headers: {
                'Authorization': userToken,
            },
        }).then(({ data }) => {
            setLoading(false);
            Resp(data);
            console.log("Submit Data", data)
        }).catch((error) => {
            console.log('Error', error.message);
        });
            }}
            >
                {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit})=>(

<View style={styles.innerContainer}>
<Text style={styles.storeName}>Selectd Account</Text>
<View style={styles.inputView}>
    <View style={styles.inputBoxContainer}>
        <TextInput
            autoCapitalize="none"
            style={styles.inputText}
            placeholderTextColor="#666"
            value={account[0].name}
        />
    </View>
</View>
<View style={styles.inputView}>
    <View style={styles.inputBoxContainer}>
        <TextInput
            autoCapitalize="none"
            style={styles.inputText}
            placeholder="Amount"
            placeholderTextColor="#666"
            onChangeText={handleChange('amount')}
            onBlur={() => setFieldTouched('amount')}
            value={values.amount}
        />
         {touched.amount && errors.amount &&
                                    <Text style={styles.error}>{errors.amount}</Text>
                                }
        <Text style={styles.cpLabel}>{label}</Text>
    </View>
</View>
<View style={styles.savedCoupons}>
    <Text style={styles.svedcponText}>Your Saved Coupons</Text>
    <View style={styles.app}>
        {
            allCoupon.map(item => (
            <RadioButton style ={styles.radioLbl} key={item.code} selected={item.selected} 
            onPress={() => {
                let tempCoupon = [...coupon];
                tempCoupon = tempCoupon.map(e => {
                    if (e.couponid === item.couponid) {
                        e.selected = true;
                        setCouponSelected(e.code);
                    }
                    else {
                        e.selected = false;
                    }
                    return e;
                });
                setAllCoupon(tempCoupon);
            }}>
                <Text>{item.usage_text}</Text>
            </RadioButton>))}

    </View>
</View>
<TouchableOpacity onPress={handleSubmit}>
    <View style={styles.loginButton}>
        <Text style={styles.loginTxt}>Submit</Text>
    </View>
</TouchableOpacity>
</View>

                )}
            </Formik>
        </ScrollView>);
};

const styles = StyleSheet.create({
    container: {
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
        marginTop: inputBox.marginTop,
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
    cpLabel:{
        marginTop: 10,
        fontSize: 12,
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
        marginTop: 20,
    },
    notes: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 10,
    },
    storeName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    margin10: {
        marginTop: 10,
    },
    savedCoupons: {
        marginTop: 15,
    },
    svedcponText: {
        fontSize: 14,
        fontWeight: 'bold',

    },
    app: {
        marginHorizontal: 'auto',
        marginVertical: 15,
        flex: 1,
        flexWrap: 'wrap',
        width: '90%',

    },
    header: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: 4,
        textAlign: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        flex:1,
    },
    radioButton: {
        height: 20,
        width: 20,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: '#98CFB6',
    },
    radioButtonText: {
        fontSize: 12,
        marginLeft: 16,
        flex: 0.6,
        flexWrap: 'wrap',
    },
    text: {
        lineHeight: 30,
        fontSize: 20,
        marginVertical: 5,
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

});

export default WidthdarawlForm;
