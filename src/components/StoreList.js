import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MyStore = () => {
    const data = [
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/2953.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/758.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/2953.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/758.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/2953.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/758.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/2953.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/758.jpg',
            cashback: '20%',
        },
        {
            name: '1Mg',
            image: 'https://images.freekaamaal.com/store-images/758.jpg',
            cashback: '20%',
        }
    ]
    return (
        data.map((item, i) => {
            return <View style={styles.storeImgCon} key={i}>
                <View style={styles.storICon} >
                    <Image source={{ uri: item.image }} style={{ width: 92, height: 40, resizeMode: 'contain' }} />
                </View>
                <Text style={styles.cbText}>{item.cashback} <Text style={styles.cbMessage}>Cashback</Text></Text>
            </View>

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
