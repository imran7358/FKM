import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Image, TextInput, SafeAreaView,Alert} from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {centerContainer,fontSize,inputBox} from '../assets/styles/common';
import { Form } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import request from '../utils/request';
import Config from 'react-native-config';
const END_URL = '/user/updateprofile';
const PROFILE_URL = '/user/userprofile';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SIGNEDIN } from '../redux/actionTypes';
import ErroLabel from '../components/ErrorCom';
import SucessLbl from '../components/SuccessCom';




const EditProfile = ({navigation}) => {
    const dispatch = useDispatch()
    const [uploadFile, setuplaodFile] = useState({});
    const [filType, setFileType] = useState(false);
    const [uName, setUname] = useState('')
    const [error, setError]= useState(false)
    const [sucess, setSucess] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        img: null
    });
    const userToken = useSelector(state => {
        return state.user.userToken;
    });

    const uploadPic = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.images],
            });
            let arr = response[0]?.name.split(".");
            if (arr[1] === 'JPG' || arr[1] === "jpg" || arr[1] === "PNG" || arr[1] === "png" || arr[1] === "JPEG" || arr[1] === "jpeg") {
            setuplaodFile(response);
            setUser((pre)=>{
                return ({
                    ...pre,
                    img:response[0]?.uri,
                })
            })
            }
            else {
            //    Alert.alert("HEIC format not Allowed")
            }

        } catch (err) {
            if(DocumentPicker.isCancel(err)){
                // Alert.alert('Not Uploaded');
            }
        }
    }, [])
    const submitRequest = async(formdata) => {
    axios.post(Config.API_URL + END_URL, formdata,{
        headers: {
            Authorization: userToken,
            "Content-Type": "multipart/form-data",
            'Accept': 'application/json',
        },
    }).then(({data})=>{
        console.log("updateInfo", data)
        if(data.status == '1' && data.error =='0'){
            dispatch({
                type: SIGNEDIN,
                userToken: data.token,
                userInfo: data.data,
            });
        }
    }).catch((error)=>{
        console.log("Error", error)
    })
}

    const submitForm = () => {
        let fdata = new FormData();
        fdata.append("apiAuth", Config.API_AUTH),
        fdata.append("title", user.name),
        fdata.append("profileimage", uploadFile[0])
        submitRequest(fdata)
    }

const getProfile = () =>{
   request.post(navigation,Config.API_URL + PROFILE_URL, {
    apiAuth: Config.API_AUTH,
    device_type: Config.device_type,
   },{
    headers: {
        Authorization: userToken,
    },
   }).then(({data})=>{
        setUser({
            name:data.data.title,
            email: data.data.email,
            phone: data.data.phone,
            img:data.data.user_img_url,
        })
   }).catch((error)=>{
    console.log("Error", error)
   })
};

    useEffect(()=>{
        getProfile();
    },[]);
    useEffect(()=>{
    },[user])

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.container}>
            <View style={styles.profileInfo}>
                <TouchableOpacity onPress={uploadPic}>
                <View style ={styles.profilePic}>
                <Image source={{ uri: user.img}}  style={styles.profilePicImg}/>
                </View>
                </TouchableOpacity>
                <View style={styles.profileInfoName}>
                    <Text style ={styles.pName}>{user.name}</Text>
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
              placeholderTextColor="#666" value={user.name} 
              onChangeText={(e)=> {
                setUser((prevState) => {
                  return({
                    ...prevState,
                    name: e
                  });
                });
              }}
              />
          </View>
                </View>
                <View style={styles.boxContainer}>
                    <Text style={styles.lblInfo}>Email</Text>
                <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont,styles.disabled]}
              placeholderTextColor="#666" value={user.email}
              editable={false} selectTextOnFocus={false}
              />
          </View>
                </View>

                <View style={styles.boxContainer}>
                    <Text style={styles.lblInfo}>Mobile Number</Text>
                <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont, styles.disabled]}
              editable={false} selectTextOnFocus={false}
              placeholderTextColor="#666" value={user.phone}/>
          </View>
                </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('ChangePassword')}>
                <View><Text style={styles.changeLink}>Change Password</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitForm}>
            <View style={styles.loginButton}>
              <Text style={styles.loginTxt}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
            </ScrollView>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    disabled:{
        backgroundColor: '#f2f2f2',

    },
    profilePicImg: {
        width: 40,
        height:40,
        resizeMode: 'contain',
        borderRadius:50,
    },
    inputBoxContainer: {
        position: 'relative',
      },
      changeLink: {
        color: '#397EF5',
        fontSize: 14,
        fontWeight: '700',
        marginTop:20,
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
