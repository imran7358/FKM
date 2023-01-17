import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity , TextInput, Button, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import {
    centerContainer,
    fontSize,
    inputBox,
    fontColor,
    commonMargin,
  } from '../../../assets/styles/common';
  import { Dropdown } from 'react-native-element-dropdown';
  import DateTimePicker from '@react-native-community/datetimepicker';




const MissingReport = () => {
    const [active, setActive] = useState(true);
    const [status, setStatus] = useState('All');
    const [value, setValue] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];
      const formatInputValue = () => {
    if (!selectedDay) return '';
    return `Day: ${selectedDay.day}`;
  };
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

    return (
        <SafeAreaView style={styles.bgWhite}>
            <ScrollView style={styles.bgWhite}>
                <View style={styles.container}>
                    <View style={styles.topContent}>
                        <Text style={styles.topText}>Below you will find the list of the latest stores you’ve visited.
                            So that you can track the stores you have looked at.</Text>
                    </View>

                    <View style={styles.inputBoxContainer}>
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
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <View><Text>arrow</Text></View>
        )}
      />

<View>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholder="Bank Holder Name"
              placeholderTextColor="#666" />
          </View>
          <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholder="Phone"
              placeholderTextColor="#666" />
          </View>

          <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholder="Account No."
              placeholderTextColor="#666" />
          </View>
          <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholder="Account No."
              placeholderTextColor="#666" />
          </View>

          <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholder="Bank IFSC"
              placeholderTextColor="#666" />
          </View>

          <View style={styles.inputBoxContainer}>
            <TextInput
              autoCapitalize="none"
              style={[styles.inputText, styles.lableFont]}
              placeholder="Name"
              placeholderTextColor="#666" />
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
        justifyContent: 'space-between',
        padding: 10,
    },
    srNo: {
        width: '10%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    click: {

        width: '20%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    date: {

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
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 6,
        paddingHorizontal: 8,
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
})

export default MissingReport;
