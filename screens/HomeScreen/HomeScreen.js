import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView, FlatList} from 'react-native';
import Header from "../../components/home/Header";
import Stories from "../../components/home/Stories";
import Post from "../../components/home/Post";
import {POSTS} from "../../data/posts";
import BottomTabs from "../../components/home/BottomTabs";
import {bottomTabIcons} from "../../assets/Bottom Tab Icons";
import {db} from "../../firebase";
// import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collectionGroup('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => (
                {id: doc.id, ...doc.data()})))
        });
    }, []);

    console.log("🔥", posts);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 140}}>
                {posts.map((post, index) => {
                    return <Post key={index} post={post} />
                })}
            <View>
                <BottomTabs icons={bottomTabIcons} />
            </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        // flex: 1,
    }
});

//DONE
