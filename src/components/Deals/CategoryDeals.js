import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = '/category/category-detail';
import Loader from '../../components/Loader';
import axios from 'axios';

const CategoriesDeals = ({ navigation, route }) => {
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [deals, setDeals] = useState([]);
    const [noData, setNoData] = useState();

    const getDeals = () => {
        setLoader(true);
        axios.post(Config.API_URL + END_URL, {
            'apiAuth': Config.API_AUTH,
            'cate_slug': route,
            'device_type': '4',
            page,
            'option': 'deals',
        }).then(({ data }) => {
         
            if (data.response.deals && data.response.deals.length) {
                setDeals([...deals, ...data.response.deals]);
            }
            else {
                setNoData(true);
            }
        }).catch((error) => {
        }).finally(() => {
            setLoader(false);
        });

    }

    useEffect(() => {

        getDeals();
    }, [page, route])
    return (
        <View style={styles.dealsContainer}>
            <View style={styles.productContainer}>
                {
                    deals.map((item, i) => {
                        return <View style={styles.productBox} key={i}>
                            <TouchableOpacity onPress={() => navigation.navigate({ name: 'Details', params: { dealSlug: item.deal_slug_url } })}>
                                {
                                    item.is_cashback == '1' ?
                                        <View style={styles.cashback}>
                                            <Text style={styles.cbtxt}>Cashback</Text>
                                        </View>
                                        : null
                                }
                                <View style={[styles.imageContainer, styles.shadow]}>

                                <Image
                                style={styles.videoPreview}
                                source={{ uri: item.deal_image }}
                                />
                                </View>
                                <View style={styles.dealsInner}>
                                <View style={styles.brandLogo}>
                                    <Image source={{ uri: item.store_img_url }} style={styles.brandLogoImg} />
                                </View>
                                <View style={styles.prodDescr}>
                                    <Text style={styles.prdLine} numberOfLines={3}>
                                        {item.deal_title}
                                    </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.innerPrice}>
                                        <Image source={require('../../assets/images/rupee-icon.png')} style={styles.rpImage} />
                                        <Text style={styles.priceTxt}>{item.offer_price}</Text>
                                    </View>
                                    <View style={styles.innerPrice}>
                                        <Text style={styles.cutLine} />
                                        <Image source={require('../../assets/images/grey-rupee-icon.png')} style={styles.rpImage} />
                                        <Text style={[styles.priceTxt, styles.cutprice]}>{item.price}</Text>
                                    </View>
                                </View>
                                </View>
                            </TouchableOpacity>
                        </View>;
                    })
                }
            </View>
            {
                loader ?
                    <View style={styles.loadContainer}>
                        <Loader />
                    </View>
                    : null
            }
            {
                noData ? <View style={styles.noDataFound}>
                    <Text>No data Found</Text>
                </View>
                    : <View style={styles.loaderContainer}>
                        <TouchableOpacity style={[styles.LoadMore, styles.padding]} onPress={() => setPage(page + 1)}>
                            <View>
                                <Text style={styles.loadTxt}>Load More</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    dealsContainer: {
        padding: 24,
        paddingRight: 20,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    productBox: {
        width: '47%',
        backgroundColor: '#f0f0f0',
        // padding: 15,
        borderRadius: 16,
        borderColor: '#EDEDED',
        borderWidth: 1.2,
        marginBottom: 25,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 130,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        position: 'relative',
      },
    productImage: {
        width: 100,
        height: 100,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPreview: {
        width: 80,
        height: 80,
        borderRadius: 9,
        resizeMode: 'cover',
      },
      dealsInner:{
        paddingHorizontal: 15,
        paddingBottom:15,
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
        textAlign: 'left',
    },
    prodDescr: {
        fontSize: 11,
        marginTop: 10,
    },
    prdLine: {
        fontSize: 10,
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
        resizeMode: 'contain'
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
    dealImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    storeImg: {
        width: 55,
        height: 16,
        resizeMode: 'cover',
    },
    brandLogoImg: {
        height: 16,
        width: 55,

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
    cbtxt: {
        color: '#fff',
        fontSize: 12,
    },
    LoadMore: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f27935',
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginVertical: 25,
    },
    loadTxt: {
        fontWeight: 'bold',
        color: '#f27935',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFound:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent:'center',
        alignItems: 'center',
    },

});

export default CategoriesDeals;
