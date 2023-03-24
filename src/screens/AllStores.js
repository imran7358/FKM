import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { centerContainer } from '../assets/styles/common';
import Config from "react-native-config";
import axios from 'axios';
import Loader from '../components/Loader';
const ENDPOINT = '/store/allstores';

const AllStores = ({ navigation }) => {
    const [store, setStore] = useState([]);
    const [page, setPage] = useState(1)
    const [noData, setNoData] = useState(false)
    
    const getStore = () => {
        axios.post(Config.API_URL + ENDPOINT, { 
            apiAuth: Config.API_AUTH,
            device_type:"4",
            page:page
        }
        ).then(({ data }) => {
            if (data.response.allstores && data.response.allstores.length)
            {
                setStore([...store, ...data.response.allstores]);
            }
            else {
                    if(!data.response.allstores.length){
                        setNoData('No data found !!')
                    }
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
       
            getStore();
        
      
       
    }, [page])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                <View style={styles.container}>
                    <View style={styles.storeInner}>
                        {
                            store.length ? store.map((item, i) => {
                                console.log("Store name", item)
                                return <View style={styles.storeBox} key={i}>
                                    <TouchableOpacity onPress={() => navigation.navigate({ name: 'StoreDetails', params: { storeSlug: item.store_slug } })}>
                                        <View style={styles.logoContinaer}>
                                            <View>
                                                <Image source={{ uri: item.store_img_url}} style={styles.logo} />
                                            </View>
                                            <View><Text style={styles.logoTxt}>{item.store_name}</Text></View>
                                            {
                                                item.is_cashback == "1" ? <View style={styles.btnContainer}>
                                                <Text style={styles.cbBtn}>{item.cashback_amount} Cashback</Text>
                                            </View> :<View style={styles.btnContainer}>
                                                <View style={{padding:12, justifyContent:'center', display:'flex', alignContent:'center'}}>
                                                    <Text style={styles.cbBtn1}>No</Text>
                                                    <Text style={styles.cbBtn1}>Cashback</Text>
                                                     </View>
                                            </View>
                                            }
                                            
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
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        flex: 2,
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
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
        alignContent:'center',
        textAlign:'center',
    },
    cbBtn1: {
        borderRadius: 6,
        fontWeight: '800',
        color: '#fff',
        fontSize: 12,
        alignContent:'center',
        textAlign:'center',
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
export default AllStores;
