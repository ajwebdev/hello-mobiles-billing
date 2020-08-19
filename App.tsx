import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./src/Components/Drawer/Drawer";
import fconfig from "./src/Components/firebaseConfig";
import  firebase from "firebase";


if (!firebase.apps.length) {
  firebase.initializeApp(fconfig);
}




const styles = StyleSheet.create({
  Container: { flex: 1, alignItems: "center", justifyContent: "center" },
});


const App = () => {
  return (
    <NavigationContainer>
      <CustomDrawer />
    </NavigationContainer>
  );
};
export default App;
