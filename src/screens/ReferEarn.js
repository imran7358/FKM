import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Config from 'react-native-config';
import request from '../utils/request';
const END_URL = '/user/userprofile';
import { useSelector } from 'react-redux';
import SucessLbl from '../components/SuccessCom';
import ErroLabel from '../components/ErrorCom';
import Clipboard from '@react-native-clipboard/clipboard';

const ReferEarn = () => {
    const userToken = useSelector(state=> state.user.userToken);
    const [error, setError] = useState(false)
    const [success, setSucess] = useState(false)
    const [code, setCode] = useState('')

    useEffect (()=>{
        console.log("Path", Config.API_URL + END_URL)
        axios.post(Config.API_URL + END_URL, {
            'apiAuth': Config.API_AUTH,
            'device_type': 4,
        },
        {
            headers: {
                'Authorization': userToken,
            }
        }).then(({data})=>{
            if(data.status == 1 & data.error == 0){
                setCode(data.data.refferal_key)
            }
            else{
                setError(data.message)
            }
        }).catch((error)=>{
            setError(error.message)
        })
    },[])

    const copyToClipboard = () => {
        Clipboard.setString(code);
        setSucess(true)
        setTimeout(() => {
            setSucess(false);
        }, 3000);
      };
    return (

        <SafeAreaView style={styles.bgWhite}>
            <ScrollView style={styles.bgWhite}>
                <View style={styles.container}>
                    <Text style={styles.headingTxt}>Let’s Grow Together With Our Refer And Earn Program</Text>

                    <View style={styles.copyCode}>
                        <Text style={[styles.referalLink, styles.margin30]}>Referral Code</Text>
                        <View style={styles.copyLink}>
                            <Text style={styles.codeLinkCon}>{code}</Text>
                            <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
                            <View >
                                <Text style={styles.cpText}>Copy</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                     {
                success ? <View style={styles.copyCodeCon}>
                    <Text style={styles.copiedTxt}>Successfully Copied !!</Text></View> : null
            }
                    <Text style={[styles.headingTxt, styles.margin30]}>Easy Process</Text>
                    <View style={styles.processImg}>
                        <Image source={require('../assets/images/processImg.png')} style={styles.prImg} />
                    </View>
                    {/* <Text style={[styles.headingTxt, styles.margin30]}>Frequently Asked Questions ?</Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 24,
        flex: 1,
    },
    copyCodeCon: {
        position: 'relative',
        marginTop: 10,
    },
    bgWhite: {
        backgroundColor: '#fff',
    },

    headingTxt: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 25,
    },
    copyCode: {
        backgroundColor: '#F7F7F7',
        marginTop: 20,
        padding: 20,
        borderRadius: 6,
        position: 'relative',
    },
    referalLink: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    copyLink: {
        borderWidth: 1,
        borderColor: '#f27935',
        borderRadius: 3,
        padding: 13,
        marginTop: 15,
    },
    codeLinkCon: {
        fontSize: 12,
    },
    copyBtn: {
        position: 'absolute',
        backgroundColor: '#f27935',
        right: 0,
        padding: 12,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        top:0,
    },
    cpText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff'
    },
    margin30: {
        marginTop: 20,
    },
    processImg: {
        height: 160,
        overflow: 'hidden',
        marginTop: 10,
        borderRadius: 6,
        width: '100%'
    },
    prImg: {
        width: '100%',
        height: 156,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    copiedTxt: {
        fontSize: 12,
        color: '#1AA253'}
})

export default ReferEarn;
