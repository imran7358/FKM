import React, { useState, useEffect, useCallback} from 'react';
import { View, Text,Alert, SafeAreaView, StyleSheet, Image, TouchableOpacity, RefreshControl} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
import { useIsFocused } from '@react-navigation/native';
import Config from 'react-native-config';
const END_URL = "/home/home";
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';
const Home = ({ navigation }) => {
  const [slider, setSlider] = useState([]);
  const [sticky, setSticky] = useState(null);
  const [livedeals, setLiveDeals] = useState([]);
  const [faq, setFaq] = useState([]);
  const [page, setpage] = useState(1);
  const [tab, setTab] = useState([])
  const [refresh, setReferesh] = useState(false)
  const isFocused = useIsFocused()
  const onRefresh = useCallback(() => {
    setReferesh(true);
    setTimeout(() => {
      getSlider(); 
      // Alert.alert('okay');
        setReferesh(false);
    }, 2000);
  }, []);

  const getSlider = () => {
    axios.post(Config.API_URL + END_URL, {
      'sponsored_count': '0',
      'apiAuth': Config.API_AUTH,
      'device_type': 4,
      page,
    }).then(({ data }) => {
      setSlider(data.response.slider);
      setSticky(data.response.sticky);
      setLiveDeals(data.response.live_deals);
      setFaq(data.response.earn_cashback);
      setTab(data.response.store_tabbing);
    }).catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    getSlider();
  }, []);
  
  useEffect(() => {
    isFocused ?  getSlider() : null
  }, [isFocused]);
  return (
    <SafeAreaView style={{backgroundColor:'#f27935'}}>
      <View>
        <Header navigation={navigation} />
      </View>
      <ScrollView style={styles.bgWhite} refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
        <View style={styles.mainWrapper}>
          <View style={styles.mainSlider}>
            <MianSlider navigation={navigation} slideImage={slider} />
          </View>
         {
            sticky?.length ?  <View style={[styles.dealDay]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Deals <Text style={{ fontWeight: '800' }}>of the Day</Text></Text>
            </View>
            <DealsDay stickyImages={sticky} navigation={navigation} />
          </View> : null
         }
          {
            livedeals?.length ? <View style={styles.liveDeals}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/liveDeals.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Live <Text style={{ fontWeight: '800' }}>Deals</Text></Text>
            </View>
            <LiveDeals navigation={navigation} livedeals={livedeals} />
          </View> : null
          }
          <View style={styles.hotDealWrapper}>
            <View style={styles.dealDay}>
              <View style={styles.HotDealsInner}>
                <View style={styles.headingArea}>
                  <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
                  <Text style={styles.topHeading}>Hot<Text style={{ fontWeight: '800' }}> Deals</Text></Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('DealList')}>
                  <Text>View All</Text>
                </TouchableOpacity>
              </View>
              <AllDeals style={styles.margin20} navigation={navigation} />

            </View>
          </View>
        </View>
        <View style={styles.cbStoreCon}>
          <View style={[styles.dealDay, styles.commonPadd]}>
            <View style={styles.headingArea}>
              <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
              <Text style={styles.topHeading}>Cashback <Text style={{ fontWeight: '800' }}>Store</Text></Text>
            </View>
          </View>
          <View style={styles.storeCat}>
                <MyStore navigation={navigation} />
          </View>
        </View>

        <View style={[styles.mainContainer, styles.paddingZero, styles.margin20, styles.marginBottom50]}>
          <FAQ/>
        </View>
        <View>
        <YoutubeIframe style={styles.videoContainer}
        videoId='hkStK-PBO_k'
        height={450}
        width = {380}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 20,
    paddingLeft:20,
    paddingRight:20,
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
    height: 210,
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
    fontSize: 18,
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

  videoContainer: {
    backgroundColor: '#F7F7F7',
    height: 150,
    marginLeft:10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingZero: {
    paddingTop: 0,
  },
  marginBottom50: {
    marginBottom:50,
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
},
btTxt: {
    color: '#333',
    fontSize: 14,
},
activeTab: {
    color: '#F27935',
    fontWeight: '900',
    borderColor: '#f27935',
    borderBottomWidth: 1,
    backgroundColor: 'red',
},
});
export default Home;
