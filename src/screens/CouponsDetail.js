import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Config from "react-native-config";
import axios from 'axios';
const ENDPOINT = '/coupons/coupon-detail';

const CouponsDetails = ({navigation, route, props}) => {
    const [couponsdetails, setCouponDetails] = useState({
        storeImage: null,
        description:'',
        cpCode: '',

    });

    const getDetails = () =>{
        axios.post(Config.API_URL + ENDPOINT,{
            'apiAuth': Config.API_AUTH,
            'device_type': 4,
            'coupon_id': route.params.couponId,
        }).then(({data})=>{
            console.log('couponsDetails', data)
            setCouponDetails({

                storeImage: data.response.coupon.store_image,
                description:data.response.coupon.description,
                cpCode:data.response.coupon.coupon_code,
            })
            
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
            {/* <Text style={styles.cpPara}>
            Through this coupon, you will get Rs.300 Off on Min 
order value must be Rs.969 or more Valid for all users
            </Text> */}
            <View style={styles.apllyCp}>
            <Text style={styles.cpCode}>{couponsdetails.cpCode}</Text>
            <TouchableOpacity onPress={(()=> navigation.navigate('Activated'))}>
                <View style={styles.btnCode}>
                    <Text style={styles.copIn}>Copy</Text>
                </View>
            </TouchableOpacity>
            </View>
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
    }

})

export default CouponsDetails;
