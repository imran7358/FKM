import React from "react";
import {View, Text, SafeAreaView, StyleSheet, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TrendingStore from "../components/TrendingStore";
import TrendingCoupons from "../components/TrendingCoupons";
import TopCouponsList from "../components/TopCopunsList";

const TopCoupons = ({navigation}) => {

    return (
       
            <ScrollView style={[styles.bgWhite,styles.srollCon]}>
            <View style ={styles.container}>
            <View style={styles.trendingCoupons}>
            <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Deals <Text style={{ fontWeight: '900' }}>of the Day</Text></Text>
            </View>
          </View>
          <TrendingStore />
            </View>
            <View style={styles.trendinCoupons}>
            <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Trending <Text style={{ fontWeight: '900' }}>Coupons</Text></Text>
            </View>
          </View>
          <TrendingCoupons />
        </View>

        <View style={styles.trendinCoupons}>
          <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Top <Text style={{ fontWeight: '900' }}>Coupons</Text></Text>
            </View>
          </View>
          <TopCouponsList navigation={navigation} />
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
