import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  centerContainer,
  fontSize,
  inputBox,
} from '../../assets/styles/common';
import { Dropdown } from 'react-native-element-dropdown';

const AddAccount = () => {
  const [value, setValue] = useState('Bank');
  useEffect(() => {
  }, [value]);
  const data = [
    { label: 'Bank', value: 'Bank' },
    { label: 'Paytm', value: 'Paytm' },
  ];
  return (
    <ScrollView style={styles.container}> 

    <Formik
        initialValues={{ 
          name: '',
          email: '', 
          password: '' 
        }}
        onSubmit={values => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .required('Please, provide your name!'),
          email: yup
            .string()
            .email()
            .required(),
          password: yup
            .string()
            .min(4)
            .max(10, 'Password should not excced 10 chars.')
            .required(),
        })}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
            <TextInput
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              placeholder="Name"
            />
            {touched.name && errors.name &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
            }            
            <TextInput
              value={values.email}
              style={inputStyle}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
            <TextInput
              value={values.password}
      
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
            }
            <Button
              color="#3740FE"
              title='Submit'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <View style={styles.innerContainer}>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
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
            bank: '', 
            bankIfsc: '',
            accountNo: '',
            phone: '',
            bankName: '',

          }}
          onSubmit={values => Alert.alert(JSON.stringify(values))}
          validationSchema={yup.object().shape({
            name: yup
              .string()
              .required('Please, provide your name!'),
            bankName: yup
              .string()
              .required('Please enter bank name'),
              bankIfsc: yup
              .string()
              .required('Please enter IFSC Code'),
              accountNo: yup
              .string()
              .required('Please enter Account No'),
              phone: yup
              .string()
              .required('Please enter Mobile Number'),
          })} >
          {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit })=>(
            <View>
               <View style={styles.inputBoxContainer}>
        <TextInput
          autoCapitalize="none"
          style={[styles.inputText, styles.lableFont]}
          placeholder="Bank Name"
          placeholderTextColor="#666"
          value={values.bank}
          onChangeText={handleChange('bank')}
          onBlur={() => setFieldTouched('bank')}
          />
      </View>
      {touched.bank && errors.bank &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
            }  
            <View style={styles.inputBoxContainer}>
        <TextInput
          autoCapitalize="none"
          style={[styles.inputText, styles.lableFont]}
          placeholder="Bank Holder Name"
          placeholderTextColor="#666"
          value={values.bankName}
          onChangeText={handleChange('bankName')}
          onBlur={() => setFieldTouched('bankName')}
          />
      </View>
      <View style={styles.inputBoxContainer}>
        <TextInput
          autoCapitalize="none"
          style={[styles.inputText, styles.lableFont]}
          placeholder="Phone"
          placeholderTextColor="#666" 
          value={values.phone}
          onChangeText={handleChange('phone')}
          onBlur={() => setFieldTouched('phone')}
          />
      </View>

      <View style={styles.inputBoxContainer}>
        <TextInput
          autoCapitalize="none"
          style={[styles.inputText, styles.lableFont]}
          placeholder="Account No."
          placeholderTextColor="#666" 
          value={values.accountNo}
          onChangeText={handleChange('accountNo')}
          onBlur={() => setFieldTouched('accountNo')}
          />
      </View>
      <View style={styles.inputBoxContainer}>
        <TextInput
          autoCapitalize="none"
          style={[styles.inputText, styles.lableFont]}
          placeholder="Bank IFSC"
          placeholderTextColor="#666" 
          value={values.bankIfsc}
          onChangeText={handleChange('bankIfsc')}
          onBlur={() => setFieldTouched('bankIfsc')}
          />
      </View>

      <View style={styles.inputBoxContainer}>
        <TextInput
          autoCapitalize="none"
          style={[styles.inputText, styles.lableFont]}
          placeholder="Name"
          placeholderTextColor="#666" 
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={() => setFieldTouched('name')}
          />
      </View>
      <Button
              color="#3740FE"
              title='Submit'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
          )}

            </Formik>
            : null
        }



        {
          value === 'Paytm' ?
            <View>
              <Text>Paytm</Text>
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
  innerContainer:{
    backgroundColor: '#f7f7f7',
    padding: 20,
  }

})

export default AddAccount;


