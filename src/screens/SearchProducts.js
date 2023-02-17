import React from "react";
import { View, Text, StyleSheet, TextInput} from "react-native";
import Config from "react-native-config";
import axios from "axios";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
const END_URL = "/search/search"


const SearchProduct = ({navigation}) =>{
    const getData = () =>{
        console.log("Path", Config.API_URL,+ END_URL)
        axios.post(Config.API_URL + END_URL,{
            apiAuth : Config.API_AUTH,
            'keyword' :"flip",
        }).then(({data})=>{
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getData();

    },[])
    return (
        <ScrollView style={styles.container}>
           <View style={styles.searchCont}>
           <TextInput style={styles.searchTxt} placeholder ="Search Deals & Store ..."/>
           </View>
        </ScrollView>
    )

}

 const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    searchTxt: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 15,

    }
 })

export default SearchProduct
