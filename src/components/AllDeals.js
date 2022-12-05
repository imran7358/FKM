import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const AllDeals = ({navigation}) => {
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.dealsContainer}>
           <View style={styles.productContainer}>
                <View style={styles.productBox}>
                <TouchableOpacity onPress={()=> navigation.navigate('Details')}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    </View>
                  

                    <View style={styles.productBox}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.productBox}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.productBox}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.productBox}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.productBox}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.productBox}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.productBox}>
                    <View style={styles.productImageCon}>
                       <View  style={styles.productImage}>
                       <Image source={require('../assets/images/prod_image.png')} />
                       </View>
                    </View>
                    <View style={styles.brandLogo}>
                        <Image source={require('../assets/images/brandLogo.png')} />
                    </View>
                    <View style={styles.prodDescr}>
                        <Text style={styles.prdLine}>
                        Festive Sale - Up To 50% 
                        Off + Flat Rs.100 Cashback
                        </Text>

                    </View>
                    <View style={styles.priceContainer}>
                        <View style={styles.innerPrice}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={styles.priceTxt}>500</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            <Text style={styles.cutLine}></Text>
                        <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                            <Text style={[styles.priceTxt, styles.cutprice]}>500</Text>
                        </View>
                    </View>
                    </View>
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
        textAlign: 'left'
    },
    prodDescr: {
        fontSize:10,
        marginTop:10,
    },
    prdLine: {
        fontSize:12,
        lineHeight:18,
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
        fontSize: 19,
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

    }

});

export default AllDeals;
