import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {firebase} from "../../firebase";

// Header ADD Icon >> https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png
// Header Heart Icon >> https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png
// Header Messages Icon >> https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                firebase.auth().signOut().then(() => {
                    navigation.navigate('Login');
                }).catch(error => {
                    console.log(error);
                });
            }}>
                <Image style={styles.logo} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png'}} />
            </TouchableOpacity>


            <View style={styles.iconContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('NewPostScreen')}>
                    <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'}} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}>
                    <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'}} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'}} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 10,
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
  });

