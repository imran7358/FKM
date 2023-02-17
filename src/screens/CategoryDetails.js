
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Coupons from '../components/Coupons/CategoryCoupons';
import Config from 'react-native-config';
import CategoriesDeals from '../components/Deals/CategoryDeals';
const END_URL = '/category/category-detail';
import Loader from '../components/Loader';

const CategoryDetails = ({ navigation, route }) => {

  const [deals, setShowDeals] = useState(true);
  const [coupons, setShowCoupons] = useState(false);
  const [page, setPage] = useState(1);
  const [readMore, setReadMore] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [noData, setNoData] = useState('');
  const [catDetails, setCatDetails] = useState({
    catImg: null,
    name: '',
    description: '',
  });
  const [opt, setOpt] = useState('');
  const [catDeals, setCatDeals] = useState([]);
  const [catCoupons, setCatCoupons] = useState([]);

  const showDeals = () => {
    setShowDeals(true);
    setShowCoupons(false);
    setOpt('deals');
  };

  const showCoupons = () => {
    setShowCoupons(true);
    setShowDeals(false);
    setOpt('coupons');
  };

  useEffect(() => {
    setLoader(true);
    axios.post(Config.API_URL + END_URL, {
      page,
      "apiAuth": Config.API_AUTH,
      "cate_slug": route.params.catSlug,
      "option": opt,
    }).then(({ data }) => {
      if (opt == "") {
        const regex = /(<([^>]+)>)/ig;
        const result = data.response.category.description.replace(regex, '');
        setCatDetails({
          catImg: data.response.category.cate_img_url,
          name: data.response.category.name,
          description: result,
        });
        if (data.response.deals && data.response.deals.length){
          setCatDeals([...catDeals, ...data.response.deals]);
        }
      } else if (opt == "coupons") {
        setCatCoupons([...catCoupons, ...data.response.coupons]);
      } else {
        if (!data.response.deals.length){
          setNoData('No records found !');
          setLoadMore(false);
        }
        // setCatDeals([...catDeals, ...data.response.deals]);
      }
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setLoader(false);
    })
    console.log('page', page);
    console.log('option', opt)
  }, [opt, route.params.catSlug, page]);
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <ScrollView>
        <View style={styles.cardDetailsCon}>
          <View style={[styles.container, styles.catDetails]}>
            <View style={styles.catDetails}>
              <View style={styles.detailsIcon}>
                <Image source={{ uri: catDetails.catImg }} style={styles.catImg} />
              </View>
              <View style={styles.catInfo}>
                <Text style={styles.catHeading}>{catDetails.name}</Text>
                <Text style={styles.catPara}>{readMore ? catDetails.description.substring(0, 200) : catDetails.description}</Text>
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => setReadMore(!readMore)}>
                  <View style={styles.readMore}>
                    {
                      readMore ? <Image source={require('../assets/images/downArrow.png')} style={styles.readArrow} /> : <Image source={require('../assets/images/downArrow.png')} style={[styles.readArrow, styles.arrowTransform]} />
                    }
                  </View>
                </TouchableHighlight>

              </View>
            </View>
          </View>
        </View>
        <View style={styles.catDeals}>
          <View style={styles.tabList}>
            <TouchableOpacity onPress={showDeals} style={styles.tabContainer}>
              <View style={deals ? [styles.tab, styles.activeTab] : [styles.tab]} ><Text style={deals ? styles.activText : styles.mayTab}>Deals</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={showCoupons} style={styles.tabContainer}>
              <View style={coupons ? [styles.tab, styles.coupnActiveTab] : [styles.tab]}><Text style={coupons ? styles.activText : styles.mayTab}>Coupons</Text></View>
            </TouchableOpacity>
          </View>
        </View>
        {
          deals ?

            <CategoriesDeals deals={catDeals} navigation={navigation} route={route.params.catSlug}/>

            : null
        }

        {
          coupons ?

            <Coupons couponsList={catCoupons} navigation={navigation} route={route.params.catSlug}/>

            : null
        }

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  loadeMoreCon: {paddingLeft: 20,paddingRight:20},
  cardDetailsCon: {
    backgroundColor: '#F7F7F7',
    paddingTop: 20,
  },
  tabContainer: {
    width: '50%',
  },
  mayTab: {
    fontSize: 14,
    color: '#333',
  },
  tab: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    fontSize: 14,
  },
  mainWrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  activeTab: {
    fontWeight: 'bold',
    backgroundColor: '#f27935',
    borderTopLeftRadius: 45,
    borderBottomLeftRadius: 45,
  },
  coupnActiveTab: {
    fontWeight: 'bold',
    backgroundColor: '#f27935',
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
  },
  activText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  catDetails: {
    backgroundColor: '#fff',
    marginTop: 50,
    marginBottom: 1,
    position: 'relative',
  },
  detailsIcon: {
    position: 'absolute',
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: -110,
    left: 130,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  catInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  catHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  catPara: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  catDeals: {
    padding: 24,
    backgroundColor: '#fff',
  },
  tabList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f27935',
    borderRadius: 45,
  },
  catImg: {
    width: 58,
    height: 58,
    resizeMode: 'contain',
  },
  readMore: {
    backgroundColor: '#f27935',
    height: 38,
    width: 38,
    borderRadius: 45,
    marginTop: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  readArrow: {
    width: 20,
    height: 20,
  },
  arrowTransform: {
    transform: [{ rotate: '180deg' }]
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F27935',
    padding: 10,
    marginTop: 30,
    borderRadius: 6,
    fontWeight: 'bold',
    height: 50,
},
loginTxt: {
    fontWeight: '900',
    color: '#fff',
},
loadContainer: {
  marginTop: 50,
  marginBottom: 50,
},
noData: {
  alignContent: 'center',
  alignItems: 'center',
  margin: 20,
},
});


export default CategoryDetails;
