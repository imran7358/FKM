import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TopCouponsList = ({ navigation, couponlist }) => {

    return (
        couponlist.length ?
            <View style={styles.couponListCon}>
                <View style={styles.couponListInner}>
                    {
                        couponlist.map((item, i) => {
                            return <View style={styles.CouponsBox} key={i}>
                                <TouchableOpacity style={styles.clickContainer} onPress={() => navigation.navigate('coupnsDetails',{couponId: item.couponid })} >
                                    <Image source={{ uri: item.img_url }} style={{ width: 92, height: 40, resizeMode: 'contain' }} />
                                    <Text style={styles.cpTxt}>{item.description}</Text>
                                </TouchableOpacity>
                            </View>
                        })
                    }
                </View>
            </View>
            : null
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
        color:'black',
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
