import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { centerContainer } from '../assets/styles/common';
import axios from 'axios';
import Loader from '../components/Loader';
import Config from 'react-native-config';
const END_URL = '/category/all-category';
import request from '../utils/request';

const ProductCategories = ({ navigation }) => {
  console.log(Config.API_URL)
  const [categories, allCategrioes] = useState([]);
  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = () => {
    request.post(navigation,Config.API_URL + END_URL, {
      apiAuth: Config.API_AUTH,
      deviceType: '4',
    }).then(({ data }) => {
      allCategrioes((data.response.allcategory));
    }).catch((error) => {
      console.log(error);
    });
  }
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.productList}>
            {
              categories.length ? categories.map((item, i) => {
                return <View style={styles.productBox} key={i}>
                  <View style={styles.catImage}>
                    <Image source={{ uri: item.img_url }} style={{ height: 67, width: 67 }} />
                  </View>
                  <Text style={styles.catHeading}>{item.name}</Text>
                  <View style={styles.dealNum}>
                    <View style={styles.dealsInfo}>
                      {/* <Text style={[styles.dealsSize, styles.couponColor]}>Deals</Text> */}
                      {/* <Text style={[styles.dealNumber, styles.dealsSize, styles.marginLeft10]}>{item.deals_count}</Text> */}
                    </View>
                    <View style={styles.dealsInfo}>
                      {/* <Text style={[styles.dealsSize, styles.couponColor]}>Coupons</Text> */}
                      {/* <Text style={[styles.dealNumber, styles.dealsSize, styles.marginLeft10]}>{item.coupons_count}</Text> */}
                    </View>
                  </View>
                  <View style={styles.viewDetails}>
                    <TouchableOpacity onPress={() => navigation.navigate({ name: 'CategoryDetails', params: { catSlug: item.cate_slug}})}>
                      <Text style={styles.viewDetailsBtn}>View Deals</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              })
                :
                <Loader />
            }

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
    textAlign: 'center',
  },
  dealNum: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  dealsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginRight: 7,
  },
  couponColor: {
    color: '#525252',
  },
  dealsSize: {
    fontSize: 10,
  },
  dealNumber: {
    fontWeight: 'bold',
    fontSize: 10,
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
    fontSize: 15,
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default ProductCategories;
