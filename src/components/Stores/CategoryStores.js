import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = '/category/category-detail';
import Loader from '../../components/Loader';
import axios from 'axios';

const Stores = ({ navigation, route}) => {
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [noData, setNoData] = useState(false);
    const [stores, setStores] = useState([]);


    const getStores = () => {
        setLoader(true);
        axios.post(Config.API_URL + END_URL, {
            'apiAuth': Config.API_AUTH,
            'cate_slug': route,
            'device_type': '4',
            page,
            'option': 'stores',

        }).then(({data})=>{

            if (data.response.stores && data.response.stores.length){
                setStores([...stores, ...data.response.stores]);
            }

            else{
                setNoData(true);
            }
        }).catch((error)=>{
           console.log(error)
        }).finally(()=>{
            setLoader(false)
        })

    }

    useEffect(()=>{

        getStores();

    },[page,route])

    return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.storeInner}>
                            {
                                stores.length ? stores.map((item, i) => {
                                    return <View style={styles.storeBox} key={i}>
                                        <TouchableOpacity onPress={() => navigation.navigate({ name: 'StoreDetails', params: { storeSlug: item.store_name } })}>
                                            <View style={styles.logoContinaer}>
                                                <View>
                                                    <Image source={{ uri: item.store_img_url }} style={styles.logo} />
                                                </View>
                                                <View><Text style={styles.logoTxt}>{item.store_name}</Text></View>
                                                <View style={styles.btnContainer}>
                                                    {
                                                    item.is_cashback=='1' ?
                                                  <>
                                                  {
                                                    item.rate_type=='1' ?
                                                    <Text style={styles.cbBtn}>{item.cashback_amount} Cashback</Text>
                                                    :
                                                    <Text style={styles.cbBtn}>₹ {item.cashback_amount} Cashback</Text>
                                                  }
                                                  </>
                                                   
                                                    :
                                                    <Text style={styles.cbBtn}>No Cashback</Text>
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }) : <Loader />
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        flex:1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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
        color:'black',
        fontSize: 14,
        fontWeight: '800',
        marginTop: 20,
        marginBottom: 30,
    },

    cbBtn: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
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

});

export default Stores;
