import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Config from 'react-native-config';
const END_URL = '/home/home';
import axios from 'axios';
import { TouchableOpacity,ScrollView} from 'react-native-gesture-handler';

const MyStore = ({navigation}) => {

    const [data, setData] = useState([]);
    const [tab, setTab] = useState([]);
    const [active, setActive] = useState(true);
    const [catId, setCatId] = useState('all');
    const getStore = () =>{
        axios.post(Config.API_URL + END_URL, {
            'page': '1',
            'apiAuth': Config.API_AUTH,
            'sponsored_count':'1',
            'device_type': 4,
            'option': catId,
        }).then(({data})=>{
            setData(data.response.cbstores);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const getTab = () => {
        axios.post(Config.API_URL + END_URL, {
            apiAuth: Config.API_AUTH,
            device_type: 4,
            'sponsored_count': '0',
            page: '',
        }).then(({data})=>{

            setTab(data.response.store_tabbing);
        }).catch((error)=>{
            console.log("Error", error);
        });
    }
    useEffect(()=>{
        getStore();
        getTab();
    }, [data]);

    useEffect(()=>{
        console.log('Cat id', catId)
    },[catId])
    return (
        <>
         <ScrollView horizontal>
         <View style={styles.storeList}>
        {
             tab.length ? tab.map((item,i)=>{
                return <TouchableOpacity onPress={()=> setCatId(item.cate_id)} key={i}>
                    <View  style={item.cate_id == catId ? styles.active : styles.innerTab}>
                    <Text  style={item.cate_id == catId ? [styles.active, styles.tabList] : styles.tabList}>{item.name}</Text>
                </View>
                </TouchableOpacity>
            }) : null
        }
        </View>
        </ScrollView>
        <View style={[styles.storCon]}>
        <View style={styles.catStore}>
            {
    
                 data.map((item, i) => {
                    return <TouchableOpacity style={styles.storeImgCon} key={i} onPress = {()=> navigation.navigate({name:'StoreDetails',params:{storeSlug:item.store_slug}})}>
                        <View style={styles.storICon} >
                            <Image source={{ uri: item.store_image }} style={{ width: 80, height: 40, resizeMode: 'contain' }} />
                        </View>
                        <Text style={styles.cbText}>₹{Number(item.cashback_amount).toFixed(0)} <Text style={styles.cbMessage}>Cashback</Text></Text>
                    </TouchableOpacity>;
                })
               }
               </View>
               </View>
        </>
    );
}

const styles = StyleSheet.create({
    catStore: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        paddingHorizontal:10,
      },
    storICon: {
        width: 109,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 6,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    active: {
        backgroundColor: '#f27935',
        borderRadius: 6,
        color: '#fff',
        fontWeight: 'bold',

    },
    tabList:{
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal:5,
    },
    storCon: {
        backgroundColor: '#F8F8F8',
        paddingVertical: 20,
      },
    storeMainCon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    storeImgCon: {
        justifyContent: 'center',
        marginBottom: 20,
        marginHorizontal:7,
    },
    cbText: {
        fontWeight: '900',
        color: '#E22020',
        marginTop: 10,
        fontSize:11,
    },
    cbMessage: {
        fontWeight: '400',
        color: '#333',
    },
    storeList: {
        backgroundColor: '#FFE2D1',
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal:10,
        paddingVertical:10,
      },
      innerTab: {
        backgroundColor:'#fff',
        borderRadius: 6,
        marginHorizontal: 6,
      },
})

export default MyStore;
