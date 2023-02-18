import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

import Config from "react-native-config";
import axios from 'axios';
const ENDPOINT = '/coupons/coupon-detail';

const CouponsDetails = ({navigation, route, props}) => {
    const [couponsdetails, setCouponDetails] = useState({
        storeImage: null,
        description:'',
        cpCode: '',

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
        }).then(({data})=>{
            setCouponDetails({
                storeImage: data.response.coupon.store_image,
                description:data.response.coupon.description,
                cpCode:data.response.coupon.coupon_code,
            });
            setCode(data.response.coupon.type);
        }).catch((error)=>{
            console.log(error);
        });

    };

    useEffect(()=>{
        getDetails();
    },[])

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
            <View style={styles.linkContainer}>
                <Text style={styles.ernCb}>Earn Cashback</Text>
                <View></View>
                <Text style={styles.sckipCb}>Skip  Cashback</Text>
            </View>
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
        color: '#409314',
        marginRight: 20,
    },
    sckipCb: {
        color: '#666',
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
