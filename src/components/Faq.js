import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";

const FAQ = () => {

    return (
        <View style={styles.myFaq}>
           <View style={[styles.faqList, styles.margin20]}>
            <View style={styles.faqName}>
                <Image source={require('../assets/images/cbWorks.png')} style={{height:35, width:35, resizeMode: 'contain', marginRight: 7,}}/>
                <Text style={{fontSize: 14, fontWeight: '500',}}>This is how your Cashback Works!</Text>
            </View>
            <Image source={require('../assets/images/faqarrow.png')} style={{width: 15, height: 15, resizeMode:'contain'}}/>
           </View>
           <View style={[styles.faqList,styles.margin20]}>
            <View style={styles.faqName}>
                <Image source={require('../assets/images/cbWorks.png')} style={{height:35, width:35, resizeMode: 'contain', marginRight: 7,}}/>
                <Text style={{fontSize: 14, fontWeight: '500',}}>This is how your Cashback Works!</Text>
            </View>
            <Image source={require('../assets/images/faqarrow.png')} style={{width: 15, height: 15, resizeMode:'contain'}}/>
           </View>
           <View style={styles.faqList}>
            <View style={styles.faqName}>
                <Image source={require('../assets/images/cbWorks.png')} style={{height:35, width:35, resizeMode: 'contain', marginRight: 7,}}/>
                <Text style={{fontSize: 14, fontWeight: '500',}}>This is how your Cashback Works!</Text>
            </View>
            <Image source={require('../assets/images/faqarrow.png')} style={{width: 15, height: 15, resizeMode:'contain'}}/>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({

    myFaq: {
        backgroundColor:'#FFECE2',
        borderRadius: 6,
        padding: 20,
    },
    faqList: {
        backgroundColor: '#fff',
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    faqName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    margin20: {
        marginBottom:20,
    }

})

export default FAQ;
