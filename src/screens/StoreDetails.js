import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {centerContainer, fontSize} from '../assets/styles/common';
import Coupons from '../components/Coupons';
import Deals from '../components/Deals';


const StoreDetails = () => {
    const [deals, setShowDeals] = useState(true);
  const [coupons, setShowCoupons] = useState(false);
  const showDeals = () => {
    setShowDeals(true);
    setShowCoupons(false);
  };

  const showCoupons = () => {
    setShowCoupons(true);
    setShowDeals(false);
  };

    return (

        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                   <View style={styles.StoreCardInfo}>
                    <View style={styles.logoContainer}>
                       <View style={styles.logoBox}>
                        <Image source={require('../assets/images/licius.png')}  style={styles.logo}/>
                       </View>
                    </View>
                    <View style={styles.cashbackStore}>
                        <Image source={require('../assets/images/rupee-icon.png')} style={{width:13,height:13, resizeMode: 'contain'}}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft:5, marginRight:5,}}><Text style={{fontSize:14,fontWeight: 'bold'}}>500</Text><Text style={{fontSize: 14,}}>Cashback</Text></View>
                        <Image source={require('../assets/images/info.png')} />
                       </View>
                       <View>
                    <Text style={styles.storePara}>Delight your taste buds with fresh meats home 
