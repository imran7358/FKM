import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = "/home/home";
import axios from 'axios';
import Loader from './Loader';


const AllDeals = ({ navigation }) => {

    const [deals, setDeals] = useState([]);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const [noData, setNoData] = useState('');

    const getAllDeals = () => {
        setLoader(true);
        axios.post(Config.API_URL + END_URL, {
            'apiAuth': Config.API_AUTH,
            'device_type': '',
            'sponsored_count': '1',
            page,
        }).then(({ data }) => {
               
            if (data.response.hotdeals && data.response.hotdeals.length) {
                setDeals([...deals, ...data.response.hotdeals]);
            }
            else {

                if (!data.response.hotdeals.length) {
                    setNoData('No records found!');
                }
                setLoadMore(false);
            }
        }).catch((error) => {
            console.log('Error', error);
        }).finally(() => {
            setLoader(false);
        });

    };


    useEffect(() => {
        getAllDeals();
    }, [page])
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.dealsContainer}>
                <View style={styles.productContainer}>
                    {
                        deals.length ? deals.map((item, i) => {
                            return <View style={styles.productBox} key={i}>
                                <TouchableOpacity onPress={() => navigation.navigate({ name: 'Details', params: { dealSlug: item.slug_url } })}>
                                    {
                                        item.is_cashback == '1' ?
                                        <View style={styles.cashback}>
                                            <Text style={styles.cbtxt}>Cashback</Text>
                                        </View>
                                        : null
                                    }

                                    <View style={styles.productImageCon}>
                                        <View style={styles.productImage}>
                                            <Image source={{ uri: item.deal_image }} style={{ height: 70, width: 70 }} />
                                        </View>
                                    </View>
                                    <View style={styles.brandLogo}>
                                        <Image source={{ uri: item.store_img_url }} style={{ height: 16, width: 55 }} />
                                    </View>
                                    <View style={styles.prodDescr}>
                                        <Text style={styles.prdLine} numberOfLines={2}>
                                            {item.title}
                                        </Text>

                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View style={styles.innerPrice}>
                                            <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage} />
                                            <Text style={styles.priceTxt}>{item.offer_price}</Text>
                                        </View>
                                        <View style={styles.innerPrice}>
                                            <Text style={styles.cutLine}></Text>
                                            <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage} />
                                            <Text style={[styles.priceTxt, styles.cutprice]}>{item.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }) : null
                    }
                    {
                        loader ?
                            <View style={styles.loadContainer}>
                                <Loader />
                            </View>
                            : null
                    }
                    {
                        <View style={styles.noData}>
                            <Text>{noData}</Text>
                        </View>
                    }
                </View>
                {
                    loadMore ?
                        <View style={styles.loaderContainer}>
                            <TouchableOpacity style={[styles.LoadMore, styles.padding]} onPress={() => setPage(page + 1)}>
                                <View>
                                    <Text style={styles.loadTxt}>Load More</Text>
                                </View>
                            </TouchableOpacity>
                        </View> : null
                }
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
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
});

export default AllDeals;
