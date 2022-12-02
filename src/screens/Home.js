import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../components/Header';
import DealsDay from '../components/dealDay';
import MianSlider from '../components/MainSlider';
import LiveDeals from '../components/LiveDeals';
import AllDeals from '../components/AllDeals';
import StoreList from '../components/StoreTab';
import LoadMore from '../components/LoadMore';
import MyStore from '../components/StoreList';
import VideoPlayer from '../components/Video';
import FAQ from '../components/Faq';

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Header navigation={navigation} />
      </View>
      <ScrollView style={styles.bgWhite}>
        <View style={styles.mainWrapper}>
          <View style={styles.mainSlider}>
            <MianSlider />
          </View>
          <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Deals <Text style={{ fontWeight: '900' }}>of the Day</Text></Text>
            </View>
            <DealsDay />
          </View>
          <View style={styles.liveDeals}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/liveDeals.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Live <Text style={{ fontWeight: '900' }}>Deals</Text></Text>
            </View>
            <LiveDeals />
          </View>
          <View style={styles.hotDealWrapper}>
            <View style={styles.dealDay}>
              <View style={styles.HotDealsInner}>
                <View style={styles.headingArea}>
                  <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
                  <Text style={styles.topHeading}>Hot<Text style={{ fontWeight: '900' }}> Deals</Text></Text>
                </View>
                <Text>View All</Text>
              </View>
              <AllDeals style={styles.margin20} navigation={navigation} />
              <View style={styles.loadmoreCont}>
                <LoadMore />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cbStoreCon}>
          <View style={[styles.dealDay, styles.commonPadd]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Cashback <Text style={{ fontWeight: '900' }}>Store</Text></Text>
            </View>
          </View>
          <View style={styles.storeCat}>
            <View style={styles.storeList}>
              <ScrollView horizontal>
                <StoreList />
              </ScrollView>
            </View>
            <View style={[styles.storCon, styles.commonPadd]}>
                <View style={styles.catStore}>
                <MyStore />
                </View>
            </View>
            <View style={styles.loadmoreCont}>
                <LoadMore />
              </View>
          </View>
        </View>
        <View style={styles.mainContainer}>
        <View style={styles.hotDealWrapper}>
            <View style={styles.dealDay}>
              <View style={styles.HotDealsInner}>
                <View style={styles.headingArea}>
                  <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
                  <Text style={styles.topHeading}>How to Earn<Text style={{ fontWeight: '900' }}> Cashback?</Text></Text>
                </View>
              </View>
           <View style={styles.videoContainer}>
            <Text>Video</Text>
           </View>
            </View>
          </View>
          </View>


          <View style={[styles.mainContainer, styles.paddingZero]}>
          <FAQ />
          </View>
         
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 10,
    padding: 24,
    paddingBottom: 0,
  },
  mainContainer: {
    padding: 24,
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  commonPadd: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  margin20: {
    marginTop: 30,
  },

  mainSlider: {
    backgroundColor: 'grey',
    borderColor: '#6666',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
  },
  liveDeals: {
    marginTop: 0,
  },
  dealDay: {
    marginTop: 30,
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
    fontSize: 20,
    marginLeft: 10,
  },
  HotDealsInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  marginZero: {
    marginTop: 0,
  },
  storeList: {
    backgroundColor: '#FFE2D1',
    paddingLeft: 24,
    paddingRight: 24,
    padding: 10,
    marginTop: 20,
  },
  loadmoreCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  storCon: {
    paddingTop: 24,
    backgroundColor: '#F8F8F8',
  },
  catStore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  videoContainer: {
    backgroundColor: '#F7F7F7',
    height: 150,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingZero: {
    paddingTop: 0,
  },
});
export default Home;
