import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet} from "react-native";
import Config from 'react-native-config';
const END_URL = "/home/home";
import axios from 'axios';
import { TouchableOpacity } from "react-native-gesture-handler";


const StoreList = (props) => {
    const [tab, setTab] = useState('All');
    const [active, setActive] = useState(true);
    const getTab = () => {
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: 4,
            'sponsored_count': '0',
            page: '',
        }).then(({data})=>{
            setTab(data.response.store_tabbing)
        }).catch((error)=>{
            console.log("Error", error)
        })
    }


    useEffect(()=>{
        getTab()
        console.log("My Tab", props.storeTab)
    },[props.storeTab])
    return (
            props.storeTab.map((item,i)=>{
                return <View key={i} >
                    <Text  style={item == tab ? [styles.tabList,styles.activeTab] : [styles.tabList,styles.btn]} onPress={(ev)=>{setActive(item)}}>{item.name}</Text>
                </View>
            })
        
    )

}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 10,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btTxt: {
        color: '#333',
        fontSize: 14,
    },
    activeTab: {
        color: '#F27935',
        fontWeight: '900',
        borderColor: '#f27935',
        borderBottomWidth: 1,
        backgroundColor: 'red',
    },
})

export default StoreList;
