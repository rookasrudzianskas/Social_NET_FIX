import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SignedInStack, {SignedOutStack} from "./navigation";
import {firebase} from "../firebase";

const AuthNavigation = () => {

    useEffect(() => {
        // fire once it loads up
        const unsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('user signed in');
            } else {
                console.log('user signed out');
            }
        });

        return unsub();
    }, []);

    return (
        <>
            {currentUser ? <SignedInStack /> : <SignedOutStack />}
        </>
    );
};

export default AuthNavigation;
