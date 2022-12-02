import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const CouponsActivated = ({navigation}) => {

    return (
       <ScrollView style={{backgroundColor: '#fff'}}>
         <View style={styles.container}>
           <View style={styles.cpDetailCon}>
            <View style={styles.logoCon}>
                <Text style={styles.cbActivated}>Cashback Activated</Text>
            </View>
            <Text style={styles.detailsTxt}>
            Shop at xyxxcrew  & ₹450.00 Cashback
FreeKaaMaal.com
            </Text>

            <View style={styles.boxContainer}>
               <View style={[styles.box, styles.box1]}>
               <View style={styles.cbTrack}>
                <Image source={require('../assets/images/track.png')} style={styles.cbImg}/>
                    <Text style={styles.lblCont}>Cashback Tracks in</Text>
                    
               </View>
               <Text style={styles.businessTime}>2-3 Business Days</Text>
               </View>
               <View style={[styles.box, styles.box2]}>
               <View style={styles.cbTrack}>
                <Image source={require('../assets/images/track.png')} style={styles.cbImg}/>
                    <Text style={styles.lblCont}>Cashback Confirmation</Text>
                    
               </View>
               <Text style={styles.businessTime}>40-45 Days</Text>
               </View>
               <View style={[styles.box, styles.box3]}>
               <View style={styles.cbTrack}>
                <Image source={require('../assets/images/track.png')} style={styles.cbImg}/>
                    <Text style={styles.lblCont}>Missing  Ticket</Text>
                    
               </View>
               <Text style={styles.businessTime}>Accepted</Text>
               </View>
            </View>
           </View>
           <View style={styles.bottomBox}>
               <View style={styles.txtCon}>
               <Text style={styles.redirect}>We are now redirecting to our partner site</Text>
               <View style={styles.redirectBtn}>
                <Text style={styles.btnTxt}>Click Here To Redirect Manually</Text>
               </View>
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
        width: 200,
        height: 50,
        borderRadius: 3,
        zIndex: 999,
        borderWidth: 1,
        borderColor: '#f27935',
        left: '25%',
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

    cbActivated: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f27935',
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cbTrack: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        height: 80,
        alignItems: 'center',
    },
    box1: {
        width: 100,
        position: 'relative',
    },
    box2: {
        width: 120,
    },
    box3: {
        width: 100,
    },
    lblCont: {
        backgroundColor: '#FFF5EF',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        fontSize: 9,
        position: 'absolute',
        bottom: 0,
        padding: 6,
        width: '100%',
        left: 0,
        color: '#f27935',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    cbImg: {
        marginTop: 10,
    },
    businessTime: {
        fontWeight: 'bold',
        fontSize: 10,
        marginTop: 12,
        textAlign: 'center',
    },
    redirect: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent:'center',
        alignContent: 'center'

    },
    txtCon: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    bottomBox: {
        marginTop: 20,
    },
    redirectBtn: {
        backgroundColor: '#f27935',
        borderRadius: 6,
        padding: 16,
        marginTop: 20,
    },
    btnTxt: {
        color: '#fff',
        fontWeight: 'bold',
    }


})

export default CouponsActivated;
