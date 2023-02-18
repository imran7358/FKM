import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TouchableHighlight, Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Coupons from '../components/Coupons';
import StoreDeals from '../components/Deals/StoreDeals';
import Config from 'react-native-config';
const END_URL = '/store/storedetail';
import Loader from '../components/Loader';
import StoreCoupons from '../components/Coupons/StoreCoupons';


const StoreDetails = ({ props, route, navigation }) => {
    const [deals, setShowDeals] = useState(true);
    const [coupons, setShowCoupons] = useState(false);
    const [rate, setRate] = useState(['']);
    const [readMore, setReadMore] = useState(true);
    const [store, storeDetails] = useState({
        is_cashback: '',
        cashback_amount: '',
        store_landing_url: '',
        claim_form_link: '',
        is_claim: '',
        confirmation: '',
        speed: '',
        is_missing: '',
        store_name: '',
        store_img: null,
        top_desc: '',
        isClaim: '',
    });
    const [storeDeals, setStoreDeals] = useState([]);
    const [couponsList, setCouponsList] = useState([])
    const [streCoupons, setStoreCoupons] = useState([]);
    const [opt, setOpt] = useState('');
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const [noData, setNoData] = useState('');

    const [show, setShow] = useState(false);
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
            'apiAuth': Config.API_AUTH,
            'store_slug': route.params.storeSlug,
            'device_type': 4,
            page,
            'option': opt,

        }).then(({ data }) => {
            if (opt == "") {
                const regex = /(<([^>]+)>)/ig;
                const result = data.response.store_details.top_desc.replace(regex, '');
                storeDetails({
                    is_cashback: data.response.store_details.is_cashback,
                    store_name: data.response.store_details.store_name,
                    store_img: data.response.store_details.store_img,
                    cashback_amount: data.response.store_details.cashback_amount,
                    confirmation: data.response.store_details.confirmation,
                    speed: data.response.store_details.speed,
                    is_missing: data.response.store_details.is_missing,
                    top_desc: result,
                    isClaim: data.response.store_details.is_claim,
                    store_landing_url: data.response.store_details.store_landing_url,
                });
                setRate(data.response.store_rates);
                if (data.response.deals && data.response.deals.length) {
                    setStoreDeals([...storeDeals, ...data.response.deals]);
                }
            }
            else if (opt == 'coupons') {
                setCouponsList([...couponsList, ...data.response.coupons]);
            }
            else {
                if (!data.response.deals.length) {
                    setNoData('No records found !');
                    setLoadMore(false);
                }
                // setStoreDeals([...storeDeals, ...data.response.deals]);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoader(false);
        });

    }, [page, opt, route.params.storeSlug]);
    useEffect(() => {
    }, [storeDeals,route.params.storeSlug])
    return (

        <SafeAreaView style={styles.bgWhite}>
            <ScrollView style={styles.bgWhite}>
                <View style={styles.container}>
                    <View style={styles.StoreCardInfo}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoBox}>
                                <Image source={{ uri: store.store_img }} style={styles.logo} />
                            </View>
                        </View>
                        <View style={styles.cashbackStore}>
                            <Image source={require('../assets/images/rupee-icon.png')} style={{ width: 11, height: 11, resizeMode: 'contain' }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5, }}><Text style={{ fontSize: 14, fontWeight: 'bold' }}>{store.cashback_amount} </Text></View>
                            <Image source={require('../assets/images/info.png')} />
                        </View>
                        <View>
                            <Text style={styles.storePara}>{readMore ? store.top_desc.substring(0, 200) : store.top_desc}</Text>

                        </View>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => setReadMore(!readMore)}>
                            <View style={styles.readMore}>
                                {
                                    readMore ? <Image source={require('../assets/images/downArrow.png')} style={styles.readArrow} /> : <Image source={require('../assets/images/downArrow.png')} style={[styles.readArrow, styles.arrowTransform]} />
                                }
                            </View>
                        </TouchableHighlight>
                        {
                            store.is_cashback == '1' ? <View style={styles.cashbackInfo}>
                            <View style={styles.confirmTime}>
                                <Text style={styles.infoTxt}>Confirmation</Text>
                                <Text style={styles.infoPara}>{store.confirmation}</Text>
                            </View>
                            <View style={styles.trackingSpeed}>
                                <Text style={styles.infoTxt}>Tracking Speed</Text>
                                <Text style={styles.infoPara}>{store.speed}</Text>
                            </View>
                            <View style={styles.otherInbfo}>
                                <Text style={styles.infoTxt}>Missing Order</Text>
                                <Text style={styles.infoPara}>{store.is_missing}</Text>
                            </View>
                        </View> : null
                        }
                    </View>

                    {
                        store.is_cashback == '1' ? <View style={styles.cashbackRates}>
                        <View style={styles.cbrateTxt}>
                            <Text style={{ fontSize: 14, }}>Cashback</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 5, }}>Rates</Text>
                        </View>
                        {

                            rate.length && rate.map((item, i) => {
                                return <View style={styles.cbCardContainer} key={i}>
                                    <View style={styles.cbInner}>
                                        <View style={styles.cbRupee}>
                                            <View style={styles.cbInfoCon}>
                                                <Text style={{ fontWeight: '900', fontSize: 12, color: '#fff', marginLeft: 3, }}>{item.rate}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.cbTxt}>
                                            <Text style={{ fontSize: 14, fontWeight: '900', marginBottom: 5, }}>{item.cashback_tag}</Text>
                                            <Text style={{ fontSize: 12, flexWrap: 'wrap', width: '59%', lineHeight: 18, flex: 1, }}>{item.tag_desc}</Text>
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                    </View> : null
                    }

                    

                    {
                        store.isClaim == '1' ?
                            <View style={styles.claimForm}>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: '900', marginBottom: 5, }}>Cashback claim form</Text>
                                    <Text> Fill up this form within 24 hrs</Text>
                                </View>
                                <View style={styles.claimFormbtn}>
                                    <Text style={{ color: '#fff', fontWeight: '900' }}>Claim Form</Text>
                                </View>
                            </View>
                            : null
                    }



                </View>
                <View style={styles.dealsCpContainer}>
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

                            <StoreDeals deals={storeDeals} navigation={navigation} route={route.params.storeSlug}/>

                            : null
                    }
                    {
                        coupons ?
                            <StoreCoupons navigation={navigation} route={route.params.storeSlug}/>
                            : null
                    }
                    <View style={styles.loadeMoreCon}>
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

                    
                </View>
            </ScrollView>
            <View style={styles.shopErnCon}>
                <TouchableOpacity onPress={async()=>{ 
                     console.log("Ye hai --->>>",store.store_landing_url);
                    await Linking.openURL(store.store_landing_url)} }>
                <View style={styles.bottomBtn}>
                    <Text style={styles.shopearnbtn}>Shop & Earn</Text>
                </View>
                </TouchableOpacity>
               

            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    bgWhite: {
        backgroundColor: '#fff',
        flex: 1,
    },
    cashbackRates: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 6,
    },
    hide: {
        height: 100,
        overflow: 'hidden',
    },
    shopearnbtn: {
        color: '#fff',
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',

    },
    loadeMoreCon: {
        paddingLeft: 20,
        paddingRight: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    bottomBtn: {
        backgroundColor: '#f27935',
        padding: 15,
        borderRadius: 3,
        width: '100%',
    },
    shopErnCon: {
        backgroundColor: '#fff8f4',
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
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
    dealsCpContainer: {
        backgroundColor: '#fff',
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
    claimFormbtn: {
        backgroundColor: '#3B3B3B',
        borderRadius: 6,
        padding: 10,
    },
    cbTxt: {
        padding: 20,
        flexWrap: 'wrap',
    },
    cbRupee: {
        backgroundColor: '#f27935',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        width: '31%',

    },
    claimForm: {
        backgroundColor: '#fff',
        borderRadius: 6,
        marginTop: 15,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cbInfoCon: {
        backgroundColor: '#f27935',
        flexDirection: 'row',
        alignItems: 'center',


    },
    cbInner: {
        flexDirection: 'row',
    },
    cbCardContainer: {
        borderColor: '#f27935',
        borderWidth: 1,
        borderStyle: 'dashed',
        marginTop: 15,
        borderRadius: 6,
    },
    cbrateTxt: {

        flexDirection: 'row',
    },
    container: {
        padding: 24,
        backgroundColor: '#F7F7F7',
        width: '100%',
    },

    trackingSpeed: {
        width: '40%',
        alignContent: 'center',
        alignItems: 'center',
    },

    infoTxt: {
        fontSize: 10,
        fontWeight: '900',
        color: '#f27935',

    },
    cashbackInfo: {
        backgroundColor: '#F8F8F8',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    infoPara: {

        fontSize: 11,
        marginTop: 7,

    },
    storePara: {
        fontSize: 12,
        lineHeight: 18,
        padding: 10,
    },
    confirmTime: {
        width: '30%',
    },
    otherInbfo: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    StoreCardInfo: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 20,
        marginTop: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },
    logoBox: {
        borderColor: '#F5F5F5',
        borderWidth: 1,
        width: 120,
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 72,
        height: 29,
        resizeMode: 'contain',
    },
    cashbackStore: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',

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
    readMore: {
        backgroundColor: '#f27935',
        height: 38,
        width: 38,
        borderRadius: 45,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    readArrow: {
        width: 20,
        height: 20,
    },
    arrowTransform: {
        transform: [{ rotate: '180deg' }],
    },
    loginButton: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f27935',
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: 150,
    },
    loginTxt: {
        fontWeight: '900',
        color: '#f27935',
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
    },
    noData: {
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

});

export default StoreDetails;
