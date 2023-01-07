import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Config from 'react-native-config';
const END_URL = "/home/home";
import axios from 'axios';
import { TouchableOpacity } from "react-native-gesture-handler";

const MyStore = ({navigation}) => {

    const [data, setData] = useState([])
    const getStore = () =>{
        axios.post(Config.API_URL + END_URL, {
            'page': '1',
            'apiAuth': Config.API_AUTH,
            'device_type': 4,
        }).then(({data})=>{
            setData(data.response.cbstores)
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getStore()
    }, [])
    return (
        data.map((item, i) => {
            return <TouchableOpacity style={styles.storeImgCon} key={i} onPress = {()=> navigation.navigate({name:'StoreDetails',params:{storeSlug:item.store_slug}})}>
                <View style={styles.storICon} >
                    <Image source={{ uri: item.store_image }} style={{ width: 92, height: 40, resizeMode: 'contain' }} />
                </View>
                <Text style={styles.cbText}>{Number(item.cashback_amount).toFixed(0)} <Text style={styles.cbMessage}>Cashback</Text></Text>
            </TouchableOpacity>

        })

    );
}

const styles = StyleSheet.create({
    storICon: {
        width: 104,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    storeMainCon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    storeImgCon: {
        justifyContent: 'center',
        marginBottom: 20,
    },
    cbText: {
        fontWeight: '900',
        color: '#E22020',
        marginTop: 10,
    },
    cbMessage: {
        fontWeight: '400',
        color: '#333'
    }

})

export default MyStore;
