import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput, Button, Alert} from 'react-native';
import * as yup from 'yup';
import {Formik} from "formik";
import {Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import validUrl from 'valid-url';
import {useEffect} from "react";
import {db, firebase} from "../../firebase";

const uploadPostSchema = yup.object().shape({
   imageUrl: yup.string().url().required('A URL is required'),
   caption: yup.string().max(2200, 'A caption has reached the character limit.'),

});

const PLACEHOLDER_IMG = 'https://i.imgur.com/DiEdUYn.jpeg';

const FormikPostUploader = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
    const navigation = useNavigation();

    const getUsername = () => {
        const user = firebase.auth().currentUser;
        console.log(user);
        return db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(snapshot => snapshot.docs.map(doc => {
            setCurrentLoggedInUser({
                username: doc.data().username,
                profile_picture: doc.data().profile_picture,
            });
        }));
    };

    useEffect(() => {
        getUsername();

    }, []);

    const uploadPostToFirebase = async (imageUrl, caption) => {
        console.log(currentLoggedInUser);
         const unsub = await db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add({
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profile_picture,
            owner_email: firebase.auth().currentUser.email,
            owner_uid: firebase.auth().currentUser.uid,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users: [],
            comments: [],
        }).then(navigation.goBack());
         return unsub;
    }

    return (
        <Formik
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={async (values) => {
                // console.log(values);
                await uploadPostToFirebase(values.imageUrl, values.caption);
                Alert.alert('Success', 'Your post has been uploaded.');
                navigation.goBack();

            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >

            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
                <>
                    <View style={{margin: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Image  source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}} style={{width: 100, height: 100}}/>

                    <View style={{flex: 1, marginLeft: 12}}>
                        <TextInput
                            placeholder="Write a caption..."
                            placeholderTextColor={'gray'}
                            multiline={true}
                            style={{
                                color: 'white',
                                fontSize: 20,
                            }}
                            onChangeText={handleChange('caption')}
                            onBlur={handleBlur('caption')}
                            value={values.caption}
                        />
                    </View>

                    </View>
                    <Divider width={0.2} orientation={'vertical'} />
                    <TextInput
                        placeholder="Enter image url..."
                        onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        placeholderTextColor={'gray'}
                        style={{
                            color: 'white',
                            fontSize: 18,
                        }}
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{color: 'red'}}>{errors.imageUrl}</Text>
                    )}

                    <Button onPress={handleSubmit} title={'Share'} disabled={!isValid} />
                </>
                )}

        </Formik>
    );
};

export default FormikPostUploader;
