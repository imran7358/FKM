import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Coupons from '../components/Coupons';
import Deals from '../components/Deals';
import Config from 'react-native-config';

const CategoryDetails = ({ navigation, route }) => {

  const [deals, setShowDeals] = useState(true);
  const [coupons, setShowCoupons] = useState(false);
  const [catDetails, setCatDetails] = useState({
    catImg:'',
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
    axios.post("https://fkmdata.freekaamaal.com/category/category-detail", {
      "page": "1",
      "apiAuth": Config.API_AUTH,
      "cate_slug": route.params.catSlug,
      "option": opt,
    }).then(({ data }) => {
      if (opt == "") {
          setCatDetails({
            catImg: data.response.category.cate_img_url,
            name: data.response.category.name,
            description: data.response.category.description,
          })
        setCatDeals(data.response.deals);
      } else if (opt == "coupons") {
        setCatCoupons(data.response.coupons);
      } else {
        setCatDeals(data.response.deals);
      }
    });
  }, [opt, route.params.catSlug]);
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <ScrollView>
        <View style={styles.cardDetailsCon}>
          <View style={[styles.container, styles.catDetails]}>
            <View style={styles.catDetails}>
              <View style={styles.detailsIcon}>
                <Image source={{uri: catDetails.catImg}} style={styles.catImg}/>
              </View>
              <View style={styles.catInfo}>
                <Text style={styles.catHeading}>{catDetails.name}</Text>
                <Text style={styles.catPara}>{catDetails.description}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.catDeals}>
          <View style={styles.tabList}>
            <TouchableOpacity onPress={showDeals} style={styles.tabContainer}>
              <View style={deals ? [styles.tab, styles.activeTab] : [styles.tab]} ><Text style={deals ? styles.activText : styles.mayTab}>Deals <Text>(10)</Text></Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={showCoupons} style={styles.tabContainer}>
              <View style={coupons ? [styles.tab, styles.coupnActiveTab] : [styles.tab]}><Text style={coupons ? styles.activText : styles.mayTab}>Coupons <Text>(20)</Text></Text></View>
            </TouchableOpacity>
          </View>
        </View>
        {
          deals ?

            <Deals deals = {catDeals}/>

            : null
        }

        {
          coupons ?

            <Coupons coupons = {catCoupons}/>

            : null
        }


      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
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
  catImg:{
    width: 58,
    height: 58,
    resizeMode: 'contain',
  }
});


export default CategoryDetails;
