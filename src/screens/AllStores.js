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
    useEffect(() => {
        getStore();
    }, [])

    const getStore = () => {
        axios.post(Config.API_URL + ENDPOINT, { apiAuth: Config.API_AUTH }
        ).then(({ data }) => {
            setStore((data.response.allstores));
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                <View style={styles.container}>
                    <View style={styles.storeInner}>
                        {
                            store.length ? store.map((item, i) => {
                                return <View style={styles.storeBox} key={i}>
                                    <TouchableOpacity onPress={() => navigation.navigate({ name: 'StoreDetails', params: { storeSlug: item.store_slug } })}>
                                        <View style={styles.logoContinaer}>
                                            <View>
                                                <Image source={{ uri: item.store_image }} style={styles.logo} />
                                            </View>
                                            <View><Text style={styles.logoTxt}>{item.store_name}</Text></View>
                                            <View style={styles.btnContainer}>
                                                <Text style={styles.cbBtn}>{item.cashback_amount}</Text>
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

});
export default AllStores;
