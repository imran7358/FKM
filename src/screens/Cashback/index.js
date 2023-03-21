import axios from "axios";
import React from "react";
import { View, Text,  StyleSheet, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Config from "react-native-config";
const END_URL = '/cashback/cashbackpage';
import { useEffect, useState} from "react";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/Loader";
import Deals from "./Deals";
import Stores from "./Store";

const AllCashback = ({navigation})=> {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                
          <View style={[styles.dealDay, styles.storeCon]} >
            <View style={styles.headTop}>
            <View style={styles.headingArea}>
              <Image source={require('../../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Cashback <Text style={{ fontWeight: '800' }}>Store</Text></Text>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate("AllCashbackStores")}><Text>View All</Text></TouchableOpacity>
            </View>
            <View style ={styles.cashbackDeals}>
               <Stores navigation={navigation}/>
            </View>
          </View>
          <View style={[styles.dealDay]}>
            <View style={styles.headTop}>
            <View style={styles.headingArea}>
              <Image source={require('../../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Cashback <Text style={{ fontWeight: '800' }}>Deals</Text></Text>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate("CashbackDeals")}><Text>View All</Text></TouchableOpacity>
            </View>
            <View style ={styles.cashbackDeals}>
                <Deals navigation={navigation}/>
            </View>
          </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    storeCon: {
        marginTop:30,
    },
      headingArea: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      },
      headTop: {
        display:'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      },
      hotSale: {
        width: 29,
        height: 29,
        resizeMode: 'contain',
      },
      topHeading: {
        fontSize: 18,
        marginLeft: 10,
      },
      loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cbtxt:{
        color: '#fff',
        fontSize: 12,
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
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dealsContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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
    noData: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 20,
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
    LoadMore: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f27935',
        borderWidth: 1,
        paddingHorizontal:30,
        paddingVertical: 15,


    },
    loadTxt: {
        fontWeight: 'bold',
        color: '#f27935',
        fontSize: 16,
        textTransform: 'uppercase',
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
  
})

export default AllCashback;
