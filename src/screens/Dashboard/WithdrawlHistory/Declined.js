import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = '/cashback/withdrawal-history';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../../../components/Loader';

const Declined = ({ setTop }) => {
    const [details, setDetails] = useState([]);
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const [noData, setNoData] = useState('');
    const [loader, setLoader] = useState(false);
    const getData = async () => {
        setLoader(true);
        const userToken = await AsyncStorage.getItem("userToken");
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: 'decline',
            page,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
                if (data.response.decline && data.response.decline.length) {
                    setDetails([...details, ...data.response.decline]);
                }
                else {
                    if (!data.response.decline.length) {
                        setNoData('No records found!');
                    }
                    setLoadMore(false);
                }
                setTop(data.response.top_desc);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoader(false);
            });

    };
    useEffect(() => {
        getData();
    }, [page])

    return (

        <ScrollView>
            <View style={styles.container}>
                <View style={styles.recordCon}>
                    <View style={styles.headingCond}>
                        <View style={styles.amount}>
                            <Text style={styles.barTxt}>Amount</Text>
                        </View>
                        <View style={styles.status}>
                            <Text style={styles.barTxt}>Type</Text>
                        </View>
                        <View style={styles.status}>
                            <Text style={styles.barTxt}>Date</Text>
                        </View>
                        <View style={styles.reason}>
                            <Text style={styles.barTxt}>Reason</Text>
                        </View>

                    </View>
                    <View style={styles.recordList}>
                        {
                            details.length ? details.map((item, i) => {
                                return <View style={styles.innerReocrd} key={i}>
                                    <Text style={styles.storeName}>{item.amount}</Text>
                                    <Text style={styles.amount}>{item.type}</Text>
                                    <Text style={styles.status}>{item.date}</Text>
                                    <Text style={styles.reason} numberOfLines={1}>{item.reason}</Text>
                                </View>
                            })
                                : null
                        }
                        {
                            loader ?
                                <View style={styles.loadContainer}>
                                    <Loader />
                                </View>
                                : null
                        }

                    </View>

                </View>
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
                        <Text style={styles.loginTxt}>Loader More</Text>
                    </View>
                </TouchableOpacity>
                :
                null
               }
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    noData: {
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        width: '25%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    date: {

        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    reason:{
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    storeName: {
        width: '25%',
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
        width: '25%',
        textAlign: 'center'

    },
    amount: {
        width: '25%',
        textAlign: 'center',
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F27935',
        padding: 10,
        borderRadius: 6,
        fontWeight: 'bold',
        height: 50,
    },
    loginTxt: {
        fontWeight: '900',
        color: '#fff',
    },

})

export default Declined;
