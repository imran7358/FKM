import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const RealtedDeals = ({ navigation, relatedProduct }) => {

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.dealsContainer}>
                <View style={[styles.dealDay]}>
                    <View style={styles.headingArea}>
                        <Image source={require('../../assets/images/hot-sale.png')} style={styles.hotSale} />
                        <Text style={styles.topHeading}>Related<Text style={{ fontWeight: '800' }}> Deals</Text></Text>
                    </View>
                </View>
                <View style={styles.productContainer}>

                    {
                        relatedProduct.length ? relatedProduct.map((item, i) => {
                            return <View style={styles.productBox} key={i}>
                                <TouchableOpacity onPress={() => {
                                    navigation.push('Details', { dealSlug: item.slug_url })
                                }}>
                                     {
                                        item.is_cashback == '1' ?
                                        <View style={styles.cashback}>
                                            <Text style={styles.cbtxt}>Cashback</Text>
                                        </View>
                                        : null
                                    }
                                    <View style={styles.productImageCon}>
                                        <View style={styles.productImage}>
                                            <Image source={{ uri: item.deal_image }} style={{ height: 70, width: 70 }} />
                                        </View>
                                    </View>
                                    <View style={styles.brandLogo}>
                                        <Image source={{ uri: item.store_img_url }} style={{ height: 16, width: 55 }} />
                                    </View>
                                    <View style={styles.prodDescr}>
                                        <Text style={styles.prdLine} numberOfLines={2}>
                                            {item.title}
                                        </Text>

                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View style={styles.innerPrice}>
                                            <Image source={require('../../assets/images/rupee-icon.png')} style={styles.rpImage} />
                                            <Text style={styles.priceTxt}>{item.offer_price}</Text>
                                        </View>
                                        <View style={styles.innerPrice}>
                                            <Text style={styles.cutLine}></Text>
                                            <Image source={require('../../assets/images/grey-rupee-icon.png')} style={styles.rpImage} />
                                            <Text style={[styles.priceTxt, styles.cutprice]}>{item.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }) : null
                    }

                </View>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    dealsContainer: {

    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    productBox: {
        width: '47%',
        backgroundColor: '#F7F7F7',
        padding: 15,
        borderRadius: 9,
        borderColor: '#EDEDED',
        borderWidth: 1,
        marginBottom: 15,
        position: 'relative',

    },
    productImage: {
        width: 100,
        height: 100,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 9,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    productImageCon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandLogo: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        textAlign: 'left'
    },
    prodDescr: {
        fontSize: 10,
        marginTop: 10,
    },
    prdLine: {
        color:'black',
        fontSize: 11,
        lineHeight: 18,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    innerPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    rpImage: {
        width: 11,
        height: 11,
        resizeMode: 'contain',
    },
    priceTxt: {
        color:'black',
        fontSize: 15,
        fontWeight: '800',
        marginLeft: 3,
    },
    cutprice: {
        color: '#888888',
    },
    cutLine: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: '#f27935',

    },
    dealDay: {
        marginTop: 30,
        marginBottom: 20,
    },
    headingArea: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    hotSale: {
        width: 29,
        height: 29,
        resizeMode: 'contain',
    },
    topHeading: {
        color:'black',
        fontSize: 18,
        marginLeft: 10,
    },
    cashback: {
        backgroundColor: '#f27935',
        borderRadius:3,
       paddingHorizontal: 7,
        position:'absolute',
        zIndex: 999,
        paddingVertical: 4,
        right:0,
        opacity: 0.8,
    },
    cbtxt:{
        color: '#fff',
        fontSize: 12,
    },

});

export default RealtedDeals;
