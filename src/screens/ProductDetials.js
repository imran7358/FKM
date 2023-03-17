import React, { useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, TouchableHighlight,Linking, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = '/deals/dealdetail';
import axios from 'axios';
import RealtedDeals from '../components/Deals/RelatedDeals';
import { Loader } from 'react-native-feather';
import CustomWebView from 'react-native-render-html';
import { useSelector } from 'react-redux';



 const ProductDetails = ({navigation, route}) => {


    const userToken = useSelector(state=> state.user.userToken);
    const userInfo = useSelector(state=> state.user.userInfo);
    const [details, setDetails] = useState({
        title: '',
        dealImg: null,
        description: '',
        price: '',
        offerPrice: '',
        isClaim: '',
        landing_url : '',
        isCashback: '',
        storeImg : null,
        cashbackAmount: ''
    });
    const [relatedProduct, setRelatedProduct] = useState([]);

    const [loading, setLoading] = useState(false);
    const getDetails = () => {
        setLoading(true);
        axios.post(Config.API_URL + END_URL, {
            'page':'1',
            'apiAuth': Config.API_AUTH,
            'deal_slug': route.params.dealSlug,
            'device_type':'4',
        },{
            headers: {
                Authorization: userToken,
            },
        }).then(({data})=>{
            // const regex = /(<([^>]+)>)/ig;
            // const result = data.response.deal.description.replace(regex, '');
            

            setDetails({
                title: data.response.deal.deal_title,
                dealImg:data.response.deal.deal_img_url,
                price: data.response.deal.price,
                offerPrice: data.response.deal.offer_price,
                description: data.response.deal.description,
                isClaim: data.response.deal.is_claim,
                landing_url: data.response.deal.landing_url,
                isCashback: data.response.deal.is_cashback,
                storeImg: data.response.deal.store_image,
                cashbackAmount: data.response.deal.cashback_amount,
            });
            console.log(details.description);
            setRelatedProduct(data.response.related_deals);
            setLoading(false);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        });
    };

    useEffect(()=>{
        getDetails();
        console.log("myToken", userToken)
    },[]);

    return (
        <SafeAreaView style={styles.bgWhite}>
            <ScrollView style={styles.bgWhite}>
            {
                loading ?
                <View style={styles.loadContainer}>
                    <Loader/>
                </View>
                : <View style={styles.container}>
                <Text style={styles.heading}>{details.title}</Text>
                <View style={styles.prodImage}>
                    {/* <View style={styles.offerCon}>
                    <Text style={styles.offPrice}>50% OFF</Text>
                    </View> */}
                    <View style={styles.imgCon}>
                       <Image source={{ uri: details.dealImg}} style={{height:300, width:300, resizeMode: 'contain'}}/>
                    </View>
                    {/* <Text>Choose the best price and the rertailer</Text> */}
                    <View style={styles.pricLogoCon}>
                    <View style={styles.leftPrice}>
                    <View style={styles.priceContainer}>
                            <View style={styles.innerPrice}>
                                <Image source={require('../assets/images/rupee-icon.png')} style={styles.rpImage}/>
                                <Text style={styles.priceTxt}>{details.offerPrice}</Text>
                            </View>
                            <View style={styles.innerPrice}>
                                <Text style={styles.cutLine}></Text>
                            <Image source={require('../assets/images/grey-rupee-icon.png')} style={styles.rpImage}/>
                                <Text style={[styles.priceTxt, styles.cutprice]}>{details.price}</Text>
                            </View>
                        </View>
                        {
                            details.isCashback == '1' ? <View style={styles.cashbckPrice}>
                            <View style={styles.innerPrice}>
                                    <Image source={require('../assets/images/rupee-icon.png')} style={styles.cbSize}/>
                                    <Text style={styles.cbTxt}>{details.cashbackAmount}</Text>
                                    <Text>Cashback</Text>
                                    <Image source={require('../assets/images/questionCircle.png')} style={styles.quesCircle}/>
                                </View>
                            </View> : null
                        }
                    </View>
                        <View style={styles.logoImages}>
                            <Image source={{ uri: details.storeImg }} style={styles.prodLogo}/>
                        </View>
                    </View>
                </View>
                {

                    userToken ? <View>
                        {
                    details.isClaim == '1' ?
                    <View style={styles.claimForm}>
                   <View>
                    <Text style={styles.claimHead}>cashback claim form</Text>
                    <Text style={styles.claimPara}>fill up this form within 24 hrs</Text>
                   </View>
                  <TouchableHighlight onPress={()=> navigation.navigate('ClaimForm')}>
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
                  <TouchableHighlight onPress={()=> navigation.navigate('Login')}>
                  <View style={styles.FormBtn}>
                    <Text style={styles.submitBtn}>Submit</Text>
                   </View>
                  </TouchableHighlight>
                </View>
                }
                <View style={styles.prodDetails}>
                <Text style={styles.abtDeals}>About the Deals</Text>
                <CustomWebView source={{ html: details.description }}/>
                 </View>
                <RealtedDeals relatedProduct = {relatedProduct} navigation={navigation}/>
            </View>
            }
            </ScrollView>
            {
                details.isCashback == '1' ? <View>{userInfo ? <View style ={styles.container}>
                <View style={styles.appButton}>
                <TouchableOpacity onPress={async()=> { await Linking.openURL(details.landing_url)}}>
                <Text style={styles.btnTxt}>Shop & Earn Cashback</Text>
                </TouchableOpacity>
            </View>
                </View> : <View style ={styles.container}>
                        <View style={styles.appButton}>
                        <TouchableOpacity onPress={()=> { navigation.navigate('Login')}}>
                        <Text style={styles.btnTxt}>Shop & Earn Cashback</Text>
                        </TouchableOpacity>
                    </View>
                        </View> }</View> : <View style ={styles.container}>
                        <View style={styles.appButton}>
                        <TouchableOpacity onPress={async()=> { await Linking.openURL(details.landing_url)}}>
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
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {
        padding: 24,
    },
    heading: {
        fontSize: 16,
        fontWeight: '900',
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
        marginTop: 30,
        marginBottom: 30,
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
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    priceTxt: {
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
        height:2,
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
        fontSize: 16,
        fontWeight: 'bold'
    },
    claimPara: {
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
 });
 export default ProductDetails;
