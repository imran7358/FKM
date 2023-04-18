import React from "react";
import { View, StyleSheet, Linking} from "react-native";
import { FlatList, TouchableOpacity} from "react-native-gesture-handler";
import {FlatListSlider, indicatorContainerStyle} from 'react-native-flatlist-slider';
import Coupons from "./CouponsList";

const TrendingCoupons = ({navigation,latetscoupons}) => {
    return(
      latetscoupons.length ?
    <FlatListSlider
    data={latetscoupons}
    component={<Coupons />}
    imageKey={'img_url'}
    loop={false}
    width={86}
    indicator={false}
    autoscroll ={false}
   
    onPress={async(item) => navigation.navigate('coupnsDetails',{couponId: item.couponid })} 
  />
  : null
    )

}

const styles = StyleSheet.create({
    trendingCp: {
      width: 130,
      paddingVertical: 0,
      marginRight: 15,
      borderRadius: 6,
      marginTop: 20,
      height: 90,
      borderColor: '#ccc',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoPreview: {
      width: 72,
      height: 30,
      borderRadius: 8,
      resizeMode: 'contain',
    },
  
    liveDealsCon: {
      backgroundColor: 'red',
    },
    dealDiscription: {
     padding: 10,
     paddingLeft: 15,
     paddingRight: 15,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 8,
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
  
  },
  liveViewer: {
      position: 'absolute',
      width:130,
      height: 90,
      backgroundColor: '#F27935',
      borderRadius: 3,
      zIndex: 999,
      top: 20,
      left: 20,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.85,
  },
  viewTxt: {
  fontWeight: '900',
  color: '#fff',
  },
  view: {
      fontWeight: '500',
  }
  });
  


export default TrendingCoupons;
