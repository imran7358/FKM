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
import { Freshchat,FreshchatUser, FreshchatConfig } from 'react-native-freshchat-sdk';
import Config from 'react-native-config';
const END_URL = "/home/home";
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useSelector } from 'react-redux';
import { MessageCircle } from 'react-native-feather';
const Home = ({ navigation }) => {
  console.log(Config.API_URL)
  const [slider, setSlider] = useState([]);
  const [sticky, setSticky] = useState(null);
  const [livedeals, setLiveDeals] = useState([]);
  const [faq, setFaq] = useState([]);
  const [page, setpage] = useState(1);
  const [tab, setTab] = useState([])
  const [refresh, setReferesh] = useState(false)
  const [freshchatName, setFreshchatName] = useState('')
  const [freshchatEmail, setFreshchatEmail] = useState('')
  const [freshchatPhone, setFreshchatPhone] = useState('')
  const [freshchatUserId, setFreshchatUserId] = useState('')
  const isFocused = useIsFocused()
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const APP_ID = "bc9091b2-ecdf-4fc5-9eb5-525a67429bd9"
  const APP_KEY = "4ad29059-606d-486a-9e77-1c84b0191064"
  var freshchatConfig = new FreshchatConfig(APP_ID, APP_KEY);
  freshchatConfig.domain = "msdk.freshchat.com";
  freshchatConfig.teamMemberInfoVisible = true;
  freshchatConfig.cameraCaptureEnabled = true;
  freshchatConfig.gallerySelectionEnabled = true;
  freshchatConfig.responseExpectationEnabled = true;
  freshchatConfig.showNotificationBanner = true; //iOS only
  freshchatConfig.notificationSoundEnabled = true; //iOS only
  freshchatConfig.themeName = "CustomTheme.plist"; //iOS only
  freshchatConfig.stringsBundle = "FCCustomLocalizable"; //iOS only
  Freshchat.init(freshchatConfig);
  var freshchatUser = new FreshchatUser();
  freshchatUser.firstName = freshchatName;
  freshchatUser.email = freshchatEmail;
  freshchatUser.phone = freshchatPhone;
  freshchatUser.identifyUser = freshchatUserId;
  Freshchat.setUser(freshchatUser, (error) => {
      console.log(error);
  });
  const onRefresh = useCallback(() => {
    setReferesh(true);
    setTimeout(() => {
      getSlider(); 
      
        setReferesh(false);
    }, 2000);
  }, []);

  const freshchatHandle = () => {
    if(userInfo!='')
    {
      Freshchat.showFAQs();
      Freshchat.showConversations();
    }
      else{
        Alert.alert('not loggedin')
      }
        
  };

  const getSlider = () => {
    axios.post(Config.API_URL + END_URL, {
      'sponsored_count': '0',
      'apiAuth': Config.API_AUTH,
      'device_type': 4,
      page,
    }, {
      headers: {
        Authorization: userToken,
    },
    }).then(({ data }) => {
      if(data.userdata.login=='1')
      {
      setFreshchatEmail(data.userdata.email)
      setFreshchatPhone(data.userdata.phone)
      setFreshchatName(data.userdata.title)
      setFreshchatUserId(data.userdata.uid)
      }
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
    // console.log('onload',freshchatUser)
    console.log('complete url',Config.API_URL + END_URL)
    console.log('userInfo',userInfo.username)
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

        <View style={[styles.mainContainer, styles.paddingZero, styles.margin20]}>
          <FAQ/>
        </View>
      </ScrollView>
      
      {
        userInfo && userInfo ?
      <TouchableOpacity onPress={freshchatHandle}>
      <View style={[styles.floatButton, styles.buttonShadow]}>
       <MessageCircle color="#fff" width={35} height={35} />
      </View>
      </TouchableOpacity>
       : ""
      }
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
  floatButton:{

    position:'absolute',
    right:20,
    zIndex:9999,
    bottom:60,
    width:65,
    height:65,
    alignContent:'center',
    display:'flex',
    justifyContent:'center',
    borderRadius:50,
    backgroundColor:'#f27935',
    alignItems:'center'
  },
  buttonShadow:{
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    width:'100%',
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
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    padding:20,
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
