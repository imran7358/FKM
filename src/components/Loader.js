import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
const Loader = () => {
    return (
        <View style={styles.conatiner}>
            <Image source={require('../assets/images/loader.gif')} style={styles.laoderimg}/>
        </View>
    );
};
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    laoderimg: {
        width:50,
        height:50,
        resizeMode: 'contain',
    },
});
export default Loader;
