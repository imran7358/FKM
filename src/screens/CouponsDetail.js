import React, { useEffect, useState } from 'react';
import {Platform,View, Text, StyleSheet,Linking, Button, TouchableOpacity, Image} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import Clipboard from '@react-native-clipboard/clipboard';
import {Clipboard} from 'react-native';

import { useSelector } from 'react-redux';
import Config from "react-native-config";
import axios from 'axios';
const ENDPOINT = '/coupons/coupon-detail';
import {
    centerContainer,
    fontSize,
    inputBox,
    fontColor,
    commonMargin,
} from '../assets/styles/common';
const CouponsDetails = ({navigation, route, props}) => {
    const deviceType = Platform.OS=='ios' ? 4 : 3 ;
    const userToken = useSelector(state=> state.user.userToken);
    const userInfo = useSelector(state=> state.user.userInfo);
    const [couponsdetails, setCouponDetails] = useState({
        storeImage: null,
        description:'',
        cpCode: '',
        cb_landing_url:'',
        noncb_landing_url:'',
        is_cashback:''


    });
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState('')
    const copyToClipboard = () => {
        Clipboard.setString(couponsdetails.cpCode);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
      };

    const getDetails = () =>{
        axios.post(Config.API_URL + ENDPOINT,{
            'apiAuth': Config.API_AUTH,
            'device_type': 4,
            'coupon_id': route.params.couponId,
        },{
        headers: {
                Authorization: userToken,
                },
            
        }).then(({data})=>{
            console.log(data)
            setCouponDetails({
                storeImage: data.response.coupon.store_image,
                description:data.response.coupon.description,
                cpCode:data.response.coupon.coupon_code,
                cb_landing_url:data.response.coupon.cb_landing_url,
                noncb_landing_url:data.response.coupon.noncb_landing_url,
                is_cashback:data.response.coupon.is_cashback
            });
            setCode(data.response.coupon.type);
        }).catch((error)=>{
            console.log(error);
        });

    };

    useEffect(()=>{
        console.log(route.params.couponId)
        getDetails();
    },[])
    const openURL = async (url) => {
        // Alert.alert('ok')
        try {
          await Linking.openURL(url);
        } catch (error) {
          console.error('Error opening URL: ', error);
        }
      };
    return (
       <ScrollView style={{backgroundColor: '#fff'}}>
         <View style={styles.container}>
           <View style={styles.cpDetailCon}>
            <View style={styles.logoCon}>
                <Image source={{uri: couponsdetails.storeImage}} style={styles.logoSize}/>
            </View>
            <Text style={styles.detailsTxt}>
          {couponsdetails.description}
            </Text>
           {
            code === 'coupon' &&  <View style={styles.apllyCp}>
            <Text style={styles.cpCode}>{couponsdetails.cpCode}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
                <View style={styles.btnCode}>
                    <Text style={styles.copIn}>Copy</Text>
                </View>
            </TouchableOpacity>
            </View>
           }
           {
            code === 'offer' &&  <View style={styles.activatedOffer}><Text style={styles.activateTxt}>Activated Offer</Text></View>
           }
            {
                success ? <View style={styles.copyCode}>
                    <Text style={styles.copiedTxt}>Successfully Copied !!</Text></View> : null
            }
            {
            couponsdetails.is_cashback == '1' ?
            
            <View style={styles.linkContainer}>
            {
                userInfo ?
                // <TouchableOpacity onPress={() => Linking.openURL(couponsdetails.cb_landing_url)}>
                <TouchableOpacity onPress={() => openURL(couponsdetails.cb_landing_url)}>
                     <View style={styles.CbButton}>
                <Text style={styles.ernCb}>Earn Cashback</Text>
                </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> { navigation.navigate('Login')}}>
                    <View style={styles.CbButton}>
                <Text style={styles.ernCb} >Login & Earn Now </Text>
                </View>
                </TouchableOpacity>
            }
            
                
                <View></View>
                {/* <TouchableOpacity onPress={() => Linking.openURL(couponsdetails.noncb_landing_url)}> */}
                <TouchableOpacity onPress={() => openURL(couponsdetails.noncb_landing_url)}>
                <View style={styles.CbButton1}>
                <Text style={styles.sckipCb} >Skip  Cashback</Text>
                </View>
                </TouchableOpacity>
                </View>
           : 
           <View style={styles.linkContainer}>
            
            
            {/* <TouchableOpacity onPress={() => Linking.openURL(couponsdetails.noncb_landing_url)}> */}
            <TouchableOpacity onPress={() => openURL(couponsdetails.noncb_landing_url)}>
                <View style={styles.CbButton1}>
                
            <Text style={styles.sckipCb} >Shop Now</Text>
            </View>
            </TouchableOpacity>
                </View>
                }      
           </View>
        </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        padding: 24,
        marginTop: 30,
    },
    CbButton: {
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor: '#f27935',
        color:"#000",
        padding:  10,
        // textAlign:'center',
        marginRight:15,
        marginTop: 30,
        display:"flex",
        borderRadius: 6,
        fontWeight: 'bold',
        height: 50,
    },
    CbButton1: {
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor: 'grey',
        color:"#000",
        padding: 10,
        marginTop: 30,
        display:"flex",
        borderRadius: 6,
        fontWeight: 'bold',
        height: 50,
    },
    cpDetailCon: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 20,
        borderRadius: 6,
        position: 'relative',
    },
    logoCon: {
        position: 'absolute',
        width: 100,
        height: 50,
        borderRadius: 3,
        zIndex: 999,
        borderWidth: 1,
        borderColor: '#ccc',
        left: '38%',
        top: -25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsTxt: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 25,
        textAlign: 'center',
        lineHeight: 22,
    },
    cpPara: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 22,
    },
    apllyCp: {
        borderWidth: 1,
        borderColor: '#f27935',
        marginTop: 20,
        borderRadius: 6,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cpCode: {
        padding: 15,
        fontWeight: '800',
        fontSize: 16,
    },
    btnCode: {
        backgroundColor: '#f27935',
        width: 127,
        justifyContent: 'center',
        alignItems: 'center',
    },
    copIn: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
        padding: 15,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    ernCb: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    sckipCb: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
    logoSize: {
        width: 72,
        height: 30,
        resizeMode: 'contain'
    },
    copyCode: {
        position: 'relative',
        marginTop: 10,
    },
    copiedTxt: {
        fontSize: 12,
        color: '#1AA253',
    },
    activatedOffer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f27935',
        borderWidth: 1,
        borderStyle:'dashed',
        padding: 10,
        marginVertical: 10,
    },
    activateTxt: {
        color: '#f27935',
        fontWeight: 'bold',
        fontSize: 16,
    }

})

export default CouponsDetails;
