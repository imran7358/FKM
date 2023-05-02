import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import { LOGGEDOUT } from "../../redux/actionTypes";
import * as yup from 'yup';
import { centerContainer, fontSize, inputBox } from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import Config from 'react-native-config';
const END_URL = '/user/deleteaccount';
import axios from 'axios';
import {store} from '../../redux/store';
import ErroLabel from '../../components/ErrorCom';
import SucessLbl from '../../components/SuccessCom';
import { useSelector,useDispatch } from 'react-redux';
import request from '../../utils/request';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAccount = ({navigation}) => {
const userToken = useSelector(state=> state.user.userToken);
  const [value, setValue] = useState('1');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
    const logOut = async() =>{
        try {
            dispatch({
                type: LOGGEDOUT,
                userToken: '',
                userInfo:'',
            });
            navigation.navigate('Home');
            
        }
        catch (exception) {
            console.log(exception);
        }
    }
  useEffect(() => {
  }, [value]);
  const mydata = [
    { label: 'Temporary Disable Account ', value: '1' },
    { label: 'Permanent Delete Account', value: '2' },
  ];

  useEffect(() => {

  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={mydata}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Item"
          placeholderTextColor="grey"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          renderLeftIcon={() => (
            <View><Text></Text></View>
          )}
        />
       
        {
          value !='' ?
            <View>
              <Formik
                initialValues={{
                  email: '',
                  option: value,
                }}
                onSubmit={async (values) => {
                    console.log("values",values)
                    request.post(navigation,Config.API_URL + END_URL, {
                    apiAuth: Config.API_AUTH,
                    device_type: 4,
                    useremail: values.email,
                    uoption: value,
                  },
                    {
                      headers: {
                        Authorization: userToken,
                      },
                    }).then(({ data }) => {
                        console.log(data)
                      if (data.status == 1 && data.error == 0) 
                      {
                        // Alert.alert('Success');  
                        setSuccess(data.message)  
                        setError('')
                        setTimeout(() => {
                            logOut()
                        }, 2000);
                                     
                      }
                      else
                      {
                        setSuccess('')
                        setError(data.message)
                      }
                    }).catch((error) => {
                      console.log("error",error)
                      setError(error.message);
                    }).finally(() => {
                    })
                }
                }
                validationSchema={yup.object().shape({
                email:yup.string().email('Must be a valid email').max(255).required('Email is required'),
                })}
              >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <View style={styles.formContainer}>
                    <View style={styles.inputBoxContainer}>
                      <TextInput
                        style={[styles.inputText, styles.lableFont]}
                        value={values.email}
                        autoCapitalize='none'
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        placeholder="Email"
                        placeholderTextColor="#666"
                      />
                      {
                      touched.email && errors.email &&
                      <Text style={styles.error}>{errors.email}</Text>
                      }
                    </View>
                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={styles.loginButton}>
                        <Text style={styles.loginTxt}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                    {
                        success ? <SucessLbl message = {success}/> : null
                    }
                    {
                        error ? <ErroLabel message = {error} /> : null
                    }
                  </View>
                )}
              </Formik>
            </View>
            : null
        }
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    fontSize: 12,
    color: '#FF0D10',
    marginTop: 7,
  },
  radioOuter: {
    width: 25,
    height: 25,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabList: {
    fontSize: 16,
    fontWeight: '500',
  },
  innerRadio: {
    width: 16,
    height: 16,
    backgroundColor: '#333',
    borderRadius: 45,
  },
  inputBoxContainer: {
    position: 'relative',
  },
  inputText: {
    height: inputBox.height,
    padding: inputBox.padding,
    borderWidth: inputBox.borderWidth,
    marginTop: inputBox.marginTop,
    borderColor: inputBox.borderColor,
    borderRadius: inputBox.borderRadius,
    color: '#333333',
    fontSize: 14,
    backgroundColor: '#fff',
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
    textTransform: 'capitalize',
  },
  dropdown: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  innerContainer: {
    backgroundColor: '#f7f7f7',
    padding: 20,
  }

})

export default AddAccount;
