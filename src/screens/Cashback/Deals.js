import axios from "axios";
import React from "react";
import { Platform,View, Text,  StyleSheet, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Config from "react-native-config";
const END_URL = '/cashback/cashbackpage';
import { useEffect, useState} from "react";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/Loader";

const Deals = ({navigation})=> {
    const deviceType = Platform.OS=='ios' ? 4 : 3 ;
    const [success, setSucess] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [deals, setDeals] = useState([])
    const [store, setStore] = useState([])
    
const userToken = useSelector(state => state.user.userToken);

const getCashbackDeals = () => {
    setLoader(true)
    request.post(navigation, Config.API_URL + END_URL, {
        apiAuth: Config.API_AUTH,
        device_type: deviceType,
    },{
        headers: {
            Authorization: userToken,
        },
    }).then(({data})=>{
        setDeals(data.response.cashbackdeal);
    }).catch((error)=>{
        console.log("Error Aaya hai", error)
    }).finally(()=>{
        setLoader(false);
    })
}

useEffect(()=>{
    getCashbackDeals()
},[])
    return (
        
        
    
            <View style={styles.productContainer}>
                    {
                        deals.length ? deals.map((item, i) => {
                            return <View style={styles.productBox} key={i}>
                                <TouchableOpacity onPress={() =>{navigation.navigate({ name: 'Details', params: { dealSlug: item.slug_url } })}}>
                                    {
                                        item.is_cashback == '1' ?
                                        <View style={styles.cashback}>
                                            <Text style={styles.cbtxt}>Cashback</Text>
                                        </View>
                                        : null
                                    }

                                    <View style={styles.productImageCon}>
                                        <View style={styles.productImage}>
                                            <Image source={{ uri: item.image_url }} style={{ height: 70, width: 70 }} />
                                        </View>
                                    </View>
                                    <View style={styles.dealsInner}>
                                    <View style={styles.brandLogo}>
                                        <Image source={{ uri: item.store_img }} style={{ height: 16, width: 55 }} />
                                    </View>
                                    <View style={styles.prodDescr}>
                                        <Text style={styles.prdLine} numberOfLines={3}>
                                            {item.title}
                                        </Text>

                                    </View>
                                   <View style={styles.btnCon}>
                                   <View style={styles.cbButton}>
                                        <Text style={styles.cbTxt}>{item.cahsback}</Text>
                                    </View>
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
                </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
      headingArea: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      },
      cbButton: {
        position: 'absolute',
        backgroundColor: '#f27935',
        bottom: -50,
        width:'124%',
        textAlign: 'center',
        justifyContent: 'center',
        display:'flex',
        padding: 10,
        borderRadius:0,
        left:-15,
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
        marginBottom: 45,
        position: 'relative',
        paddingBottom:50,
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
        color:'black',
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
    cashbackDeals: {
        marginTop:20,
    },
    cbTxt: {
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
        fontSize:12,
    }
})

export default Deals;
