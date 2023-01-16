import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const END_URL = '/cashback/cashback-history';



const Confirmed = ({setTop}) => {

    const [confirmed, setConfirmed] = useState([])
    const [desc, setDesc] = useState('');

    const getConfirmed = async() =>{
        const userToken = await AsyncStorage.getItem("userToken");
        axios.post(Config.API_URL + END_URL,{
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: 'confirm',
            page: '1',
        },{
            headers:{
                Authorization: userToken,

            }
        }).then(({data})=>{
            // console.log("confrimdata", data.response.confirm)
            setConfirmed(data.response.confirm);
            setTop(data.response.top_desc);
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getConfirmed();
    },[])

    return (
        
        <ScrollView horizontal={true}>
        <View style={styles.container}>
             <View style={styles.recordCon}>
             <View style={styles.headingCond}>
                 <View style={styles.srNo}>
                     <Text style={styles.barTxt}>SN</Text>
                 </View>
                 <View style={styles.storeName}>
                     <Text style={styles.barTxt}>Store</Text>
                 </View>
                 <View style={styles.amount}>
                     <Text style={styles.barTxt}>Amount</Text>
                 </View>
                 <View style={styles.status}>
                     <Text style={styles.barTxt}>Status</Text>
                 </View>
                 <View style={styles.status}>
                     <Text style={styles.barTxt}>Date</Text>
                 </View>
                
             </View>
             <View style={styles.recordList}>
             {
                confirmed.length ? confirmed.map((item, i)=>{
                    return <View style={styles.innerReocrd} key={i}>
                    <Text style={styles.srNo}>{i + 1}</Text>
                    <Text  style={styles.storeName}>{item.store_name}</Text>
                    <Text style={styles.amount}>{item.amount}</Text>
                    <Text style={styles.status}>{item.status}</Text>
                    <Text style={styles.status}>{item.transaction_date}</Text>
                    
   
                </View>
                })
                : null
             }
             </View>

             </View>
            
        </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container : {
       
    },
    bgWhite: {
        backgroundColor: '#fff',
    },
    topContent: {
        backgroundColor: '#F7F7F7',
        borderRadius: 3,
        padding: 15,
    },
    topText: {
        lineHeight: 22,
        fontSize: 14,
    },
    recordCon: {
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
        width: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        textAlign: 'center',
    },
    click: {

        width: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',

    },
    date:{

        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    storeName: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    alterColor: {
        backgroundColor: '#EDEDED'
    },
    historyTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: '100%',
    },
    f16: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    activeTab: {
       color: '#F27935',
       fontWeight: '900',
       borderColor: '#f27935',
       borderBottomWidth: 1,
    },
    txtActive: {
        color: '#f27935',
        fontSize: 16,
        fontWeight: '900',
    },
    status: {
        width: 100,
        textAlign: 'center'
        
    },
    amount: {
        width: 100,
        textAlign: 'center'
    }
   
})


export default Confirmed;
