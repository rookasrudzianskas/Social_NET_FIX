import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SignedInStack, {SignedOutStack} from "./navigation";

const AuthNavigation = () => {
    return (
        <>
            {currentUser ? <SignedInStack /> : <SignedOutStack />}
        </>
    );
};

export default AuthNavigation;
