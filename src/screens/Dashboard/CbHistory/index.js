import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import PendingCashback from './Pending';
import AllCashback from './All';
import Confirmed from './Confirmed';
import Declined from './Declined';
import axios from 'axios';
import Config from 'react-native-config';
const END_URL = '/cashback/cashback-history';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CashbackHistory = () => {
    const [active, setActive] = useState(true);
    const [status, setStatus] = useState('all');
    const [load, setLoad] = useState(1);
    const [allcashback, setAllCashback] = useState([]);
    const setStatusFilter = status => {
        setStatus(status);
    };
    const ListTab = [
        {
            status: 'all',
        },
        {
            status: 'pending',
        },
        {
            status: 'confirm',
        },
        {
            status: 'decline',
        },

    ];

    const getCashbackHistory = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: status,
            page: load,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
                setAllCashback(data.response.all);
                console.log('All Cashback', data.response.all);
            }).catch((error) => {
                console.log(error);
            });

    };

    useEffect(() => {
        getCashbackHistory();
        console.log("tab", status);
        console.log("Page", load);
    }, [status]);
    return (
        <SafeAreaView style={styles.bgWhite}>
            <ScrollView style={styles.bgWhite}>
                <View style={styles.container}>
                    {/* {
                        allcashback.length ? allcashback.map((item,i)=>{
                            return <View><Text>{item.transaction_date}</Text></View>
                        }) : null
                    } */}
                    <View style={styles.topContent}>
                        <Text style={styles.topText}>Below you will find the list of the latest stores you’ve visited.
                            So that you can track the stores you have looked at.</Text>
                    </View>

                    <View style={styles.historyTab}>
                        {
                            ListTab.map((e, i) => (
                                <TouchableOpacity key={i} style={status === e.status && styles.activeTab} onPress={() => setStatusFilter(e.status)}>
                                    <Text style={[status === e.status && styles.txtActive, styles.preTab]}>{e.status}</Text>
                                </TouchableOpacity>

                            ))
                        }
                    </View>

                    <View style={styles.recordCon}>
                        {
                            status === 'all' ?
                                <AllCashback allCashback = {allcashback}/>
                                : null
                        }
                        {
                            status === 'pending' ?

                                <PendingCashback />

                                : null
                        }
                        {
                            status === 'confirm' ?

                                <Confirmed />
                                : null
                        }
                    
                        {
                            status === 'declined' ?

                                <Declined />

                                : null
                        }

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
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
        fontSize: 14,
    },
    recordCon: {
        marginTop: 20,
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
        width: '10%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    click: {

        width: '20%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    date: {

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
        textTransform:'capitalize',
    },
    preTab:{
        textTransform: 'capitalize',
    }

})

export default CashbackHistory;
