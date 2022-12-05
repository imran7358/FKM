import React from 'react';

import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ReferEarn = () => {

    return (

       <SafeAreaView style = {styles.bgWhite}>
        <ScrollView style = {styles.bgWhite}>
            <View style = {styles.container}>
                <Text style={styles.headingTxt}>Let’s Grow Together With Our Refer And Earn Program</Text>

                <View style = {styles.copyCode}>
                    <Text style={styles.referalLink}>Referral Link</Text>
                    <View style = {styles.copyLink}>
                        <Text style={styles.codeLinkCon}>https://freekaamaal.com/referral/90501380</Text>
                        <View style={styles.copyBtn}>
                            <Text style={styles.cpText}>Copy</Text>
                        </View>
                    </View>
                    <Text style={[styles.referalLink, styles.margin30]}>Referral Code</Text>
                    <View style = {styles.copyLink}>
                        <Text style={styles.codeLinkCon}>90501380</Text>
                        <View style={styles.copyBtn}>
                            <Text style={styles.cpText}>Copy</Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.headingTxt, styles.margin30]}>Easy Process</Text>
                <View style={styles.processImg}>
                    <Image source={require('../assets/images/processImg.png')} style={styles.prImg}/>
                </View>
                <Text style={[styles.headingTxt, styles.margin30]}>Frequently Asked Questions ?</Text>
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
    }

})

export default ReferEarn;
