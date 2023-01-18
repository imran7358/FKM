import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const END_URL = '/cashback/referral-summary';
import Loader from '../../../components/Loader';



const Confirmed = ({setTop}) => {

    const [confirmed, setConfirmed] = useState([])
    const [desc, setDesc] = useState('');
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const [noData, setNoData] = useState('');

    const getConfirmed = async() =>{
        setLoader(true);
        const userToken = await AsyncStorage.getItem("userToken");
        axios.post(Config.API_URL + END_URL,{
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: 'confirm',
            page,
        },{
            headers:{
                Authorization: userToken,
            },
        }).then(({data})=>{
            if (data.response.confirm && data.response.confirm.length){
                setConfirmed([...confirmed, ...data.response.confirm]);
            }
            else {
                if (!data.response.confirm.length){
                    setNoData('No record found !');
                }
                setLoadMore(false);
            }
            setTop(data.response.top_desc);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoader(false);
        });
    };

    useEffect(()=>{
        getConfirmed();
    },[page])

    return (
        
        <View style={styles.container}>
            <ScrollView>
             <View style={styles.recordCon}>
             <View style={styles.headingCond}>
                 <View style={styles.srNo}>
                     <Text style={styles.barTxt}>Id</Text>
                 </View>
                 <View style={styles.storeName}>
                     <Text style={styles.barTxt}>Store</Text>
                 </View>
                 <View style={styles.amount}>
                     <Text style={styles.barTxt}>Amount</Text>
                 </View>
                 <View style={styles.status}>
                     <Text style={styles.barTxt}>Date</Text>
                 </View>
             </View>
             <View style={styles.recordList}>
             {
                confirmed.length ? confirmed.map((item, i)=>{
                    return <View style={styles.innerReocrd} key={i}>
                    <Text style={styles.srNo}>{item.id}</Text>
                    <Text  style={styles.storeName}>{item.store}</Text>
                    <Text style={styles.amount}>{item.amount}</Text>
                    <Text style={styles.status}>{item.updated_time}</Text>
                </View>
                })
                : null
             }
             </View>

             </View>
            </ScrollView>
            {
                    loader ?
                    <View style={styles.loadContainer}>
                        <Loader />
                    </View>
                    : null
                }
                {
                    <View style={styles.noData}>
                    <Text>{noData}</Text>
                  </View>
                }

            {
                loadMore ?
                <TouchableOpacity onPress={(e) => {
                    setPage(page + 1);
                }}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginTxt}>Load More</Text>
                    </View>
                </TouchableOpacity>
                : null
            }
        </View>
        
    )

}

const styles = StyleSheet.create({
    container: {

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
        justifyContent: 'space-between',
        padding: 10,
    },
    srNo: {
        width: '20%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    date: {

        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    storeName: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
    amount: {
        width: '25%',
        textAlign: 'center',
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F27935',
        padding: 10,
        marginTop: 30,
        borderRadius: 6,
        fontWeight: 'bold',
        height: 50,
    },
    loginTxt: {
        fontWeight: '900',
        color: '#fff',
    },
    noData: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 20,
    },

});

export default Confirmed;
