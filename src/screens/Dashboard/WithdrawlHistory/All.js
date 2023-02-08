import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Config from 'react-native-config';
const END_URL = '/cashback/withdrawal-history';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../../components/Loader';
import { useSelector } from 'react-redux';



const AllCashback = ({ setTop }) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const [allcb, setAllCb] = useState([]);
    const [page, setPage] = useState(1);
    const [noData, setNoData] = useState(false);
    const [loader, setLoader] = useState(false);

    const getData = async () => {
        setLoader(true);
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: 'all',
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
                   setNoData(true);
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

        <View style={styles.container}>
            <View style={styles.recordCon}>
                <View style={styles.headingCond}>
                    <View style={styles.srNo}>
                        <Text style={styles.barTxt}>SN.</Text>
                    </View>
                    <View style={styles.storeName}>
                        <Text style={styles.barTxt}>Type</Text>
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
                        allcb.length ? allcb.map((item, i) => {
                            return <View style={styles.innerReocrd} key={i}>
                                <Text style={styles.srNo}>{i + 1}</Text>
                                <Text style={styles.storeName}>{item.type}</Text>
                                <Text style={styles.amount}>{item.amount}</Text>
                                <Text style={styles.status}>{item.date}</Text>
                            </View>;
                        }) :
                            null
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
                noData ? <View style={styles.noDataFound}>
                    <Text>No data Found</Text>
                </View>
                    : <View style={styles.loaderContainer}>
                        <TouchableOpacity style={[styles.LoadMore, styles.padding]} onPress={() => setPage(page + 1)}>
                            <View>
                                <Text style={styles.loadTxt}>Load More</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noData: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 20,
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
        width: '40%',
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
    amount: {
        width: '23%',
        //alignItems: 'center',
        textAlign: 'center',
    },
    status: {
        width: '23%',

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

});

export default AllCashback;
