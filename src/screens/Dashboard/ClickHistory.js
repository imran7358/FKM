import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Config from 'react-native-config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
const END_URL = '/cashback/click-history';
import Loader from '../../components/Loader';


const ClickHistory = ({ navigation }) => {
    const userToken = useSelector(state => {
        return state.user.userToken;
    });
    const [page, setPage] = useState(15);
    const [loader, setLoader] = useState(false);
    const [noData, setNoData] = useState(false);
    const [history, setHistory] = useState([]);
    const [description, setDescription] = useState({
        desc: '',
    });

    const getClickHistory = async () => {
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
                if (data.response.click_history && data.response.click_history.length) {
                    setHistory([...history, ...data.response.click_history]);
                }
                else {
                    setNoData(true);
                }

                setDescription({
                    desc: data.response.top_desc,
                });
            }).catch((error) => {
                console.log("not found", error.message);

            }).finally(() => {
                setLoader(false);
            });
    };

    useEffect(() => {
        getClickHistory();
    }, [page])
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
                                history.length ? history.map((item, i) => {
                                    return <View style={styles.innerReocrd} key={i}>
                                        <Text style={styles.srNo}>{i + 1}</Text>
                                        <Text style={styles.storeName}>{item.store}</Text>
                                        <Text style={styles.click}>{item.num_of_time}</Text>
                                        <Text style={styles.data}>{item.last_click}</Text>
                                    </View>
                                })
                                    : null
                            }
                        </View>
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
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },
    noDataFound: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
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
        textAlign: 'center',
    },
    storeName: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    alterColor: {
        backgroundColor: '#EDEDED',
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default ClickHistory;
