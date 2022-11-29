import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button} from 'react-native';

const Coupons = () => {

    return (

        <View style={styles.dealsContainer}>
           <View style={styles.productContainer}>
           <View style={styles.couponsList}>
            <View style={styles.couponHeading}>
                <Text style={styles.coupnHead}>Get 10% Cashback upto Rs. 200/- on Home & Kitchen Appliances</Text>
            </View>
            <View style={styles.getCodeInfo}>
                <View>
                    <Text style={styles.getCode}>Get Code</Text>
                </View>
                <View style={styles.endDays}>
                    <Image source={require('../assets/images/clock.png')} style={styles.clockimg}/>
                    <Text>End in 20 Days</Text>
                </View>
              
            </View>
            <View style={styles.shareViewCon}>
                  <View style={styles.innerShare}>
                    <View style={styles.viewCon}>
                        <Image source={require('../assets/images/eye.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/thumb.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                    </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/share.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                  </View>
                </View>
           </View>
           <View style={styles.couponsList}>
            <View style={styles.couponHeading}>
                <Text style={styles.coupnHead}>Get 10% Cashback upto Rs. 200/- on Home & Kitchen Appliances</Text>
            </View>
            <View style={styles.getCodeInfo}>
                <View>
                    <Text style={styles.getCode}>Get Code</Text>
                </View>
                <View style={styles.endDays}>
                    <Image source={require('../assets/images/clock.png')} style={styles.clockimg}/>
                    <Text>End in 20 Days</Text>
                </View>
              
            </View>
            <View style={styles.shareViewCon}>
                  <View style={styles.innerShare}>
                    <View style={styles.viewCon}>
                        <Image source={require('../assets/images/eye.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/thumb.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                    </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/share.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                  </View>
                </View>
           </View>
           <View style={styles.couponsList}>
            <View style={styles.couponHeading}>
                <Text style={styles.coupnHead}>Get 10% Cashback upto Rs. 200/- on Home & Kitchen Appliances</Text>
            </View>
            <View style={styles.getCodeInfo}>
                <View>
                    <Text style={styles.getCode}>Get Code</Text>
                </View>
                <View style={styles.endDays}>
                    <Image source={require('../assets/images/clock.png')} style={styles.clockimg}/>
                    <Text>End in 20 Days</Text>
                </View>
              
            </View>
            <View style={styles.shareViewCon}>
                  <View style={styles.innerShare}>
                    <View style={styles.viewCon}>
                        <Image source={require('../assets/images/eye.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/thumb.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                    </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/share.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                  </View>
                </View>
           </View>
           <View style={styles.couponsList}>
            <View style={styles.couponHeading}>
                <Text style={styles.coupnHead}>Get 10% Cashback upto Rs. 200/- on Home & Kitchen Appliances</Text>
            </View>
            <View style={styles.getCodeInfo}>
                <View>
                    <Text style={styles.getCode}>Get Code</Text>
                </View>
                <View style={styles.endDays}>
                    <Image source={require('../assets/images/clock.png')} style={styles.clockimg}/>
                    <Text>End in 20 Days</Text>
                </View>
              
            </View>
            <View style={styles.shareViewCon}>
                  <View style={styles.innerShare}>
                    <View style={styles.viewCon}>
                        <Image source={require('../assets/images/eye.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/thumb.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                    </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/share.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                  </View>
                </View>
           </View>
           <View style={styles.couponsList}>
            <View style={styles.couponHeading}>
                <Text style={styles.coupnHead}>Get 10% Cashback upto Rs. 200/- on Home & Kitchen Appliances</Text>
            </View>
            <View style={styles.getCodeInfo}>
                <View>
                    <Text style={styles.getCode}>Get Code</Text>
                </View>
                <View style={styles.endDays}>
                    <Image source={require('../assets/images/clock.png')} style={styles.clockimg}/>
                    <Text>End in 20 Days</Text>
                </View>
              
            </View>
            <View style={styles.shareViewCon}>
                  <View style={styles.innerShare}>
                    <View style={styles.viewCon}>
                        <Image source={require('../assets/images/eye.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/thumb.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                    </View>
                    <View style={styles.viewCon}>
                    <Image source={require('../assets/images/share.png')} style={styles.sharImg}/>
                        <Text>2k Views</Text>
                        </View>
                  </View>
                </View>
           </View>
           </View>
           </View>


    )

}

const styles = StyleSheet.create({
    dealsContainer: {
        padding: 24,
    },
    couponsList: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 9,
        marginBottom: 20,
      
    },
    coupnHead: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 28,
        padding: 20,
    },
    getCodeInfo: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
    },
    endDays: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareViewCon: {
        backgroundColor: '#F7F7F7',
        borderBottomLeftRadius: 9, 
        borderBottomRightRadius: 9,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop:20,
        paddingTop:10,
        paddingBottom: 10,
    },
    innerShare: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewCon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#B9B9B9',
        paddingRight: 10,
    },
    sharImg: {
        width:20,
        height: 20,
        resizeMode: 'contain',
        marginRight:10,
    },
    getCode: {
        borderColor: '#f27935',
        borderWidth: 1,
        borderRadius: 3,
        fontSize: 16,
        fontWeight: '900',
        padding: 12,
        paddingLeft: 40,
        paddingRight: 40,
        color: '#f27935',
    },
    clockimg: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginRight: 5,
    }

});

export default Coupons;
