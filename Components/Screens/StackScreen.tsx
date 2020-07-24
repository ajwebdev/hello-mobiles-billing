import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import dashboard from "./Home/HomeScreen";
import accScreen from "./Accessories/AccessoriesScreen";
import additem from "../Screens/AddItem/AddItem";
import AppHeader from "../Header/AppHeader";

const AppStack = createStackNavigator();
const Screens = ({ navigation }) => {
  const headerOptions = {
    header: ({ scene, previous, navigation }) => {
      const { options } = scene.descriptor;
      return (
        <AppHeader HeaderTitle={options.title} navigationProps={navigation} />
      );
    },
    headerMode: "screen",
    headerShown: "false",
  };
  return (
    <AppStack.Navigator screenOptions={headerOptions}>
      <AppStack.Screen
        name="dashboard"
        options={{ title: "Dashboard" }}
        component={dashboard}
      />
      <AppStack.Screen
        name="accessories"
        options={{ title: "Accessories" }}
        component={accScreen}
      />
      <AppStack.Screen
        name="additem"
        options={{ title: "Add Item" }}
        component={additem}
      />
    </AppStack.Navigator>
  );
};
export default Screens;
