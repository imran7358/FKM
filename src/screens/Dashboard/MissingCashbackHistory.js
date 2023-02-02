import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Config from 'react-native-config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const END_URL = '/cashback/missing-history';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';

const CashbackMissingHistory = ({ navigation }) => {
    const [missing, setMissing] = useState([]);
    const [loader, setLoader] = useState(false);
    const [loadMore, setLoadeMore] = useState(true);
    const [noData, setNoData] = useState('');
    const [page, setPage] = useState(1);

    const userToken = useSelector(state => {
        return state.user.userToken;
    });

    const getData = async () => {
        setLoader(true);
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            page,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
                if (data.response.missing_history && data.response.missing_history.length) {
                    setMissing(data.response.missing_history);
                }
                else {
                    if (!data.response.missing_history.length) {
                        setNoData('No records found!');
                    }

                    setLoadeMore(false);
                }
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
        <SafeAreaView style={styles.bgWhite}>
            <View style={styles.container}>
                <ScrollView style={styles.bgWhite} horizontal={true}>
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
                            <View style={styles.date}>
                                <Text style={styles.barTxt}>Order Date</Text>
                            </View>
                            <View style={styles.date}>
                                <Text style={styles.barTxt}>Report Date</Text>
                            </View>
                            <View style={styles.status}>
                                <Text style={styles.barTxt}>status</Text>
                            </View>
                        </View>
                        <View style={styles.recordList}>
                            {
                                missing.length ? missing.map((item, i) => {
                                    return <View style={styles.innerReocrd} key={i}>
                                        <Text style={styles.srNo}>{i + 1}</Text>
                                        <Text style={styles.storeName}>{item.store}</Text>
                                        <Text style={styles.amount}>{item.amount}</Text>
                                        <Text style={styles.date}>{item.order_date.slice(0, 10)}</Text>
                                        <Text style={styles.date}>{item.reported_date.slice(0, 10)}</Text>
                                        <Text style={styles.status}>{item.status}</Text>
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
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    bgWhite: {
        backgroundColor: '#fff',
    },
    topContent: {
        backgroundColor: '#F7F7F7',
        borderRadius: 3,
        padding: 15,
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
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
        justifyContent: 'space-between',
        padding: 10,
    },
    srNo: {
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 12,
    },
    amount: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 12,

    },
    date: {

        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 12,

    },
    storeName: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 12,

    },
    status: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    },
    alterColor: {
        backgroundColor: '#EDEDED',
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

export default CashbackMissingHistory;
