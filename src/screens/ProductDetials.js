import React, { useEffect, useState } from 'react';
import { Platform,View, Text, SafeAreaView, StyleSheet, Image, TouchableHighlight, Linking, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = '/deals/dealdetail';
import axios from 'axios';
import RealtedDeals from '../components/Deals/RelatedDeals';
import { Loader } from 'react-native-feather';
import CustomWebView from 'react-native-render-html';
import RenderHTML from 'react-native-render-html';
import { useSelector } from 'react-redux';





const ProductDetails = ({ navigation, route }) => {
    const deviceType = Platform.OS=='ios' ? 4 : 3 ;
    const { width } = useWindowDimensions();
    const dealdesc = { 
                     p: {
                        fontFamily: 'Lato',
                        color :'#455769',
                        fontSize:14,
                        fontWeight:'400',
                        lineHeight:19,
                        marginBottom:6
                        },
                        li : {
                        fontFamily: 'Lato',
                        color :'#455769',
                        fontSize:14,
                        fontWeight:'400',
                        lineHeight:19,
                        marginBottom:6
                        }
                    }

    const userToken = useSelector(state => state.user.userToken);
    const userInfo = useSelector(state => state.user.userInfo);
    const [showMore, setShowMore] = useState(true)
    const [details, setDetails] = useState({
        title: '',
        dealImg: null,
        description: '',
        price: '',
        offerPrice: '',
        isClaim: '',
        landing_url: '',
        isCashback: '',
        storeImg: null,
        cashbackAmount: '',
        toc: ''
    });
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toc, setToc] = useState(false);
    const getDetails = () => {
        setLoading(true);
        axios.post(Config.API_URL + END_URL, {
            'page': '1',
            'apiAuth': Config.API_AUTH,
            'deal_slug': route.params.dealSlug,
            'device_type': deviceType,
        }, {
            headers: {
                Authorization: userToken,
            },
        }).then(({ data }) => {

            setDetails({
                title: data.response.deal.deal_title,
                dealImg: data.response.deal.deal_img_url,
                price: data.response.deal.price,
                offerPrice: data.response.deal.offer_price,
                description: data.response.deal.description,
                isClaim: data.response.deal.is_claim,
                landing_url: data.response.deal.landing_url,
                isCashback: data.response.deal.is_cashback,
                storeImg: data.response.deal.store_image,
                cashbackAmount: data.response.deal.cashback_amount,
                toc: data.response.deal.toc
            });
            setRate(data.response.deal.store_rates);
            // console.log(details.description);
            setRelatedProduct(data.response.related_deals);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getDetails();
        console.log(userToken)
    }, []);

    useEffect(() => {

    }, [showMore])
    const openURL = async (url) => {
        // Alert.alert('ok')
        try {
          await Linking.openURL(url);
        } catch (error) {
          console.error('Error opening URL: ', error);
        }
      };
    return (
        <SafeAreaView style={styles.bgWhite}>
            <ScrollView style={styles.bgWhite}>
                {
                    loading ?
                        <View style={styles.loadContainer}>
                            <Loader />
                        </View>
                        : <View style={styles.container}>
                            <Text style={styles.heading}>{details.title}</Text>
                            <View style={styles.prodImage}>
                                {/* <View style={styles.offerCon}>
                    <Text style={styles.offPrice}>50% OFF</Text>
                    </View> */}
                                <View style={styles.imgCon}>
                                    <Image source={{ uri: details.dealImg }} style={{ height: 200, width: 200, resizeMode: 'contain' }} />
                                </View>
                                <View style={styles.pricLogoCon}>
                                    <View style={styles.leftPrice}>
                                        <View style={styles.priceContainer}>
                                            <View style={[styles.innerPrice, styles.mainPrice]}>
                                                <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage} />
                                                <Text style={styles.priceTxt}>{details.offerPrice}</Text>
                                            </View>
                                            <View style={styles.innerPrice}>
                                                <Text style={styles.cutLine}></Text>
                                                <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage} />
                                                <Text style={[styles.priceTxt, styles.cutprice]}>{details.price}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.logoImages}>
                                            <Image source={{ uri: details.storeImg }} style={styles.prodLogo} />
                                        </View>
                                    </View>

                                </View>
                                {/* {
                                    details.isCashback == '1' ? <View style={styles.cashbckPrice}>
                                        <View style={styles.innerPrice}>
                                            <Text style={styles.cbTxt}>{details.cashbackAmount}</Text>
                                            <Text>Cashback</Text>
                                            <Image source={require('../assets/images/questionCircle.png')} style={styles.quesCircle} />
                                        </View>
                                    </View> : null
                                } */}
                            </View>


                            {
                                details.isCashback == '1' ? 
                                <View style={styles.cashbackRates}>
                                    <View style={styles.ratesContainer}>
                                        <View style={styles.cbrateTxt}>
                                            <Text style={{ fontSize: 14, }}>Cashback</Text>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 5, }}>Rates</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => setToc(!toc)}>
                                            <View style={styles.viewTc}><Text style={styles.cbTc}>Cashback T&C</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        toc ? <View style={styles.tmcContainer}>
                                            <CustomWebView style={styles.txtDescription} source={{ html: details.toc }} />

                                        </View> : null
                                    }

                                    {
                                        showMore ? <View>
                                            {

                                                rate?.length && rate?.map((item, i) => {
                                                    return i < 2 && <View style={styles.cbCardContainer} key={i}>
                                                        <View style={styles.cbInner}>
                                                            <View style={styles.cbRupee}>
                                                                <View style={styles.cbInfoCon}>
                                                                    <Text style={{ fontWeight: '900',color:'black', fontSize: 12, color: '#fff', marginLeft: 3, }}>{item.rate}</Text>
                                                                </View>
                                                            </View>

                                                            <View style={styles.cbTxtCon}>
                                                                <Text style={{ fontSize: 14,color:'black', fontWeight: '900', marginBottom: 5, height: 20, }}>{item.cashback_tag}</Text>
                                                                <View style={{ width: '100%', flexWrap: 'wrap', flex: 1 }}>
                                                                    <Text style={{ fontSize: 12,color:'black', flexWrap: 'wrap', width: '100%' }}>{item.tag_desc}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                })
                                            }
                                        </View> : <View>

                                            {

                                                rate?.length && rate?.map((item, i) => {
                                                    return <View style={styles.cbCardContainer} key={i}>
                                                        <View style={styles.cbInner}>
                                                            <View style={styles.cbRupee}>
                                                                <View style={styles.cbInfoCon}>
                                                                    <Text style={{ fontWeight: '900',color:'black', fontSize: 12, color: '#fff', marginLeft: 3, }}>{item.rate}</Text>
                                                                </View>
                                                            </View>

                                                            <View style={styles.cbTxtCon}>
                                                                <Text style={{ fontSize: 14, color:'black', fontWeight: '900', marginBottom: 5, height: 20, }}>{item.cashback_tag}</Text>
                                                                <View style={{ width: '100%', flexWrap: 'wrap', flex: 1 }}>
                                                                    <Text style={{ fontSize: 12, color:'black', flexWrap: 'wrap', width: '100%' }}>{item.tag_desc}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                })
                                            }
                                        </View>
                                    }

                                   
                                   <View style={{justifyContent:'center', display:'flex', alignContent:'center', alignItems:'center', marginTop:20}}>
                                   {
                                    rate?.length>2 ?
                                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => setShowMore(!showMore)}>
                                        <View style={styles.readMore}>
                                            {
                                                showMore ? <Image source={require('../assets/images/downArrow.png')} style={styles.readArrow} /> : <Image source={require('../assets/images/downArrow.png')} style={[styles.readArrow, styles.arrowTransform]} />
                                            }
                                        </View>
                                    </TouchableHighlight>
                                    :
                                    null
                                   }
                                   
                                   </View>
                                </View> : null
                            }
                            {

                                userToken ? <View>
                                    {
                                        details.isClaim == '1' ?
                                            <View style={styles.claimForm}>
                                                <View>
                                                    <Text style={styles.claimHead}>cashback claim form</Text>
                                                    <Text style={styles.claimPara}>fill up this form within 24 hrs</Text>
                                                </View>
                                                <TouchableHighlight onPress={() => navigation.navigate('ClaimForm')}>
                                                    <View style={styles.FormBtn}>
                                                        <Text style={styles.submitBtn}>Submit</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            </View>
                                            : null
                                    }
                                </View> :
                                    <View style={styles.claimForm}>
                                        <View>
                                            <Text style={styles.claimHead}>cashback claim form</Text>
                                            <Text style={styles.claimPara}>fill up this form within 24 hrs</Text>
                                        </View>
                                        <TouchableHighlight onPress={() => navigation.navigate('Login')}>
                                            <View style={styles.FormBtn}>
                                                <Text style={styles.submitBtn}>Submit</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                            }
                            <View style={styles.prodDetails}>
                                <Text style={styles.abtDeals}>About the Deals</Text>
                                <CustomWebView source={{ html: details.description }} tagsStyles={ dealdesc } contentWidth={width - 80} />
                            </View>
                            {relatedProduct.length ?
                            <RealtedDeals relatedProduct={relatedProduct} navigation={navigation} />
                            : "" }
                        </View>
                }
            </ScrollView>
            {
                details.isCashback == '1' ? <View>{userInfo ? <View style={styles.container}>
                    <View style={styles.appButton}>
                        <TouchableOpacity onPress={() => openURL(details.landing_url)}>
                            <Text style={styles.btnTxt}>Shop & Earn Cashback</Text>
                        </TouchableOpacity>
                    </View>
                </View> : <View style={styles.container}>
                    <View style={styles.appButton}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                            <Text style={styles.btnTxt}>Login & Earn Cashback</Text>
                        </TouchableOpacity>
                    </View>
                </View>}</View> : <View style={styles.container}>
                    <View style={styles.appButton}>
                        {/* <TouchableOpacity onPress={async () => { await Linking.openURL(details.landing_url) }}> */}
                        {/* navigation.navigate({name:'Details',params:{dealSlug:item.slug_url}}) */}
                        <TouchableOpacity onPress={() => openURL(details.landing_url)}>
                            <Text style={styles.btnTxt}>Shop Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    bgWhite: {
        backgroundColor: '#fff',
        flex: 1,
    },
    webView: {

        flex: 1,

    },
    mainPrice: {
        marginRight: 20,
    },
    leftPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%'

    },
    cashbackRates: {
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 6,
    },
    ratesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 24,
    },
    cbrateTxt: {
        flexDirection: 'row',
    },
    heading: {
        color:'black',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 30,
    },
    cbTc: {
        color: '#f27935',
        fontWeight: '600',
    },
    prodImage: {
        marginTop: 20,
        borderColor: '#ccc',
        borderRadius: 6,
        borderWidth: 1,
        padding: 20,
        position: 'relative',
    },
    offPrice: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        padding: 10,
        borderTopRightRadius: 6,
    },
    offerCon: {
        backgroundColor: '#1aa253',
        borderTopRightRadius: 6,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    imgCon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    innerPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    rpImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    priceTxt: {
        color:'black',
        fontSize: 19,
        fontWeight: 'bold',
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
    pricLogoCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',

    },
    cashbckPrice: {
        borderColor: '#FFB991',
        borderWidth: 1,
        borderRadius: 3,
        padding: 8,
        marginTop: 15,
        backgroundColor: '#FFEFE5',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row'
    },
    cbTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 3,
    },
    cbSize: {
        height: 13,
        resizeMode: 'contain',
    },
    quesCircle: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    prodLogo: {
        width: 88,
        height: 37,
        resizeMode: 'contain'
    },
    claimForm: {
        marginTop: 20,
        backgroundColor: '#EBEBEB',
        borderRadius: 6,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    claimHead: {
        color:'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    claimPara: {
        color:'black',
        fontSize: 14,
        marginTop: 5,
    },
    FormBtn: {
        backgroundColor: '#3B3B3B',
        borderRadius: 6,
        padding: 10,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        justifyContent: 'center',
    },
    prodDetails: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        padding: 20,
        marginTop: 20,
    },
    abtDeals: {
        color:'black',
        fontSize: 18,
        fontWeight: '900',
    },
    hastag: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#397EF5',
        marginTop: 10,
    },
    detailsPara: {
        fontSize: 14,
        lineHeight: 24,
        marginTop: 10,
    },
    secondHeading: {
        fontSize: 16,
        fontWeight: '900',
        marginTop: 15,
    },
    points: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 7,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 45,
        backgroundColor: '#B5B5B5',
        marginRight: 7,
    },
    appButton: {
        backgroundColor: '#f27935',
        borderRadius: 6,
        alignItems: 'center',
        alignContent: 'center',
    },
    btnTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        padding: 14,
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
    cbRupee: {
        backgroundColor: '#f27935',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        width: '31%',

    },
    cbTxtCon: {
        padding: 20,
        flexDirection: 'column',
        width: '65%'
    },
    cbInfoCon: {
        backgroundColor: '#f27935',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tmcContainer: {
        border: '1px solid #ccc',
        borderWidth: 1,
        borderColor: '#f27935',
        borderRadius: 6,
        padding: 10,
        marginTop: 10,
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
});
export default ProductDetails;
