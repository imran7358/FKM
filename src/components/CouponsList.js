import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

export default (Coupons = ({
    style,
    item,
    imageKey,
    onPress,
    index,
    active,
    local,
}) => {
    return (

        <TouchableOpacity
            style={[styles.trendingCp]}
            onPress={() => onPress(item)}>
            
                <View style={[styles.imageContainer, styles.shadow]}>
                    <Image
                        style={styles.videoPreview}
                        source={{ uri: item[imageKey] }}
                    />
                </View>
                <Text style={styles.couponDesc}>{item.desc}</Text>
        </TouchableOpacity>

    );
});




const styles = StyleSheet.create({
    trendingCp: {
        width: 170,
        marginRight: 15,
        borderRadius: 6,
        marginTop: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    videoPreview: {
        width: 100,
        height: 30,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,

    },

    couponDesc: {
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        fontSize:11,
        lineHeight: 18,
    }
 


});