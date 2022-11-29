import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {centerContainer} from '../assets/styles/common';

const ProductCategories = () => {
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.productList}>
                        <View style={styles.productBox}>
                            <View style={styles.catImage}>
                                <Image source={require('../assets/images/automobile.png')}/>
                            </View>
                            <Text style={styles.catHeading}>Automobile</Text>
                            <View style={styles.dealNum}>
                                <View style={styles.dealsInfo}>
                                    <Text style={[styles.dealsSize,styles.couponColor]}>Deals</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                     </View>
                                <View style={styles.dealsInfo}>
                                <Text style={[styles.dealsSize,styles.couponColor]}>Coupons</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                    </View>
                            </View>
                            <View style={styles.viewDetails}>
                                <Text style={styles.viewDetailsBtn}>View Deals</Text>
                            </View>
                        </View>
                        <View style={styles.productBox}>
                            <View style={styles.catImage}>
                                <Image source={require('../assets/images/automobile.png')}/>
                            </View>
                            <Text style={styles.catHeading}>Automobile</Text>
                            <View style={styles.dealNum}>
                                <View style={styles.dealsInfo}>
                                    <Text style={[styles.dealsSize,styles.couponColor]}>Deals</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                     </View>
                                <View style={styles.dealsInfo}>
                                <Text style={[styles.dealsSize,styles.couponColor]}>Coupons</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                    </View>
                            </View>
                            <View style={styles.viewDetails}>
                                <Text style={styles.viewDetailsBtn}>View Deals</Text>
                            </View>
                        </View>
                        <View style={styles.productBox}>
                            <View style={styles.catImage}>
                                <Image source={require('../assets/images/automobile.png')}/>
                            </View>
                            <Text style={styles.catHeading}>Automobile</Text>
                            <View style={styles.dealNum}>
                                <View style={styles.dealsInfo}>
                                    <Text style={[styles.dealsSize,styles.couponColor]}>Deals</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                     </View>
                                <View style={styles.dealsInfo}>
                                <Text style={[styles.dealsSize,styles.couponColor]}>Coupons</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                    </View>
                            </View>
                            <View style={styles.viewDetails}>
                                <Text style={styles.viewDetailsBtn}>View Deals</Text>
                            </View>
                        </View>
                        <View style={styles.productBox}>
                            <View style={styles.catImage}>
                                <Image source={require('../assets/images/automobile.png')}/>
                            </View>
                            <Text style={styles.catHeading}>Automobile</Text>
                            <View style={styles.dealNum}>
                                <View style={styles.dealsInfo}>
                                    <Text style={[styles.dealsSize,styles.couponColor]}>Deals</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                     </View>
                                <View style={styles.dealsInfo}>
                                <Text style={[styles.dealsSize,styles.couponColor]}>Coupons</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                    </View>
                            </View>
                            <View style={styles.viewDetails}>
                                <Text style={styles.viewDetailsBtn}>View Deals</Text>
                            </View>
                        </View>
                        <View style={styles.productBox}>
                            <View style={styles.catImage}>
                                <Image source={require('../assets/images/automobile.png')}/>
                            </View>
                            <Text style={styles.catHeading}>Automobile</Text>
                            <View style={styles.dealNum}>
                                <View style={styles.dealsInfo}>
                                    <Text style={[styles.dealsSize,styles.couponColor]}>Deals</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                     </View>
                                <View style={styles.dealsInfo}>
                                <Text style={[styles.dealsSize,styles.couponColor]}>Coupons</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                    </View>
                            </View>
                            <View style={styles.viewDetails}>
                                <Text style={styles.viewDetailsBtn}>View Deals</Text>
                            </View>
                        </View>
                        <View style={styles.productBox}>
                            <View style={styles.catImage}>
                                <Image source={require('../assets/images/automobile.png')}/>
                            </View>
                            <Text style={styles.catHeading}>Automobile</Text>
                            <View style={styles.dealNum}>
                                <View style={styles.dealsInfo}>
                                    <Text style={[styles.dealsSize,styles.couponColor]}>Deals</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                     </View>
                                <View style={styles.dealsInfo}>
                                <Text style={[styles.dealsSize,styles.couponColor]}>Coupons</Text>
                                     <Text style={[styles.dealNumber,styles.dealsSize,styles.marginLeft10]}>100</Text>
                                    </View>
                            </View>
                            <View style={styles.viewDetails}>
                                <Text style={styles.viewDetailsBtn}>View Deals</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

};
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  imageContainer: {
    alignItems: centerContainer.alignCenter,
  },

  loginButton: {
    alignItems: centerContainer.alignCenter,
    justifyContent: centerContainer.justifyCenter,
    backgroundColor: '#F27935',
    padding: 10,
    marginTop: 30,
    borderRadius: 6,
    fontWeight: 'bold',
    height: 50,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productBox: {
    width: '48%',
    backgroundColor: '#F7F7F7',
    padding: 25,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  catImage: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 9,
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  catHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
  },
  dealNum: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  dealsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  couponColor: {
    color: '#525252',
  },
  dealsSize: {
    fontSize: 11,
  },
  dealNumber: {
    fontWeight: 'bold',
  },
  marginLeft10: {
    marginLeft: 1.5,
  },
  viewDetails: {
    borderWidth: 1,
    borderColor: '#f27935',
    borderRadius: 6,
    color: '#f27935',
    width: '100%',
    marginTop: 15,
  },
  viewDetailsBtn: {
    color: '#f27935',
    fontWeight: '600',
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default ProductCategories;
