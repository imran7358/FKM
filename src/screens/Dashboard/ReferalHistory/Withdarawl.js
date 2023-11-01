import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';
const END_URL = '/cashback/referral-summary';
import Loader from '../../../components/Loader';
import { useSelector } from 'react-redux';
import request from '../../../utils/request';
const Withdrawal = ({ setTop,navigation }) => {

    const [decline, setDecline] = useState([]);
    const [desc, setDesc] = useState('');
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [noData, setNoData] = useState(false);

    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const getDecline = async () => {
        // Alert.alert('dec')
        setLoader(true);
        request.post(navigation,Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: 'referral_withdrawal',
            page,
        }, {
            headers: {
                Authorization: userToken,
            }
        }).then(({ data }) => {
            if (data.response.decline && data.response.decline.length) {
                setDecline([...decline, ...data.response.decline]);
            }
            else {
               setNoData(true);
            }

        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoader(false);
        });
    }
    useEffect(() => {
        getDecline();
    }, [page])


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
                            <Text style={styles.barTxt}>Time</Text>
                        </View>

                    </View>
                    <View style={styles.recordList}>
                        {
                            decline.length ? decline.map((item, i) => {
                                return <View style={styles.innerReocrd} key={i}>
                                    <Text style={styles.srNo}>{item.id}</Text>
                                    <Text style={styles.storeName}>{item.store}</Text>
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
            noData ? (
                <View style={styles.noDataFound}>
                <Text>No data Found</Text>
                </View>
            ) : (
                decline.length ? (
                <View style={styles.loaderContainer}>
                    <TouchableOpacity style={[styles.LoadMore, styles.padding]} onPress={() => setPage(page + 1)}>
                    <View>
                        <Text style={styles.loadTxt}>Load More</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                ) : null
            )
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
    LoadMore: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f27935',
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginVertical: 25,
    },
    loadTxt: {
        fontWeight: 'bold',
        color: '#f27935',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataFound:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },

});

export default Withdrawal;
