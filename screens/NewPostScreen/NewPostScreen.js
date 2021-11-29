import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import AddNewPost from "../../components/newPost/AddNewPost";

const NewPostScreen = () => {
    return (
        <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
            <AddNewPost />
        </SafeAreaView>
    );
};

export default NewPostScreen;
