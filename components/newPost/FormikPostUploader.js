import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput, Button, Alert} from 'react-native';
import 'core-js/es6/promise';
import 'core-js/es6/set';
import 'core-js/es6/map';
import * as yup from 'yup';
import {Formik} from "formik";
import {Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

const uploadPostSchema = yup.object().shape({
   imageUrl: yup.string().url().required('A URL is required'),
   caption: yup.string().max(2200, 'A caption has reached the character limit.'),

});

const PLACEHOLDER_IMG = 'https://i.imgur.com/DiEdUYn.jpeg';

const FormikPostUploader = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const navigation = useNavigation();

    return (
        <Formik
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={(values) => {
                console.log(values);
                Alert.alert('Success', 'Your post has been uploaded.');
                navigation.goBack();

            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >

            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
                <>
                    <View style={{margin: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Image  source={{uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG}} style={{width: 100, height: 100}}/>

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
