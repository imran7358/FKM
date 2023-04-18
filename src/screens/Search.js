import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Config from "react-native-config";
import axios from "axios";
import { useState, useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
const END_URL = "/search/search"
import Loader from "../components/Loader";
import { useSelector } from "react-redux";


const SearchPage = ({ route, navigation }) => {
    const [store, setStore] = useState({});
    const [deals, setDeals] = useState({});
    const [loadMore, setLoadMore] = useState(false);
    const [loader, setLoader] = useState(false);



    useEffect(() => {
       
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            'keyword': route.params.searchKeyword,
        }).then(({ data }) => {
            setStore(data.response.store);
            setDeals(data.response.deals);
        }).catch((error) => {
            console.log(error);
        });
    }, [route.params.searchKeyword]);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                { }
                <View style={[styles.dealDay]}>
                    <View style={styles.headingArea}>
                        <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
                        <Text style={styles.topHeading}><Text style={{ fontWeight: '800' }}>All Deals</Text></Text>
                    </View>
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
                                                    <Image source={{ uri: item.img_url }} style={{ height: 70, width: 70 }} />
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
                                }) : <View style={styles.noDataFound}>
                                    <Text>No data found</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={styles.headingArea}>
                        <Image source={require('../assets/images/hot-sale.png')} style={styles.hotSale} />
                        <Text style={styles.topHeading}><Text style={{ fontWeight: '800' }}>Stores</Text></Text>
                    </View>
                    <View style={[styles.catStore]}>
                        {
                            store.length ? store.map((item, i) => {
                                return <TouchableOpacity style={styles.storeImgCon} key={i} onPress={() => navigation.navigate({ name: 'StoreDetails', params: { storeSlug: item.name } })}>
                                    <View style={styles.storICon} >
                                        <Image source={{ uri: item.image }} style={{ width: 75, height: 35, resizeMode: 'contain' }} />
                                        <Text style={styles.cbText}>₹{Number(item.cbrate).toFixed(0)} <Text style={styles.cbMessage}>Cashback</Text></Text>
                                    </View>
                                </TouchableOpacity>;
                            }) : <View style={styles.noDataFound}>
                            <Text>No data found</Text>
                        </View>
                        }
                    </View>

                </View>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    searchTxt: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 15,
    },
    dealDay: {
        marginTop: 0,
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
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cbtxt: {
        color: '#fff',
        fontSize: 12,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 20,
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
        marginTop: 10,
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
        paddingHorizontal: 30,
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
        borderRadius: 3,
        paddingHorizontal: 7,
        position: 'absolute',
        zIndex: 999,
        paddingVertical: 4,
        right: 0,
        opacity: 0.8,
    },
    storICon: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding:5,
    },
    storeMainCon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    storeImgCon: {
       justifyContent: 'space-between',
        marginBottom: 20,
        width:'28%',
        flexDirection: 'row',
        display: 'flex',
        marginHorizontal: 7,
    },
    cbText: {
        fontWeight: '900',
        color: '#E22020',
        fontSize:12,
    },
    cbMessage: {
        fontWeight: '400',
        color: '#333'
    },
    storeListCon: {
       justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
    },
    catStore: {
        flexDirection: 'row',
       justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginTop: 15,
    },
})

export default SearchPage;
