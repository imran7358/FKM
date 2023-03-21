/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect } from 'react';
import { Typography } from './src/assets/styles';

import {
    StyleSheet,
    useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppNav from './src/navigation/AppNav';
import { Provider } from 'react-redux';
import { store, persistedStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
            <AppNav />
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        fontFamily: Typography,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
