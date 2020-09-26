import React from "react";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import dashboard from "./Home/HomeScreen";
import accScreen from "./Accessories/AccessoriesScreen";
import addAccessories from "./Accessories/addAccessories";
import additem from "./AddItem/AddItem";
import listItem from "./AddItem/ListItem";
import products from "./Products/ProductScreen";
import customer from "./Customer/Customer";
import service from "./Service/Service";
import report from "./Report/ReportScreen";
import AppHeader from "../Header/AppHeader";
import ListService from "./Service/ListService";
import customerList from "./Customer/CustomerList";
 const AppStack = createStackNavigator();
const Screens = ({ navigation }) => {
  const headerOptions = {
    header: ({ scene, navigation }:any) => {
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
        name="addItem"
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

      <AppStack.Screen
        name="listItem"
        options={{ title: "Item List" }}
        component={listItem}
      />
      
      <AppStack.Screen
        name="customer"
        options={{ title: "Customers" }}
        component={customer}
      />

      <AppStack.Screen
        name="customerList"
        options={{ title: "Customer List" }}
        component={customerList}
      />

       <AppStack.Screen
        name="service"
        options={{ title: "Add Service" }}
        component={service}
      />
       <AppStack.Screen
        name="listService"
        options={{ title: "Service" }}
        component={ListService}
      />
    </AppStack.Navigator>
  );
};
export default Screens;