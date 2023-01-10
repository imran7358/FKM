import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const END_URL = '/cashback/click-history';


const ClickHistory = ({navigation}) => {
    const [history, setHistory] = useState([]);
    const [description, setDescription] = useState({
        desc: '',
    });

    const getClickHistory = async()=>{
        const userToken = await AsyncStorage.getItem("userToken")
        axios.post(Config.API_URL + END_URL,{
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
        },
        {
            headers : {
              Authorization:userToken,
            },
        }).then(({data})=>{
            setHistory(data.response.click_history);
            setDescription({
                desc: data.response.top_desc,
            });
        }).catch((error)=>{
            console.log(error);
        });
    };

    useEffect(()=>{
        getClickHistory();
    }, [])
    return (
       <SafeAreaView style={styles.bgWhite}>
        <ScrollView style={styles.bgWhite}>
        <View style={styles.container}>
         <View style={styles.topContent}>
            <Text style={styles.topText}>{description.desc}</Text>
         </View>
         <View style={styles.recordCon}>
            <View style={styles.headingCond}>
                <View style={styles.srNo}>
                    <Text style={styles.barTxt}>SN</Text>
                </View>
                <View style={styles.storeName}>
                    <Text style={styles.barTxt}>Store</Text>
                </View>
                <View style={styles.click}>
                    <Text style={styles.barTxt}>Clicks</Text>
                </View>
                <View style={styles.date}>
                    <Text style={styles.barTxt}>Date</Text>
                </View>
            </View>
           <View style={styles.recordList}>
            {
                history .length ? history.map((item, i )=>{
                    return <View style={styles.innerReocrd} key={i}>
                    <Text style={styles.srNo}>1</Text>
                    <Text style={styles.storeName}>{item.store}</Text>
                    <Text style={styles.click}>{item.num_of_time}</Text>
                    <Text style={styles.data}>{item.last_click}</Text>
                </View>
                })
                : null
            }
           </View>
          </View>
        </View>
        </ScrollView>
       </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container : {
        padding: 24,
        flex: 1,
    },
    bgWhite: {
        backgroundColor: '#fff',
        flex: 1,
    },
    topContent: {
        backgroundColor: '#F7F7F7',
        borderRadius: 3,
        padding: 15,
    },
    topText: {
        lineHeight: 22,
        fontSize: 12,
    },
    recordCon: {
        marginTop: 20,
        backgroundColor: '#FAFAFA',
    },
    headingCond: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        padding: 10,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    barTxt: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    innerReocrd: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding: 10,
    },
    srNo: {
        width: '10%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        textAlign: 'center',
    },
    click: {

        width: '20%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',

    },
    date:{

        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    storeName: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    alterColor: {
        backgroundColor: '#EDEDED'
    }
   
})

export default ClickHistory;
