import React, { useState } from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CashbackInner = ({title,description}) => {
        const [show, setShow] = useState(false);
    return (
        <View style={styles.myFaq}>
           <View style={[styles.faqList]}>
              <TouchableOpacity onPress={()=> setShow(!show)}>
              <View style={styles.faqName}>
                    <Image source={require('../assets/images/cbWorks.png')} style={{height:35, width:35, resizeMode: 'contain', marginRight: 7,}}/>
                    <Text style={{fontSize: 14, fontWeight: '500',}}>{title}</Text>
                </View>
              </TouchableOpacity>
              <Image source={require('../assets/images/faqarrow.png')} style={styles.rArrow}/>
               </View>
               {
                    show ?  <View style={styles.desc}>
                    <Text style={styles.allDesc}>{description}</Text>
                </View> : null
                   }
        </View>
    )
}

const styles = StyleSheet.create({

    myFaq: {
        backgroundColor:'#FFECE2',
        borderRadius: 6,

    },
    faqList: {
        backgroundColor: '#fff',
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        margin: 10,
    },
    faqName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    rArrow: {
        width: 15,
         height: 15,
         resizeMode:'contain',
         position: 'absolute',
         right: 20,
    },
    desc: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius:6,
        padding: 15,
    },
    allDesc: {
        lineHeight: 18,
    }
});

export default CashbackInner;
