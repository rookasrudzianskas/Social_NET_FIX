// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StatusBar} from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/NewPostScreen";
import SignedInStack from "./navigation/navigation";
import AuthNavigation from "./navigation/AuthNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      {/*<HomeScreen />*/}
        <AuthNavigation />
      {/*<StatusBar style="auto" />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      flex: 1,
  },
});


