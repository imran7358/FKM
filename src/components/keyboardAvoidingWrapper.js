import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';

const KeybaordAvoidingWrapper = ({children}) => {

    return (
        <KeyboardAvoidingView style = {{flex:1}} behavior="height">
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}

export default KeybaordAvoidingWrapper;
