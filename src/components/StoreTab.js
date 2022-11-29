import React from "react";
import {View, Text, StyleSheet} from "react-native";

const StoreList = () => {
    const data = [
        {name: 'All Store'},
        {name: 'Beauty Products'},
        {name: 'Toys & Gift'},
        {name:'Kids'}, {name: 'food'},
    ]
    return (
        
            data.map((item,i)=>{
                return <View key={i} style={styles.btn}>
                    <Text style = {styles.btTxt}>{item.name}</Text>
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
    }
})

export default StoreList;
