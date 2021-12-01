// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import NewPostScreen from "../screens/NewPostScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";


const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

export const SignedInStack = () => {
    return (
        <NavigationContainer>
            {/* if user is logged in*/}
            <Stack.Navigator initialRouteName={'HomeScreen'} screenOptions={screenOptions}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export const SignedOutStack = () => {
    return (
        <NavigationContainer>
            {/* if user is not logged in*/}
            <Stack.Navigator initialRouteName={'LoginScreen'} screenOptions={screenOptions}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default SignedInStack;
