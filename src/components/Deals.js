import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button} from 'react-native';

const Deals = ({deals, navigation, route}) => {
    return (
        <View style={styles.dealsContainer}>
           <View style={styles.productContainer}>

            {
                deals.length ? deals.map((item, i)=> {
                    return <View style={styles.productBox} key={i}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={{uri: item.deal_image}}  style={styles.dealImage}/>
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={{uri: item. store_img_url}} style={styles.storeImg}/>
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                            {item.deal_title}
                        </Text>
    
                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>{item.offer_price}</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>{item.price}</Text>
                        </View>
                    </View>
                    </View>
                })
                : <Text>Loading...</Text>
            }
                
                   

           </View>
        </View>
    )

}

const styles = StyleSheet.create({
    dealsContainer: {
        padding: 24, 
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
        padding: 20,
        borderRadius: 9,
        borderColor: '#EDEDED',
        borderWidth: 1,
        marginBottom: 15

    },
    productImage: {
        width: 100,
        height: 100,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImageCon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandLogo: {
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        marginTop: 20,
        textAlign: 'left',
    },
    prodDescr: {
        fontSize:10,
        marginTop:10,
    },
    prdLine: {
        fontSize:10,
        lineHeight:15,
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
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    priceTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 3,
    },
    cutprice: {
        color: '#888888',
    },
    cutLine: {
        position: 'absolute',
        width: '100%',
        height:2,
        backgroundColor: '#f27935',

    },
    dealImage: {
        width: 67,
        height: 67,
        resizeMode: 'contain',
    },
    storeImg: {
        width: 56,
        height: 14,
        resizeMode: 'cover',
    }

});

export default Deals;
