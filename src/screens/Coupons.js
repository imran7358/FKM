import React, {useState, useEffect}from "react";
import axios from "axios";
import {View, Text, SafeAreaView, StyleSheet, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TrendingStore from "../components/TrendingStore";
import TrendingCoupons from "../components/TrendingCoupons";
import TopCouponsList from "../components/TopCopunsList";
import Config from 'react-native-config';
const END_URL = "/coupons/all-coupons";

const TopCoupons = ({navigation}) => {
  const [store, setFeturedStores] = useState([]);
  const [trending, setTrending] = useState([]);
  const [latetscoupons, setLatestCoupons] = useState([]);

  const getAllCouponsData = () => {
    axios.post(Config.API_URL + END_URL,{
      apiAuth: Config.API_AUTH,
      device_type: Config.DEVICE_TYPE,
    }).then(({data})=>{
      setFeturedStores(data.response.featured_stores);
      setTrending(data.response.trending_coupons);
      setLatestCoupons(data.response.latest_coupons);
    }).catch((error)=>{
      console.log(error);
    });
  };

  useEffect(()=>{
    getAllCouponsData();
  }, []);

    return (
       
            <ScrollView style={[styles.bgWhite,styles.srollCon]}>
            <View style ={styles.container}>
            <View style={styles.trendingCoupons}>
            <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Featured <Text style={{ fontWeight: '900' }}>Stores</Text></Text>
            </View>
          </View>
          <TrendingStore navigation = {navigation} featuredStore = {store}/>
            </View>
            <View style={styles.trendinCoupons}>
            <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Trending <Text style={{ fontWeight: '900' }}>Coupons</Text></Text>
            </View>
          </View>
          <TrendingCoupons navigation={navigation} latetscoupons = {latetscoupons}/>
        </View>

        <View style={styles.trendinCoupons}>
          <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Top <Text style={{ fontWeight: '900' }}>Coupons</Text></Text>
            </View>
          </View>
          <TopCouponsList navigation={navigation} couponlist={trending}/>
        </View>
      </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        flex: 1,
    },
    dealDay: {
        marginTop: 30,
      },
      headingArea: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      },
      topHeading: {
        fontSize: 20,
        marginLeft: 10,
      },
      hotSale: {
        width: 29,
        height: 29,
        resizeMode: 'contain',
      },
      bgWhite: {
        backgroundColor: '#fff'
      },
      trendinCoupons: {
    
      }
})
export default TopCoupons;
