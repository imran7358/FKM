import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import Config from 'react-native-config';
import axios from 'axios';
import CashbackInner from './CbInner';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Underline } from 'react-native-feather';
const END_URL = '/home/home';
const FAQ = () => {
const [cashback, setEarnCashback] = useState([]);
const [title,setTitle] = useState()
const [show, setShow] = useState(false);
    const getEarnCashback = () => {
        axios.post(Config.API_URL + END_URL, {
          'page': '2',
          'sponsored_count': '1',
          'apiAuth': Config.API_AUTH,
          'device_type': 4,
        }).then(({ data }) => {
            // console.log(data.response.earn_cashback)
            setEarnCashback(data.response.earn_cashback);
            setTitle(data.response.earn_cashback_title);
        }).catch((error) => {
          console.log(error);
        });
      };

      useEffect(()=>{
      getEarnCashback();
      }, []);

    return (
        <View style={styles.myFaq}>
            <View style={styles.myFaq}>
           <View style={[styles.faqList]}>
              <TouchableOpacity onPress={()=> setShow(!show)}>
              <View style={styles.faqName}>
                    <Image source={require('../assets/images/cbWorks.png')} style={{height:35, width:35, resizeMode: 'contain', marginRight: 7,}}/>
                    <Text style={{fontSize: 14, fontWeight: '500',}}>{title}</Text>
                </View>
              </TouchableOpacity>
              <Image source={require('../assets/images/faqarrow.png')} style={styles.rArrow}/>
               </View>
                  {
                    show ?  <View style={styles.desc}>

                    {
                     cashback.length ? cashback && cashback.map((item,i)=> {
                       
                   return( <>
                    <Text style={styles.head}>{item.heading}</Text>
                   <Text style={styles.allDesc}>{item.desc}</Text>
                   </>)
                    }): null
                    }
                </View> : null
                   }
        </View>
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
    myFaq: {
        backgroundColor:'#FFECE2',
        borderRadius: 6,

    },
    faqList: {
        backgroundColor: '#fff',
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        margin: 10,
    },
    faqName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    rArrow: {
         width: 15,
         height: 15,
         resizeMode:'contain',
         position: 'absolute',
         right: 20,
    },
    desc: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius:6,
        padding: 15,
    },
    head: {
        backgroundColor: '#fff',
        marginBottom:10,
        marginTop:10,
        fontSize:15,
        borderBottomWidth :5,
        borderBottomColor:'#000',
        fontWeight:'600',

    },
    allDesc: {
        lineHeight: 26,
        fontSize:14,
    }

});

export default FAQ;
