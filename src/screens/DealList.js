import React from "react";
import { View,Text, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import AllDeals from "../components/AllDeals";
const DealList = ({navigation}) => {
    return (
            <View style ={{marginTop: 50,}}>
           <AllDeals style={{padding: 24,}}/>
        </View>

    )

}

const styles = StyleSheet.create({
    container:{
        padding: 24,
    }
})

export default DealList;
