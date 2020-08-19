import React from "react";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import dashboard from "./Home/HomeScreen";
import accScreen from "./Accessories/AccessoriesScreen";
import additem from "./AddItem/AddItem";
import products from "./Products/ProductScreen";
import report from "./Report/ReportScreen";
import addAccessories from "./Accessories/addAccessories";
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
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
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
       <AppStack.Screen
        name="products"
        options={{ title: "Products" }}
        component={products}
      />
      <AppStack.Screen
        name="report"
        options={{ title: "Report" }}
        component={report}
      />
     <AppStack.Screen
        name="addAccessories"
        options={{ title: "Add Accessories" }}
        component={addAccessories}
      />
    </AppStack.Navigator>
  );
};
export default Screens;
