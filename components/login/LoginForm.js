import React from 'react';
import {Text, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Validator from 'email-validator';
import * as yup from 'yup';
import {Formik} from 'formik';

const LoginForm = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.inputField}>
                <TextInput
                    placeholder="Phone number, username or email"
                    placeholderTextColor={'#444'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType={'emailAddress'}
                    autoFocus={true}
                />
            </View>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'#444'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType="default"
                        textContentType={'password'}
                        autoFocus={false}
                        secureTextEntry={true}
                    />
                </View>
            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
                <Text style={{color: '#6BB0F5'}}>Forgot Password?</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => console.log('Yoou have clicked me 👉 🔥')}>
                <Text style={{fontWeight: '600', color: 'white'}}>Login</Text>
            </TouchableOpacity>

            <View style={{marginTop: 10,}}>
                <Text style={{color: '#343434'}}>Don't have an account?</Text>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={{color: '#6BB0F5'}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    wrapper: {
      marginTop: 80,
    },
    inputField: {
        marginBottom: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#0096f6',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    },
});
