import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./src/Components/Drawer/Drawer";
import {StatusBar} from 'react-native';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <CustomDrawer />
    </NavigationContainer>
  );
};
export default App;
