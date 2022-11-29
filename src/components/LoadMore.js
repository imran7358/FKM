import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoadMore = () => {

    return (
       <TouchableOpacity style={styles.LoadMore}>
         <View>
            <Text style={styles.loadTxt}>Load More</Text>
        </View>
       </TouchableOpacity>
    )


}

const styles = StyleSheet.create({
    LoadMore: {
        backgroundColor: '#f27935',
        borderRadius: 6,
        padding: 15,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadTxt: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
        textTransform: 'uppercase',
    }
})
export default LoadMore;
