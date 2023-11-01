import axios from "axios";
import React from "react";
import {Platform, View, Text,  StyleSheet, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Config from "react-native-config";
const END_URL = '/cashback/cashbackstore';
import { useEffect, useState} from "react";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/Loader";

const PopularCashback = ({navigation})=> {
    const deviceType = Platform.OS=='ios' ? 4 : 3 ;
    const [success, setSucess] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [store, setStore] = useState([]);
    const [page, setPage] = useState(1);
    const [noData, setNoData] = useState(false);
const userToken = useSelector(state => state.user.userToken);

const getCashbackDeals = () => {
    setLoader(true);
    request.post(navigation, Config.API_URL + END_URL, {
        apiAuth: Config.API_AUTH,
        device_type: deviceType,
        page,
        option:'popular',
    },{
        headers: {
            Authorization: userToken,
        },
    }).then(({data})=>{
        console.log('Popular', data);
        if (data.response.cahsbackstore && data.response.cahsbackstore.length)
       {
        setStore(data.response.cahsbackstore);
       }
       else {
        setNoData(true);
       }
    }).catch((error)=>{
        console.log("Error Aaya hai", error);
    }).finally(()=>{
        setLoader(false);
    })
}

useEffect(()=>{
    getCashbackDeals()
},[])
    return (
        <View style={styles.container}>
            <View style={styles.storeCon}>
                        {
                            store.length ? store.map((item, i) => {
                                return <View style={styles.storeBox} key={i}>
                                    <TouchableOpacity onPress={() => navigation.navigate({ name: 'StoreDetails', params: { storeSlug: item.name } })}>
                                        <View style={styles.logoContinaer}>
                                            <View>
                                                <Image source={{ uri: item.img_url}} style={styles.logo} />
                                            </View>
                                            <View><Text style={styles.logoTxt}>{item.name}</Text></View>
                                            <View style={styles.cbButton}>
                                                <Text style={styles.cbBtn}>{item.cahsback}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }) :  null
                        }
                </View>
                {
                    noData ? <View style={styles.noData}><Text>No data found !!</Text></View> : null 
                }

                </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1,
    },
      loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width:'100%',
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

    noData: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 20,
        justifyContent: 'center',
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

    storeCon:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent:'center',
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
    cbButton: {
        position: 'absolute',
        backgroundColor: '#f27935',
        bottom: -30,
        width:'134%',
        textAlign: 'center',
        justifyContent: 'center',
        display:'flex',
        padding: 10,
        borderRadius:0,
        left:-20,
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
        color:'black',
        fontSize: 14,
        fontWeight: '800',
        marginTop: 10,
        marginBottom: 20,
    },

    cbBtn: {
        borderRadius: 6,
        fontWeight: '800',
        color: '#fff',
        fontSize:12,
        textAlign:"center",
    },
    btnContainer: {
        width: '100%',
        backgroundColor: '#f27935',
        borderRadius: 6,
        alignItems: 'center',
        position: 'absolute',
        bottom: -35,
    },
})

export default PopularCashback;
