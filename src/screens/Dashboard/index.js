
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const END_URL = '/cashback/home';
const PROMO_CODE = '/cashback/userpromocode';
import { useSelector } from 'react-redux';
import {inputBox} from '../../assets/styles/common';

const Profile = ({ navigation }) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const [promo, setPromo] = useState('');
    const [summry, setSummary] = useState({
        confirmAmount: '',
        widthdrawlAmount: '',
        wPendingAmount: '',
        pendingAmount: '',
        avlableAmount: '',

    });
    const [userinfo, setUserInfo] = useState({
        title: '',
        email: '',
        phone: '',

    });

    const [sucess, setSucess] = useState(false);
    const [error, setError] = useState(false);
    const getDetails = async () => {
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
                setSummary({
                    confirmAmount: data.response.user_summary.confirm_amount,
                    widthdrawlAmount: data.response.user_summary.withdrawal_amount,
                    wPendingAmount: data.response.user_summary.withdraw_pending_amount,
                    pendingAmount: data.response.user_summary.pending_amount,
                    available_amount: data.response.user_summary.available_amount,
                });
                setUserInfo({
                    title: data.token.title,
                })

            }).catch((error) => {
                console.log(error);
            });

    };
    useEffect(() => {
        getDetails();
        console.log("Uname", userinfo.title)
        console.log("Token", userToken)
    }, []);
    const RedeemCode = () => {
        axios.post(Config.API_URL + PROMO_CODE, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            promocode: promo,
        },
        {
            headers: {
                Authorization: userToken,
            },
        }).then((data)=>{
            if(data.status === '1' && data.error === "0" ) {
                setSucess(true)
            }
            else {
                setError(true)
            }
        }).catch((error)=>{
            setError(true)
        })
    }
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.profileInfo}>

                        <View style={styles.editProfile}>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Image source={require('../../assets/images/edit.png')} style={styles.editImg} />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.profilePic}>
                            <Image source={require('../../assets/images/profile.png')} />
                        </View>
                        <View style={styles.profileInfoName}>
                            <Text style={styles.pName} numberOfLines={1}>{userinfo.title}</Text>
                            <Text style={styles.profileTax}>Check Out Your Cashback Summary</Text>
                        </View>
                    </View>

                    <View style={styles.cashBackInfo}>
                        <View style={styles.cashBackBox}>
                            <View style={[styles.cbTxt, styles.margin15]}>
                                <Text style={styles.cbRupees}>₹{summry.confirmAmount}</Text>
                                <Text style={styles.cbBottomPara}>Confirmed Cashback</Text>
                            </View>
                            <View style={[styles.cbTxt, styles.margin15]}>
                                <Text style={styles.cbRupees}>₹{summry.pendingAmount}</Text>
                                <Text style={styles.cbBottomPara}>Cashback Pending</Text>
                            </View>
                            <View style={[styles.cbTxt, styles.margin15]}>
                                <Text style={styles.cbRupees}>₹{summry.widthdrawlAmount}</Text>
                                <Text style={styles.cbBottomPara}>Total withdraw</Text>
                            </View>
                            <View style={[styles.cbTxt, styles.margin15]}>
                                <Text style={styles.cbRupees}>₹{summry.wPendingAmount}</Text>
                                <Text style={styles.cbBottomPara}>withdraw Pending</Text>
                            </View>
                            <View style={styles.cbTxt}>
                                <Text style={styles.cbRupees}>₹{Number(summry.available_amount).toFixed(2)}</Text>
                                <Text style={styles.cbBottomPara}>Available Cashback</Text>
                            </View>
                            <View style={styles.cbTxt}>
                                <Text style={styles.cbRupees}>₹6734</Text>
                                <Text style={styles.cbBottomPara}>Promo Balance</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.promoCont}>
                    <Text style={styles.promoHeading}>Get a Promo Code</Text>
                    <View style={styles.promoInner}>
                        <TextInput
                                autoCapitalize="none"
                                style={styles.inputText}
                                value={promo}
                                placeholderTextColor="#666"
                                placeholder="Your Promo Code"
                                onChangeText={(txt)=> setPromo(txt)}
                            />
                            <TouchableOpacity onPress={RedeemCode} style={styles.rdmButton}>
                                <Text style={styles.btnTxt}>Redeem</Text>
                            </TouchableOpacity>
                    </View>
                    {
                                error && <View style={styles.errorMsg}>
                                    <Text style={styles.errorLbl}>Invlaid promo code</Text>
                                </View>
                            }

                           {
                                sucess && <View style={styles.errorMsg}>
                                    <Text style={styles.sucessLbl}>Successfully Submitted !</Text>
                                </View>
                            }

                            
                    </View>
                    <View style={styles.profileMenu}>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('ClickHistory')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/history-icon.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Click History</Text>
                                        <Text>List of stores you visited recently</Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />

                                <View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('CashbackHistory')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/cbhistory.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Cashback History</Text>
                                        <Text>Find History of your cashback purchases</Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />

                                <View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('WithdrawalHistory')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/whistory.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Withdrawal History</Text>
                                        <Text>Withdrawal requests submitted by you</Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />

                                <View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('MissingForm')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/rmissing.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Report Missing</Text>
                                        <Text>Submit missing cashback request</Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />
                                <View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('ReferEarn')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/referearn.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Refer and earn</Text>
                                        <Text>Refer to your friend and earn more</Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />
                                <View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('ReferralHistory')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/rhistory.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Referral History</Text>
                                        <Text>Find Your Referral History of Earning </Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />

                                <View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('WidthdrawalMoney')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/wmoney.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Withdraw Money</Text>
                                        <Text>Withdraw your cashback money</Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />
                                <View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('ReferralMoney')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/rmoney.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Referral Money</Text>
                                        <Text>Withdraw referral money</Text>
                                    </View>
                                </View>
                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />
                                <View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('ClaimForm')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/cbform.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Cashback Claim Form</Text>
                                        <Text>Fill the form Within 24 hrs of your order Only </Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />

                                <View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('MissingCashback')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/mhistory.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Missing Cashback History</Text>
                                        <Text>Check your missing cashback status here</Text>
                                    </View>
                                </View>

                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />

                                <View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('AddAccount')}>
                                <View style={styles.menuName}>
                                    <View style={styles.menuIcon}>
                                        <Image source={require('../../assets/images/addacount.png')} style={styles.icon} />
                                    </View>
                                    <View style={styles.menuNameTxt}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Add account</Text>
                                        <Text>Add a new Bank/Paytm account to withdraw </Text>
                                    </View>
                                </View>
                                <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />
                                <View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuList}>
                            <View style={styles.menuName}>
                                <View style={styles.menuIcon}>
                                    <Image source={require('../../assets/images/mnotification.png')} style={styles.icon} />
                                </View>
                                <View style={styles.menuNameTxt}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>Notification</Text>
                                    <Text>Find the list of FKM activities</Text>
                                </View>
                            </View>
                            <Image source={require('../../assets/images/right-arrow.png')} style={styles.arrowIcon} />
                            <View>

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    rowContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorLbl: {
        fontSize: 12,
        color:'red',
        marginTop:7,

    },
    btnTxt: {

        color:'#fff',
        fontWeight: '900',
        fontSize: 16,

    },
    suc: {
        fontSize: 12,
        color: '#1AA253',
    },
    rdmButton: {
        position: 'absolute',
        backgroundColor: '#f27935',
        right:10,
        padding: 12,
        borderTopRightRadius:6,
        borderBottomRightRadius:6,
        top:10,
    },
    promoCont: {
        marginTop:20,
    },
    promoHeading: {
        fontSize: 16,
        fontWeight: '900',
        color: '#F27935',
        marginBottom: 10,
    },
    promoInner:{
        backgroundColor: '#f2f2f2',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 6,
        position: 'relative',
    },
    inputText: {
        height: inputBox.height,
        padding: inputBox.padding,
        borderWidth: inputBox.borderWidth,
        borderColor: inputBox.borderColor,
        borderRadius: inputBox.borderRadius,
        color: '#333333',
        fontSize: 14,
        width: '100%',
        backgroundColor: '#FFF',
      },
    editImg: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    editProfile: {
        width: 30,
        height: 30,
        borderRadius: 45,
        backgroundColor: '#fff',
        position: 'absolute',
        right: 15,
        top: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f27935',
        borderRadius: 6,
        position: 'relative',
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
        fontSize: 12,
        color: '#fff',
    },
    cashBackInfo: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#F7F7F7',
        marginTop: 20,
    },
    cashBackBox: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 20,
    },
    cbTxt: {
        backgroundColor: '#F7F7F7',
        borderRadius: 3,
        padding: 20,
        justifyContent: 'center',
        width: '47%',
        textAlign: 'center',
        alignItems: 'center'


    },
    cbBottomPara: {
        fontSize: 10,
    },
    cbRupees: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    margin15: {
        marginBottom: 15,
    },
    profileMenu: {
        marginTop: 15,
    },
    menuIcon: {
        height: 38,
        width: 38,
        backgroundColor: '#F0F0F0',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    menuList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#F8F8F8',
        paddingVertical: 20,
    },
    menuName: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    menuNameTxt: {
        marginLeft: 15,
    },
    arrowIcon: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
    },
});

export default Profile;
