import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FormikPostUploader from "./FormikPostUploader";
import {useNavigation} from "@react-navigation/native";

const AddNewPost = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {/*    Post form    */}
            {/*  formik  */}
            <FormikPostUploader />
        </View>
    );
};

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={{uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
            Add New Post 🚀
        </Text>
        <Text></Text>
    </View>
)

export default AddNewPost;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 23,
    },
});
