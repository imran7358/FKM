import React from "react";

import {View,Text, StyleSheet, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TopCouponsList = ({navigation}) => {
    const images = [
        {
          image:'https://images.freekaamaal.com/store-images/758.jpg',
          desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
        },

        {
          image: 'https://images.freekaamaal.com/store-images/3254.jpg',
          desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
        },
        {
            image: 'https://images.freekaamaal.com/store-images/3758.jpg',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          },
          {
            image: 'https://images.freekaamaal.com/store-images/3763.jpg',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          },
          {
            image:'https://images.freekaamaal.com/store-images/758.jpg',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          },
  
          {
            image: 'https://images.freekaamaal.com/store-images/3254.jpg',
            desc: 'Festive Sale - Up To 50% Off + Flat Rs.100 Cashback',
          },

      ];
    return(
        <View style={styles.couponListCon}>
            <View style={styles.couponListInner}>
                {
                    images.map((item, i)=> {
                        return <View style={styles.CouponsBox} key={i}>
                            <TouchableOpacity style={styles.clickContainer} onPress={()=> navigation.navigate('coupnsDetails')} >
                        <Image source={{uri: item.image}}  style={{ width: 92, height: 40, resizeMode: 'contain' }}/>
                        <Text style={styles.cpTxt}>{item.desc}</Text>
                        </TouchableOpacity>
                    </View>
                 
                     
                    })
                }
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    couponListCon: {
        marginTop: 20,
    },
    couponListInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        flexWrap: 'wrap',
    },
    CouponsBox: {
        width: '48%',
        borderColor: '#ccc',
        borderRadius: 9,
        borderWidth: 1,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginBottom: 15,
    },
    cpTxt: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 11,
        lineHeight: 18,
    },
    clickContainer: {
        justifyContent: 'space-between',
        alignItems: 'center', 
    }

})

export default TopCouponsList;
