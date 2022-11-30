import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {centerContainer} from '../assets/styles/common';

const AllStores = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.storeInner}>
                        <View style={styles.storeBox}>
                        <TouchableOpacity onPress={()=> navigation.navigate('Store Details')}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </TouchableOpacity>
                            </View>
                       
                            <View style={styles.storeBox}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </View>
                            <View style={styles.storeBox}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </View>
                            <View style={styles.storeBox}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </View>
                            <View style={styles.storeBox}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </View>
                            <View style={styles.storeBox}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </View>
                            <View style={styles.storeBox}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </View>
                            <View style={styles.storeBox}>
                            <View style={styles.logoContinaer}>
                                <View>
                                    <Image source={require('../assets/images/fresHome.png')}  style={styles.logo}/>
                                </View>
                                <View><Text style={styles.logoTxt}>Freshtohome</Text></View>
                                <View style={styles.btnContainer}>
                            <Text style={styles.cbBtn}>₹120 Cashback</Text>
                        </View>
                            </View>
                            </View>
                       
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    storeInner: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    storeBox: {
        borderWidth: 1,
        borderColor: '#9D9D9D',
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
        resizeMode: 'contain'
    },
    logoTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 30,
    },

    cbBtn: {
        padding: 12,
        borderRadius: 6,
        fontWeight: '900',
        color: '#fff',
        fontSize: 14,
    },
    btnContainer: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#f27935',
        borderRadius: 6,
        alignItems: 'center',
        position: 'absolute',
        bottom: -35,

    }

  });
export default AllStores;
