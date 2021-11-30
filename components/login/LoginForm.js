import React from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';

const LoginForm = () => {
    return (
        <View>
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
                <View>
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
    inputField: {
        marginBottom: 20,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#444'
    }
});
