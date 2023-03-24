import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';


const Profile = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.container}>
            <View style={styles.profileInfo}>
               <TouchableOpacity onPress={()=> navigation.navigate('EditProfile')}>
               <View style ={styles.profilePic}>
                   <Image source={require('../assets/images/profile.png')} />
                </View>
               </TouchableOpacity>
                <View style={styles.profileInfoName}>
                    <Text style ={styles.pName}>Mohammad Imran</Text>
                    <Text style={styles.profileTax}>Check Out Your Cashback Summary</Text>
                </View>
            </View>
            <View style={styles.cashBackInfo}>
                <View style={styles.cashBackBox}>
                    <View style={[styles.cbTxt, styles.margin15]}>
                        <Text style={styles.cbRupees}>₹6734</Text>
                        <Text style={styles.cbBottomPara}>Confirmed Cashback</Text>
                    </View>
                    <View style={[styles.cbTxt, styles.margin15]}>
                        <Text style={styles.cbRupees}>₹6734</Text>
                        <Text style={styles.cbBottomPara}>Cashback Pending</Text>
                    </View>
                    <View style={[styles.cbTxt, styles.margin15]}>
                        <Text style={styles.cbRupees}>₹6734</Text>
                        <Text style={styles.cbBottomPara}>Total withdraw</Text>
                    </View>
                    <View style={[styles.cbTxt, styles.margin15]}>
                        <Text style={styles.cbRupees}>₹6734</Text>
                        <Text style={styles.cbBottomPara}>Total withdraw Pending</Text>
                    </View>
                    <View style={styles.cbTxt}>
                        <Text style={styles.cbRupees}>₹6734</Text>
                        <Text style={styles.cbBottomPara}>Available Cashback</Text>
                    </View>
                    <View style={styles.cbTxt}>
                        <Text style={styles.cbRupees}>₹6734</Text>
                        <Text style={styles.cbBottomPara}>Promo Balance</Text>
                    </View>
                </View>
            </View>
            <View style={styles.profileMenu}>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Click History</Text>
                        <Text>List of stores you visited recently</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Cashback History</Text>
                        <Text>Find History of your cashback purchases</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Withdrawal History</Text>
                        <Text>Withdrawal requests submitted by you</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Report Missing</Text>
                        <Text>Submit missing cashback request</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Refer and earn</Text>
                        <Text>Refer to your friend and earn more</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Referral History</Text>
                        <Text>Find Your Referral History of Earning </Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Withdraw Money</Text>
                        <Text>Withdraw your cashback money</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Referral Money</Text>
                        <Text>Withdraw referral money</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Cashback Claim Form</Text>
                        <Text>Fill the form Within 24 hrs of your order Only </Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Missing Cashback History</Text>
                        <Text>Check your missing cashback status here</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Add account</Text>
                        <Text>Add a new Bank/Paytm account to withdraw </Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

                    <View>

                   </View>
                </View>
                <View style={styles.menuList}>
                   <View style={styles.menuName}>
                   <View style={styles.menuIcon}>
                    <Image source={require('../assets/images/history-icon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.menuNameTxt}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>Notification</Text>
                        <Text>Find the list of FKM activities</Text>
                    </View>
                   </View>

                    <Image source={require('../assets/images/right-arrow.png')} style={styles.arrowIcon}/>

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
        justifyContent: 'space-between',
        width: '47%',
        textAlign: 'center',
        alignItems: 'center'


    },
    cbBottomPara: {
        fontSize: 10,
    },
    cbRupees: {
        fontSize:14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    margin15: {
        marginBottom: 15,
    },
    profileMenu: {
        marginTop: 30,
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
        resizeMode: 'contain'
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
        resizeMode: 'contain'
    }
});

export default Profile;
