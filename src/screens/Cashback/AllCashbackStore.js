import axios from "axios";
import React from "react";
import { View, Text,  StyleSheet, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Config from "react-native-config";
const END_URL = '/cashback/cashbackstore';
import { useEffect, useState} from "react";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/Loader";

const AllStores = ({navigation})=> {
    const [success, setSucess] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [store, setStore] = useState([]);
    const [page, setPage] = useState(1)
    
const userToken = useSelector(state => state.user.userToken);

const getCashbackDeals = (navigation) => {
    setLoader(true)
    request.post(navigation, Config.API_URL + END_URL, {
        apiAuth: Config.API_AUTH,
        device_type: Config.device_type,
        page,
        "option":"hundredpercent",
    },{
        headers: {
            Authorization: userToken,
        },
    }).then(({data})=>{
        setStore([...store, ...data.response.cahsbackstore])
        console.log("Store Data", data.response.cahsbackstore)
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
        
        
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.productContainer}>
                    <View style={styles.storeInner}>
                        {
                            store.length ? store.map((item, i) => {
                                return <View style={styles.storeBox} key={i}>
                                    <TouchableOpacity onPress={() => navigation.navigate({ name: 'StoreDetails', params: { storeSlug: item.name } })}>
                                        <View style={styles.logoContinaer}>
                                            <View>
                                                <Image source={{ uri: item.img_url}} style={styles.logo} />
                                            </View>
                                            <View><Text style={styles.logoTxt}>{item.name}</Text></View>
                                            <View style={styles.btnContainer}>
                                                <Text style={styles.cbBtn}>₹ {item.cahsback}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }) : <Loader />
                        }
                    </View>
                </View>
                <View style={styles.loaderContainer}>
                        <TouchableOpacity style={[styles.LoadMore, styles.padding]} onPress={() => setPage(page + 1)}>
                            <View>
                                <Text style={styles.loadTxt}>Load More</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
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
    cashbackDeals: {
        marginTop:20,
    },
    storeInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    storeBox: {
        borderWidth: 1,
        borderColor: '#D8D8D8',
        width: '47%',
        borderRadius: 6,
        padding: 20,
        marginBottom: 40,
    },
    logoContinaer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 112,
        height: 66,
        resizeMode: 'contain',
    },
    logoTxt: {
        fontSize: 14,
        fontWeight: '800',
        marginTop: 20,
        marginBottom: 30,
    },

    cbBtn: {
        padding: 12,
        borderRadius: 6,
        fontWeight: '800',
        color: '#fff',
        fontSize: 12,
    },
    btnContainer: {
        width: 112,
        backgroundColor: '#f27935',
        borderRadius: 6,
        alignItems: 'center',
        position: 'absolute',
        bottom: -35,
    },
})

export default AllStores;
