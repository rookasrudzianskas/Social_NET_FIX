import React from 'react';
import {Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Validator from 'email-validator';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from "@react-navigation/native";
import {db, firebase} from "../../firebase";

const SignUpForm = () => {

    const SignUpFormSchema = yup.object().shape({
        email: yup.string().required('An email is required.').email(),
        username: yup.string().required().min(2, 'Username must be at least 2 characters.'),
        password: yup.string().required().min(6, 'You password must be at least 6 characters.')
    });

    const navigation = useNavigation();

    const getRandomProfilePicture = async () => {
        const response = fetch('https://randomuser.me/api/');
        const data = await response.json();
        return data.results[0].picture.large;
    }

    const onSignUp = async (email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
            navigation.navigate('HomeScreen');
            await db.collection('users').add({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            });
        } catch (error) {
            Alert.alert('🔥 My Lord...', error.message + '\n\n... What would you like to do next 👀',[
                {
                    text: 'OK',
                    onPress: () => console.log('OK'),
                    style: 'cancel'
                },
                {
                    text: 'Log in', onPress: () => navigation.navigate('LoginScreen')
                }
            ]);
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', username: '', password: ''}}
                onSubmit={(values, actions) => {
                    // console.log(values);
                    onSignUp(values.email, values.username, values.password);
                    // actions.setSubmitting(false);
                }}
                validationSchema={SignUpFormSchema}
                validateOnMount={true}
            >
                {({handleChange, handleSubmit, handleBlur, values, isValid}) => (
                    <>
                        <View style={[styles.inputField,
                            {borderColor: values.email.length < 1 || Validator.validate(values.email) ? "#ccc" : 'red'}
                        ]}>
                            <TextInput
                                placeholder="Phone Number, Email"
                                placeholderTextColor={'#444'}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType="email-address"
                                textContentType={'emailAddress'}
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>

                        <View style={[styles.inputField,
                            {borderColor: 1 > values.username.length || values.username.length ? "#ccc" : 'red'}
                        ]}>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor={'#444'}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType="email-address"
                                textContentType={'emailAddress'}
                                autoFocus={true}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>

                        <View style={[styles.inputField,
                            {borderColor: 1 > values.password.length || values.password.length >= 6 ? "#ccc" : 'red'}
                        ]}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'#444'}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType="default"
                                textContentType={'password'}
                                autoFocus={false}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <View style={{alignItems: 'flex-end', marginBottom: 30}}>
                            <Text style={{color: '#6BB0F5'}}>Forgot Password?</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.button(isValid)}  onPress={() => {
                            handleSubmit();
                        }}>
                            <Text style={{fontWeight: '600', color: 'white'}}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={{marginTop: 10,}}>
                            <Text style={{color: '#343434'}}>Already have an account?</Text>
                            <TouchableOpacity activeOpacity={0.5}  onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={{color: '#6BB0F5'}}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default SignUpForm;

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
    button: isValid => ({
        backgroundColor: isValid ? '#0096f6' : '#9acaf7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    }),
});
