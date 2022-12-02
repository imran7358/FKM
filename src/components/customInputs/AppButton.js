import React from "react";
import { View, StyleSheet, Text} from "react-native";

const AppButton = () => {
    return(
        <View style={styles.appButton}>
            <Text style={styles.btnTxt}>Shop & Earn Cashback</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    appButton: {
        backgroundColor: '#f27935',
        borderRadius: 6,
        alignItems: 'center',
        alignContent: 'center',
    },
    btnTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 14,
    }

})

export default AppButton;
