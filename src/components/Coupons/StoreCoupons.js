import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = '/store/storedetail';
import Loader from '../../components/Loader';
import axios from 'axios';

const StoreCoupons = ({ navigation, couponsList, route}) => {
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [noData, setNoData] = useState(false);
    const [coupons, setCoupons] = useState([]);


    const getCoupons = () => {
        setLoader(true);
        axios.post(Config.API_URL + END_URL, {
            'apiAuth': Config.API_AUTH,
            'store_slug': route,
            'device_type': '4',
            page,
            'option': 'coupons',

        }).then(({data})=>{

            if (data.response.coupons && data.response.coupons.length){
                setCoupons([...coupons, ...data.response.coupons]);

            }

            else{
                setNoData(true);
            }
        }).catch((error)=>{
            console.log("Error Ayaa", error)
        }).finally(()=>{
            setLoader(false)
        })

    }

    useEffect(()=>{

        getCoupons();

    },[page,route])

    return (

        <View style={styles.dealsContainer}>
            <View style={styles.productContainer}>
                {
                    coupons.length ? coupons.map((item, i) => {
                        return <View style={styles.couponsList} key={i}>
                            <TouchableOpacity style={styles.clickContainer} onPress={() => navigation.navigate('coupnsDetails',{couponId: item.coupon_id })} >
                            <View style={styles.couponHeading}>
                                <Text style={styles.coupnHead}>
                                    {item.description}
                                </Text>
                            </View>
                            <View style={styles.getCodeInfo}>
                                <View>
                                    <Text style={styles.getCode}>Get Code</Text>
                                </View>
                                <View style={styles.endDays}>
                                    <Image source={require('../../assets/images/clock.png')} style={styles.clockimg} />
                                    <Text>{item.expiry}</Text>
                                </View>

                            </View>
                            <View style={styles.shareViewCon}>
                                <View style={styles.innerShare}>
                                    <View style={styles.viewCon}>
                                        <Image source={require('../../assets/images/eye.png')} style={styles.sharImg} />
                                        <Text>{item.views} Views</Text>
                                    </View>
                                    <View style={styles.viewCon}>
                                        <Image source={require('../../assets/images/thumb.png')} style={styles.sharImg} />
                                        <Text>{item.likes} Views</Text>
                                    </View>
                                    <View style={styles.viewCon}>
                                        <Image source={require('../../assets/images/share.png')} style={styles.sharImg} />
                                        <Text>Share</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                        </View>

                    })
                        : null
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
    },
    couponsList: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 9,
        marginBottom: 20,

    },
    coupnHead: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 21,
        padding: 20,
    },
    getCodeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
    },
    endDays: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareViewCon: {
        backgroundColor: '#F7F7F7',
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    innerShare: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewCon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#B9B9B9',
        paddingRight: 10,
    },
    sharImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
    },
    getCode: {
        borderColor: '#f27935',
        borderWidth: 1,
        borderRadius: 3,
        fontSize: 16,
        fontWeight: '900',
        padding: 12,
        paddingLeft: 40,
        paddingRight: 40,
        color: '#f27935',
    },
    clockimg: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginRight: 5,
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

export default StoreCoupons;
