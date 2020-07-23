import React from "react";
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./Components/Drawer/Drawer";

const styles = StyleSheet.create({
  Container: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default function App() {
  return (
    <NavigationContainer>

      <CustomDrawer />
    </NavigationContainer>
  );
}
