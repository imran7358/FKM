import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {
  centerContainer,
  fontSize,
  inputBox,
  fontColor,
  commonMargin,
} from '../assets/styles/common';

const EnterOTP = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/login-image.png')} />
      </View>
      <View>
        <Text style={[styles.headingSize]}>Forgot Password</Text>
      </View>
      <View style={styles.forgotParagraph}>
        <Text style={styles.innerPara}>An 6 digit code has been send to</Text>
        <Text style={styles.registeredNumber}>+ 91 9718158993</Text>
      </View>
      <View style={styles.inputView}>
        <View style={[styles.inputBoxContainer, styles.otpBoxContainer]}>
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
          <TextInput
            style={[styles.inputText, styles.lableFont]}
            placeholder="*"
          />
        </View>
        <View style={styles.passwordContainer}>
            </View>
			<View style={styles.loginButton}>
									<Text style={styles.loginTxt}>Submit</Text>
        </View>
      </View>
    </View>
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

export default EnterOTP;
