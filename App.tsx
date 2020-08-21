import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./src/Components/Drawer/Drawer";
import fconfig from "./src/Components/firebaseConfig";
import firebase from "firebase";
if (!firebase.apps.length) {
  firebase.initializeApp(fconfig);
}

const App = () => {
  return (
    <NavigationContainer>
      <CustomDrawer />
    </NavigationContainer>
  );
};
export default App;
