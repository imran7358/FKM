import axios from "axios";
import React from "react";
import { Platform,View, Text,  StyleSheet, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Config from "react-native-config";
const END_URL = '/cashback/cashbackstore';
import { useEffect, useState} from "react";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/Loader";
import All from "./All";
import HundredCashback from "./HundredCashback";
import PopularCashback from "./Popular";
import NewestCashback from "./Newest";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { cond } from "lodash";
import { useIsFocused } from '@react-navigation/native';
const AllStores = ({navigation})=> {
    const deviceType = Platform.OS=='ios' ? 4 : 3 ;
    const [success, setSucess] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [store, setStore] = useState([]);
    const [page, setPage] = useState(1);
    const cbTab = ["All","Hundredpercent", "Newest","Popular","A-Z"];
    const [tab, setTab] = useState('All');
    const isFocused = useIsFocused()
const userToken = useSelector(state => state.user.userToken);
useEffect(() => {
    console.log('ABC');
    tab==='A-Z' ? setTab('All')  : null
  }, [isFocused]);
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.historyTab}>
                        {cbTab.map((e,i)=><View key={i}><Text  style={e==tab?[styles.tabList,styles.activeTab]:[styles.tabList]} onPress={(ev)=>{setTab(e)}}>
                            {
                                e ==="Hundredpercent" ? '100% Cashback' : e
                            }
                            </Text></View>)}
                    </View>
                   
                        {
                            tab === "All" ?
                            <View style={styles.storeCon}>
                           <All navigation = {navigation}/>
                        </View>
                         : null
                        }

                        {
                            tab === "Hundredpercent" ? 

                            <View style={styles.storeCon}>
                               <HundredCashback navigation = {navigation}/>
                            </View>
                            : null
                        }
                        {
                            tab === "Popular" ?
                            <View style={styles.storeCon}>
                            <PopularCashback navigation = {navigation}/>
                        </View>
                            : null
                        }
                        {
                            tab === "Newest" ?
                            <View style={styles.storeCon}>
                            <NewestCashback navigation = {navigation}/>
                        </View>
                            : null
                        }
                        {
                            tab === "A-Z" ? 
                            navigation.navigate('Stores')
                            :
                            null
                            }
                </View>
                </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex:1,
    },
      headingArea: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
      },
      hotSale: {
        width: 29,
        height: 29,
        resizeMode: 'contain',
      },
      tabList: {
        color:'black',
        fontSize:16,
        fontWeight: '500',
    },
      historyTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: '100%',
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
      topHeading: {
        fontSize: 18,
        marginLeft: 10,
      },
      loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cbtxt:{
        color: '#fff',
        fontSize: 12,
    },
    productBox: {
        width: '47%',
        backgroundColor: '#F7F7F7',
        padding: 15,
        borderRadius: 9,
        borderColor: '#EDEDED',
        borderWidth: 1,
        marginBottom: 15,
    },
    loadContainer: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dealsContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 9,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    noData: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    productImageCon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandLogo: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        textAlign: 'left'
    },
    prodDescr: {
        fontSize: 10,
        marginTop: 10,
    },
    prdLine: {
        fontSize: 11,
        lineHeight: 18,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    innerPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    rpImage: {
        width: 11,
        height: 11,
        resizeMode: 'contain',
    },
    priceTxt: {
        fontSize: 15,
        fontWeight: '800',
        marginLeft: 3,
    },
    cutprice: {
        color: '#888888',
    },
    cutLine: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: '#f27935',

    },
    LoadMore: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f27935',
        borderWidth: 1,
        paddingHorizontal:30,
        paddingVertical: 15,


    },
    loadTxt: {
        fontWeight: 'bold',
        color: '#f27935',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    cashback: {
        backgroundColor: '#f27935',
        borderRadius:3,
       paddingHorizontal: 7,
        position:'absolute',
        zIndex: 999,
        paddingVertical: 4,
        right:0,
        opacity: 0.8,
    },
    cashbackDeals: {
        marginTop:20,
    },
 
    storeCon:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    storeBox: {
        borderWidth: 1,
        borderColor: '#D8D8D8',
        width: '47%',
        borderRadius: 6,
        padding: 20,
        marginBottom: 40,
    },
    logoContinaer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 112,
        height: 66,
        resizeMode: 'contain',
    },
    logoTxt: {
        fontSize: 14,
        fontWeight: '800',
        marginTop: 20,
        marginBottom: 30,
    },

    cbBtn: {
        padding: 12,
        borderRadius: 6,
        fontWeight: '800',
        color: '#fff',
        fontSize: 12,
    },
    btnContainer: {
        width: 112,
        backgroundColor: '#f27935',
        borderRadius: 6,
        alignItems: 'center',
        position: 'absolute',
        bottom: -35,
    },
})

export default AllStores;
