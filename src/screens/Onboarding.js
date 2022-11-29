import react from "react";
import {View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Button } from "../assets/styles";

const OnboradingScreen = ({navigation}) => {

    return (
        <View style ={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Onboarding Screen</Text>
            <TouchableHighlight onPress={()=> navigation.navigate('Login')}>
                <Text>Lets Begin</Text>
            </TouchableHighlight>
        </View>
    )
}

export default OnboradingScreen;
