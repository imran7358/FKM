import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView,} from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
    centerContainer,
    fontSize,
    inputBox,
    fontColor,
    commonMargin,
  } from '../assets/styles/common';


const EditProfile = ({navigation}) => {

    return(
       
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.container}>
            <View style={styles.profileInfo}>
                <View style ={styles.profilePic}>
                   <Image source={require('../assets/images/profile.png')} />
                </View>
                <View style={styles.profileInfoName}>
                    <Text style ={styles.pName}>Mohammad Imran</Text>
                    <Text style={styles.profileTax}>Check Out Your Cashback Summary</Text>
                </View>
            </View>
            
            <View style={styles.cashBackInfo}>
                <View><Text style={styles.pInfo}>Profile Information</Text>
                <View style={styles.boxContainer}>
                    <Text style={styles.lblInfo}>Name</Text>
                <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholderTextColor="#666" value='Mohammad Imran'/>
          </View>
                </View>
                <View style={styles.boxContainer}>
                    <Text style={styles.lblInfo}>Mobile Number</Text>
                <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholderTextColor="#666" value='+91 9718158993'/>
          </View>
                </View>
                <View style={styles.boxContainer}>
                    <Text style={styles.lblInfo}>Password</Text>
                <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholderTextColor="#666" value='*****'/>
          </View>
                </View>
                </View>
            </View>
            <TouchableOpacity>
            <View style={styles.loginButton}>
              <Text style={styles.loginTxt}>Submit</Text>
            </View>
          </TouchableOpacity>
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
    inputBoxContainer: {
        position: 'relative',
      },
    cashBackInfo: {
        marginTop: 20,
    },
    pInfo: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f27935',
        borderRadius: 6,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 45,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f7f7f7',
    },
    profileInfoName: {
        marginLeft: 10,
    },
    pName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 5,
    },
    profileTax: {
        fontSize:12,
        color: '#fff',
    },

    cashBackBox: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 20,
    },


    margin15: {
        marginBottom: 15,
    },
    profileMenu: {
        marginTop: 30,
    },
    lblInfo:{
        fontSize: 14,
        color: '#B1B1B1',
        marginBottom:7,
    },
    inputText: {
        height: inputBox.height,
        padding: inputBox.padding,
        borderWidth: inputBox.borderWidth,
        borderColor: inputBox.borderColor,
        borderRadius: inputBox.borderRadius,
        color: '#333333',
        fontSize: 14,
      },
      boxContainer: {
        marginTop: 15,
      },
      loginButton: {
        alignItems: centerContainer.alignCenter,
        justifyContent: centerContainer.justifyCenter,
        backgroundColor: '#F27935',
        padding: 10,
        marginTop: 30,
        borderRadius: 6,
        fontWeight: 'bold',
        height: 50,
      },
      loginTxt: {
        fontSize: fontSize.headingFont,
        fontWeight: '900',
        color: '#fff',
      },
});

export default EditProfile;