delivered. 30% Off on 1st order. Forget the crowds, 
order fresh delicious meats, and seafood online 
from Licious.</Text>
                   </View>
                   <View style={styles.cashbackInfo}>
                   <View style={styles.confirmTime}>
                    <Text style={styles.infoTxt}>Confirmation Time</Text>
                    <Text style={styles.infoPara}>90 Days</Text>
                    </View>
                   <View style={styles.trackingSpeed}>
                   <Text style={styles.infoTxt}>Tracking Speed</Text>
                    <Text style={styles.infoPara}>2-3 Days</Text>
                   </View>
                   <View style={styles.otherInbfo}>
                   <Text style={styles.infoTxt}>Missing Order</Text>
                    <Text style={styles.infoPara}>Accepted</Text>
                   </View>
                   </View>
                   </View>

                   <View style={styles.cashbackRates}>
                    <View style={styles.cbrateTxt}>
                        <Text style={{fontSize: 14,}}>Cashback</Text>
                        <Text style={{fontSize: 14, fontWeight:'bold', marginLeft: 5,}}>Rates</Text>
                    </View>
                    <View style={styles.cbCardContainer}>
                       <View style={styles.cbInner}>
                        <View style={styles.cbRupee}>
                           <View style={styles.cbInfoCon}>
                            <Image source={require('../assets/images/wRupee.png')} />
                            <Text style={{fontWeight: '900', fontSize:12, color:'#fff',marginLeft: 3,}}>500</Text>
                           </View>
                           <Text style={{fontSize: 12,color: '#fff'}}>Cashback</Text>
                        </View>

                        <View style={styles.cbTxt}>
                            <Text style={{fontSize:14, fontWeight:'900', marginBottom:5,}}>Valid Sitewide</Text>
                            <Text style={{fontSize:12, flexWrap:'wrap', width: '80%',lineHeight:18}}>Shop Anything Worth Rs.999 & Get  [ Including Shipping ]</Text>
                        </View>
                       </View>
                    </View>
                    <View style={styles.cbCardContainer}>
                       <View style={styles.cbInner}>
                        <View style={styles.cbRupee}>
                           <View style={styles.cbInfoCon}>
                            <Image source={require('../assets/images/wRupee.png')} />
                            <Text style={{fontWeight: '900', fontSize:12, color:'#fff',marginLeft: 3,}}>500</Text>
                           </View>
                           <Text style={{fontSize: 12,color: '#fff'}}>Cashback</Text>
                        </View>

                        <View style={styles.cbTxt}>
                            <Text style={{fontSize:14, fontWeight:'900', marginBottom:5,}}>Valid Sitewide</Text>
                            <Text style={{fontSize:12, flexWrap:'wrap', width: '80%',lineHeight:18}}>Shop Anything Worth Rs.999 & Get  [ Including Shipping ]</Text>
                        </View>
                       </View>
                    </View>
                    <View style={styles.cbCardContainer}>
                       <View style={styles.cbInner}>
                        <View style={styles.cbRupee}>
                           <View style={styles.cbInfoCon}>
                            <Image source={require('../assets/images/wRupee.png')} />
                            <Text style={{fontWeight: '900', fontSize:12, color:'#fff',marginLeft: 3,}}>500</Text>
                           </View>
                           <Text style={{fontSize: 12,color: '#fff'}}>Cashback</Text>
                        </View>

                        <View style={styles.cbTxt}>
                            <Text style={{fontSize:14, fontWeight:'900', marginBottom:5,}}>Valid Sitewide</Text>
                            <Text style={{fontSize:12, flexWrap:'wrap', width: '80%',lineHeight:18}}>Shop Anything Worth Rs.999 & Get  [ Including Shipping ]</Text>
                        </View>
                       </View>
                    </View>
                   </View>

                   <View style={styles.claimForm}>
                    <View>
                       <Text style={{fontSize: 14, fontWeight: '900',marginBottom: 5,}}>Cashback claim form</Text>
                       <Text> Fill up this form within 24 hrs</Text>
                    </View>
                    <View style={styles.claimFormbtn}>
                        <Text style={{color: '#fff', fontWeight: '900'}}>Claim Form</Text>
                    </View>
                   </View>

                   
                  
                </View>
                <View style={styles.dealsCpContainer}>
                <View style={styles.catDeals}>
                <View style={styles.tabList}>
                <TouchableOpacity onPress={showDeals} style={styles.tabContainer}> 
                    <View style={deals ? [styles.tab,styles.activeTab] : [styles.tab] } ><Text style={deals ? styles.activText : styles.mayTab}>Deals <Text>(10)</Text></Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showCoupons} style={styles.tabContainer}>
                    <View style={coupons ? [styles.tab, styles.coupnActiveTab] : [styles.tab]}><Text style={coupons ? styles.activText : styles.mayTab}>Coupons <Text>(20)</Text></Text></View>
                    </TouchableOpacity>
                </View>
            </View>
            {
                deals ? 
                
                <Deals/>

                : null
            }
            
            {
                coupons ? 
                
                <Coupons/>

                : null
            }
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    cashbackRates: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 6,
    },
    catDeals: {
        padding: 24,
        backgroundColor: '#fff',
      },
      tabList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#f27935',
        borderRadius: 45,
      },
    dealsCpContainer: {
        backgroundColor: '#fff',
    },
    tabContainer: {
        width: '50%',
      },
      mayTab: {
        fontSize: 14,
        color: '#333',
      },
      tab: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        fontSize: 14,
      },
    claimFormbtn: {
        backgroundColor: '#3B3B3B',
        borderRadius: 6,
        padding:10,
    },
    cbTxt: {
        padding: 20,
    },
    cbRupee: {
        backgroundColor: '#f27935',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width:80,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,

    },
    claimForm: {
        backgroundColor: '#fff',
        borderRadius: 6,
        marginTop: 15,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cbInfoCon: {
        backgroundColor: '#f27935',
        flexDirection: 'row',
        alignItems: 'center'

    },
    cbInner: {
        flexDirection: 'row',
    },
    cbCardContainer: {
        borderColor: '#f27935',
        borderWidth: 1,
        borderStyle: 'dashed',
        marginTop: 15,
        borderRadius: 6,
    },
    cbrateTxt: {

        flexDirection: 'row',
    },
    container: {
      padding: 24,
      backgroundColor: '#F7F7F7',
      width: '100%'
    },

    trackingSpeed: {
        width: '35%',
        alignContent: 'center',
        alignItems: 'center',
    },

    infoTxt: {
        fontSize: 10, 
        fontWeight: '900', 
        color: '#f27935',

    },
    cashbackInfo: {
        backgroundColor:'#F8F8F8', 
        padding:20, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },


    infoPara: {

        fontSize:11,
        marginTop:7, 

    },
    storePara: {
        fontSize:15, 
        lineHeight:25,
        padding: 10,
    },

    confirmTime: {
        justifyContent: 'center', 
        alignContent: 'center',
         width: '38%',
          alignItems: 'center',
    },
    otherInbfo: {
        width:'30%',
         justifyContent: 'center',
         alignItems: 'center',

    },
    StoreCardInfo: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 20,
        marginTop: 50,
        width: '100%',

    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },
    logoBox: {
        borderColor: '#F5F5F5',
        borderWidth: 1,
        width: 120,
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 72,
        height: 29,
        resizeMode: 'contain',
    },
    cashbackStore: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',

    },
    activeTab: {
        fontWeight: 'bold',
        backgroundColor: '#f27935',
        borderTopLeftRadius: 45,
        borderBottomLeftRadius: 45,
      },
      coupnActiveTab: {
        fontWeight: 'bold',
        backgroundColor: '#f27935',
        borderTopRightRadius: 45,
        borderBottomRightRadius: 45,
      },
      activText: {
        fontWeight: 'bold',
        color: '#fff',
      },
   

  });

export default StoreDetails;