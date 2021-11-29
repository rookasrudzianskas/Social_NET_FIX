import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {USERS} from '../../data/stories';

const Stories = () => {
    return (
        <View style={{marginTop: 15,}}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal >
                {USERS.map((story, index) => {
                    return (
                        <View key={index} style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 2, marginLeft: 6,
                        }}>
                            <Image style={styles.story} source={{ uri: story.image }} />
                            <Text style={{color: 'white'}}>{story.user.length > 11 ? story.user.slice(0, 10).toLowerCase() + '...' : story.user.toLowerCase()}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default Stories;

const styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderWidth: 3,
        borderRadius: 50,
        borderColor: '#ff8501',
    },
});

