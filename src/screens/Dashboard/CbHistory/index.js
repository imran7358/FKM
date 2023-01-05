import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import PendingCashback from './Pending';
import AllCashback from './All';
import Confirmed from './Confirmed';
import Declined from './Declined';

const CashbackHistory = () => {
    const [active, setActive] = useState(true)
    const [status, setStatus] = useState('All')
    const setStatusFilter = status => {
        setStatus(status)
    }
    const ListTab = [
        {
            status: 'All'
        },
        {
            status: 'Pending'
        },
        {
            status: 'Confirmed'
        },
        {
            status: 'Declined'
        },

    ]
    return (
        <SafeAreaView style={styles.bgWhite}>
         <ScrollView style={styles.bgWhite}>
         <View style={styles.container}>
          <View style={styles.topContent}>
             <Text style={styles.topText}>Below you will find the list of the latest stores you’ve visited. 
 So that you can track the stores you have looked at.</Text>
          </View>
    
            <View style={styles.historyTab}>
                    {
                       ListTab.map((e,i)=>(
                        <TouchableOpacity key={i} style={status === e.status && styles.activeTab} onPress={()=> setStatusFilter(e.status)}>
                        <Text style={status === e.status && styles.txtActive}>{e.status}</Text>
                        </TouchableOpacity>
                        
                       ))
                    }

            </View>

          <View style={styles.recordCon}>
             {
                status === 'All' ? 
                <AllCashback />
                : null
             }
             {
                status === 'Pending' ? 
                
                <PendingCashback />
                
                : null
             }
             {
                status === 'Confirmed' ? 
                
                <Confirmed />
                : null
             }
             {
                status === 'Declined' ? 
                
               <Declined />
                
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

export default CashbackHistory;
