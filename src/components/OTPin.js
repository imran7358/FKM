import React, { useRef, useState } from 'react';
import {TextInput,View, StyleSheet} from 'react-native';
import {
    centerContainer,
    fontSize,
    inputBox,
    fontColor,
    commonMargin,
  } from '../assets/styles/common';
const OTPin = (props) => {
    const refs = useRef([]);
    const arr = Array.from(Array(props.in));
    const [p,setp] = useState(arr);
    return (
        <>
        <View style={[styles.inputBoxContainer, styles.otpBoxContainer]}>
            {arr.map((e,i)=><TextInput   style={[styles.inputText, styles.lableFont]}
            key={i}
            maxLength={1}
            keyboardType='numeric'
            placeholder="A" 
            ref={(ref) => {refs.current[i] = ref}} 
            value={p[i]}
            onChangeText={(t)=>{
                if(t.length <= 1){
                    let inp = p;
                    p[i] = t;
                    setp(inp);
                }
                if(i+1<arr.length){
                    refs.current[i+1].focus();
                }
                else{
                    props.onDone(p.join(''));
                }
            }}></TextInput>
            )}
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    imageContainer: {
      alignItems: centerContainer.alignCenter,
    },
    headingSize: {
      fontSize: fontSize.headingFont,
      fontWeight: '900',
    },
    logo: {
      height: 128,
      width: 128,
    },
    inputBoxContainer: {
      position: 'relative',
      marginTop: 30,
    },
    icon: {
      position: 'absolute',
      top: 36,
      left: 20,
    },
    inputText: {
      padding: 10,
      borderWidth: inputBox.borderWidth,
      marginTop: inputBox.marginTop,
      borderColor: inputBox.borderColor,
      borderRadius: inputBox.borderRadius,
      color: '#333333',
      width: 55,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      alignContent: 'center',
      textAlign: 'center',
      fontSize: 30,
      backgroundColor: '#f0f0f0',
    },
  
    lableFont: {
      fontSize: fontSize.inputFont,
    },
    forgotPassword: {
      color: fontColor.linkColor,
      fontSize: fontSize.inputFont,
      fontWeight: '700',
      marginTop: commonMargin.marginTop,
      justifyContent: 'flex-end',
    },
    passwordContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
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
  
    font14: {
      fontSize: 14,
    },
    font16: {
      fontSize: 16,
    },
    forgotParagraph: {
      fontSize: fontSize.lableFont,
      marginTop: commonMargin.margin10,
    },
    innerPara: {
      lineHeight: 25,
      fontSize: fontSize.lableFont,
    },
    registeredNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 7,
    },
    otpBoxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      justifyCenter: 'center',
    },
  });

export default OTPin;
