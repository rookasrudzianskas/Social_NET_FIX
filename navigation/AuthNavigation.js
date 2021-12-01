import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SignedInStack, {SignedOutStack} from "./navigation";
import {firebase} from "../firebase";

const AuthNavigation = () => {

    const [currentUser, setCurrentUser] = useState(null);

    const userHandler = (user) => {
        user ? setCurrentUser(user) : setCurrentUser(null);
    };


    useEffect(() => {
        // fire once it loads up
        return firebase.auth().onAuthStateChanged(user => userHandler(user));

    }, []);

    return (
        <>
            {currentUser ? <SignedInStack /> : <SignedOutStack />}
        </>
    );
};

export default AuthNavigation;
