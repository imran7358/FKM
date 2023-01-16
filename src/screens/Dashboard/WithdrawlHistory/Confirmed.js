import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Config from 'react-native-config';
const END_URL = '/cashback/withdrawal-history';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Loader from '../../../components/Loader';
import axios from 'axios';

const Confirmed = ({setTop}) => {

    const [allcb, setAllCb] = useState([]);
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const [noData, setNoData] = useState('');
    const [loader, setLoader] = useState(false);

    const getData = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        setLoader(true);
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: 'confirm',
            page,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
                if (data.response.all && data.response.all.length) {
                    setAllCb([...allcb, ...data.response.all]);
                }
                else {
                    if (!data.response.all.length) {
                        setNoData('No records found!');
                    }
                    setLoadMore(false);
                }
                setTop('empty content');
            }).catch((error) => {
                console.log(error);
            }).finally(()=>{
                setLoader(false);
            });

    };

    useEffect(() => {
        getData();
    }, [page])



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
             <View style={styles.innerReocrd}>
                 <Text style={styles.srNo}>1</Text>
                 <Text  style={styles.storeName}>xyxxcrew</Text>
                 <Text style={styles.amount}>4</Text>
                 <Text style={styles.status}>500</Text>
                 <Text style={styles.status}>xyxxcrew</Text>
                 

             </View>
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
