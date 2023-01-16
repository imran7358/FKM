import react, { useState } from "react";
import { View, Text,StyleSheet, Image, TextInput} from "react-native";
import { ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {
    centerContainer,
    fontSize,
    inputBox,
    fontColor,
    commonMargin,
  } from '../../assets/styles/common';

const AddAccount = () => {
    const [checked, setChecked] = useState(true);
    const [option, setOption] = useState('Paytm');
    return (
        <ScrollView>
        <View style={styles.container}>
        <View style={styles.inputBoxContainer}>
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
    )

}

const styles = StyleSheet.create({
    container : {
        padding: 24,
        flex: 1,
    },
    radioOuter: {
        width:25,
        height:25,
        borderRadius: 45,
        borderWidth:1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerRadio: {
        width: 16,
        height:16,
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

})

export default AddAccount;
