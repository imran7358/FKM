import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';
import CashbackInner from './CbInner';
const END_URL = '/home/home';
const FAQ = () => {
const [cashback, setEarnCashback] = useState([]);
    const getEarnCashback = () => {
        axios.post(Config.API_URL + END_URL, {
          'page': '1',
          'sponsored_count': '0',
          'apiAuth': Config.API_AUTH,
          'device_type': 4,
        }).then(({ data }) => {
            setEarnCashback(data.response.earn_cashback);
        }).catch((error) => {
          console.log(error);
        });
      };

      useEffect(()=>{
        getEarnCashback();
      }, []);

    return (
        <View style={styles.myFaq}>
            {
                cashback.length ? cashback.map((item,i)=> {
                    return <CashbackInner key={i} title={item.title} description={item.description}/>
                })
                : null
            }
        </View>
    )};

const styles = StyleSheet.create({

    myFaq: {
        backgroundColor:'#FFECE2',
        borderRadius: 6,
        padding: 10,
    },
    faqList: {
        backgroundColor: '#fff',
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    faqName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    margin20: {
        marginBottom:20,
    },

});

export default FAQ;
