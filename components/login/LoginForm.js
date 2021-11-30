import React from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';

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
            <Button title={'Login'} />
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
        borderColor: '#8d8d8d',
        borderRadius: 4,
    }
});
