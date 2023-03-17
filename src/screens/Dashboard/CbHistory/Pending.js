import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios from 'axios';
const END_URL = '/cashback/cashback-history';
import Loader from '../../../components/Loader';
import { useSelector } from 'react-redux';

const PendingCashback = ({setTop}) => {
    const [allcb, setAllCb] = useState([]);
    const [desc, setAllDesc] = useState([]);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [noData, setNoData] = useState(false);
    const userToken = useSelector(state => {
        return state.user.userToken;
    });

    const getPendingkHistory = async () => {
        setLoader(false);
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: Config.DEVICE_TYPE,
            option: 'pending',
            page,
        },
            {
                headers: {
                    Authorization: userToken,
                },
            }).then(({ data }) => {
                if (data.response.pending && data.response.pending.length){
                    setAllCb(data.response.pending);
                }

                else {
                    setNoData(true);
                    setLoadeMore(false);
                }
                setTop(data.response.top_desc);
            }).catch((error) => {
                console.log(error);
            }).finally(()=>{
                setLoader(false);
            });

    };

    useEffect(() => {
        getPendingkHistory();
    },[page]);


    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
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
                 <View style={styles.status}>
                     <Text style={styles.barTxt}>Order Id</Text>
                 </View>
                 <View style={styles.status}>
                     <Text style={styles.barTxt}>Expected</Text>
                 </View>
             </View>
             <View style={styles.recordList}>
            {
                allcb.length ? allcb.map((item, i)=>{
                    return  <View style={styles.innerReocrd}>
                    <Text style={styles.srNo}>{i + 1}</Text>
                    <Text  style={styles.storeName}>{item.store}</Text>
                    <Text style={styles.amount}>{item.amount}</Text>
                    <Text style={styles.status}>{item.status}</Text>
                    <Text style={styles.status}>{item.transaction_date}</Text>
                    <Text style={styles.status}>{item.orderid}</Text>
                    <Text style={styles.status}>{item.expected_date}</Text>
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
    )

}

const styles = StyleSheet.create({

    bgWhite: {
        backgroundColor: '#fff',
    },
    topContent: {
        backgroundColor: '#F7F7F7',
        borderRadius: 3,
        padding: 15,
    },
    noDataFound:{
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
    topText: {
        lineHeight: 22,
        fontSize: 14,
    },
    recordCon: {
        backgroundColor: '#FAFAFA',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
        textAlign: 'center',
    },
    storeName: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    alterColor: {
        backgroundColor: '#EDEDED',
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
        textAlign: 'center',
    },
    amount: {
        width: 100,
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

export default PendingCashback;
