import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { centerContainer, fontSize, inputBox } from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';
import Config from 'react-native-config';
const END_URL = '/cashback/add-account';
import axios from 'axios';
import ErroLabel from '../../components/ErrorCom';
import SucessLbl from '../../components/SuccessCom';
import { useSelector } from 'react-redux';

const AddAccount = () => {
const userToken = useSelector(state=> state.user.userToken);
  const [value, setValue] = useState('Bank');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
  }, [value]);
  const mydata = [
    { label: 'Bank', value: 'Bank' },
    { label: 'Paytm', value: 'Paytm' },
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
          placeholder="Select item"
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
          value === 'Bank' ?
            <Formik
              initialValues={{
                name: '',
                phone: '',
                account: '',
                ifsc: '',
                bankname: '',
                accountType: 'bank',
              }}
              onSubmit={async (values) => {
                axios.post(Config.API_URL + END_URL, {
                  apiAuth: Config.API_AUTH,
                  device_type: 4,
                  account_name: values.name,
                  phone: values.phone,
                  account_no: values.account,
                  ifsc_code: values.ifsc,
                  bank_name: values.bankname,
                  account_type: values.accountType,
                },
                  {
                    headers: {
                      Authorization: userToken,
                    },
                  }).then(({ data }) => {
                    console.log("Add acount", data)
                    if (data.status == 1 && data.error == 0) {
                      setSuccess(data.message);
                    }
                    else {
                        setError(data.message)
                    }
                  }).catch((error) => {
                    setError(error.message);
                    console.log("Error", error)
                  }).finally(() => {
                  });
              }
              }
              validationSchema={yup.object().shape({
                name: yup
                  .string()
                  .required('Please, provide your name!').matches(/^[a-zA-Z]+$/,{message:"Please use only alphabets"}),
                phone: yup
                  .string().required('Please enter mobile number').matches(/^[6-9]\d{9}$/, { message: "Please enter valid number.", excludeEmptyString: false }).max(10, 'Please enter valid phone number'),
                account: yup
                  .string().required('Enter account Number').max(22, 'Please enter a valid account number'),
                ifsc: yup
                  .string().required('Please enter IFSC Code').min(11, 'IFSC required 11 digit').max(11,'Please enter a valid IFSC code'),
                bankname: yup
                  .string().required('Please enter Bank Name'),
              })}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <View style={styles.formContainer}>
                  <View style={styles.inputBoxContainer}>
                    <TextInput
                      style={[styles.inputText, styles.lableFont]}
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={() => setFieldTouched('name')}
                      placeholder="Account Holder Name"
                      placeholderTextColor="#666"
                    />
                    {touched.name && errors.name &&
                      <Text style={styles.error}>{errors.name}</Text>
                    }
                  </View>

                  <View style={styles.inputBoxContainer}>
                    <TextInput
                      style={[styles.inputText, styles.lableFont]}
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={() => setFieldTouched('phone')}
                      placeholder="Phone"
                      maxLength={10}
                      placeholderTextColor="#666"
                    />
                    {touched.phone && errors.phone &&
                      <Text style={styles.error}>{errors.phone}</Text>
                    }
                  </View>

                  <View style={styles.inputBoxContainer}>
                    <TextInput
                      style={[styles.inputText, styles.lableFont]}
                      value={values.account}
                      onChangeText={handleChange('account')}
                      onBlur={() => setFieldTouched('account')}
                      placeholder="Account Number"
                      placeholderTextColor="#666"
                    />
                    {touched.account && errors.account &&
                      <Text style={styles.error}>{errors.account}</Text>
                    }
                  </View>

                  <View style={styles.inputBoxContainer}>
                    <TextInput
                      style={[styles.inputText, styles.lableFont]}
                      value={values.ifsc}
                      onChangeText={handleChange('ifsc')}
                      onBlur={() => setFieldTouched('ifsc')}
                      placeholder="IFSC Code"
                      placeholderTextColor="#666"
                    />
                    {touched.ifsc && errors.ifsc &&
                      <Text style={styles.error}>{errors.ifsc}</Text>
                    }
                  </View>
                  <View style={styles.inputBoxContainer}>
                    <TextInput
                      style={[styles.inputText, styles.lableFont]}
                      value={values.bankname}
                      onChangeText={handleChange('bankname')}
                      onBlur={() => setFieldTouched('bankname')}
                      placeholder="Bank Name"
                      placeholderTextColor="#666"
                    />
                    {touched.bankname && errors.bankname &&
                      <Text style={styles.error}>{errors.bankname}</Text>
                    }
                  </View>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.loginButton}>
                      <Text style={styles.loginTxt}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    success ? <SucessLbl message={success} /> : null
                  }
                  {
                    error ? <ErroLabel message={error} /> : null
                  }
                </View>
              )}
            </Formik>
            : null
        }

        {
          value === 'Paytm' ?
            <View>
              <Formik
                initialValues={{
                  phone: '',
                  accountHolder: '',
                  accountType: 'paytm',
                }}
                onSubmit={async (values) => {
                  axios.post(Config.API_URL + END_URL, {
                    apiAuth: Config.API_AUTH,
                    device_type: 4,
                    paytmname: values.accountHolder,
                    paytmphone: values.phone,
                    account_type: values.accountType,
                  },
                    {
                      headers: {
                        Authorization: userToken,
                      },
                    }).then(({ data }) => {
                     
                      if (data.status == 1 && data.error == 0) {
                        setSuccess(data.message);
                      }
                      else{
                        setError(data.message)
                      }
                    }).catch((error) => {
                      setError(error.message);
                    }).finally(() => {
                    })
                }
                }
                validationSchema={yup.object().shape({

                  phone: yup
                    .string().required('Please Enter phone no').matches(/^[6-9]\d{9}$/, { message: "Please enter valid number.", excludeEmptyString: false }).max(10, 'Please enter a valid phone number'),
                  accountHolder: yup
                    .string().required('Please, provide your name!').matches(/^[a-zA-Z]+$/,{message:"Please use only alphabets"}),
                })}
              >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <View style={styles.formContainer}>
                    <View style={styles.inputBoxContainer}>
                      <TextInput
                        style={[styles.inputText, styles.lableFont]}
                        value={values.accountHolder}
                        onChangeText={handleChange('accountHolder')}
                        onBlur={() => setFieldTouched('accountHolder')}
                        placeholder="Account Holder Name"
                        placeholderTextColor="#666"
                      />
                      {touched.accountHolder && errors.accountHolder &&
                        <Text style={styles.error}>{errors.accountHolder}</Text>
                      }
                    </View>

                    <View style={styles.inputBoxContainer}>
                      <TextInput
                        style={[styles.inputText, styles.lableFont]}
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        maxLength={10}
                        onBlur={() => setFieldTouched('phone')}
                        placeholder="Phone"
                        placeholderTextColor="#666"
                      />
                      {touched.phone && errors.phone &&
                        <Text style={styles.error}>{errors.phone}</Text>
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
