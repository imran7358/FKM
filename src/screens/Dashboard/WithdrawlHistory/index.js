import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import PendingCashback from './Pending';
import AllCashback from './All';
import Confirmed from './Confirmed';
import Declined from './Declined';



const WidthdrawalMoney = () => {
    const OPTIONS = ["All","Pending","Confirm","Declined"];
    const [active, setActive] = useState(true)
    const [tab, setTab] = useState('All');
    const [desc,setDesc] = useState("");
    return (
        <SafeAreaView style={styles.bgWhite}>
         <ScrollView style={styles.bgWhite}>
         <View style={styles.container}>
          <View style={styles.topContent}>
             <Text style={styles.topText}>{desc}</Text>
          </View>
    
            <View style={styles.historyTab}>
            <View style={styles.historyTab}>
                        {OPTIONS.map((e,i)=><View key={i}><Text  style={e==tab?[styles.tabList,styles.activeTab]:[styles.tabList]} onPress={(ev)=>{setTab(e)}}>{e}</Text></View>)}
                    </View>

            </View>

          <View style={styles.recordCon}>
             {
                tab === 'All' ? 
                <AllCashback setTop={(txt)=>{
                    setDesc(txt);
                }}/>
                : null
             }
             {
                tab === 'Pending' ? 
                
                <PendingCashback  setTop={(txt)=>{
                    setDesc(txt);
                }}/>
                
                : null
             }
             {
                tab === 'Confirm' ? 
                
                <Confirmed  setTop={(txt)=>{
                    setDesc(txt);
                }}/>
                : null
             }
             {
                tab === 'Declined' ? 
                
               <Declined setTop={(txt)=>{
                setDesc(txt);
            }}/>
                
                : null
             }
            
           </View>
         </View>
         </ScrollView>
        </SafeAreaView>
     )

}

const styles = StyleSheet.create({
    container : {
        padding: 24,
        flex: 1,
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
        marginTop: 20,
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
        width: '10%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        textAlign: 'center',
    },
    click: {

        width: '20%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',

    },
    date:{

        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    storeName: {
        width: '30%',
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
   
})

export default WidthdrawalMoney;
