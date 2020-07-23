import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../Drawer/DrawerContent";
import Screens from "../Screens/StackScreen";

const CustomDrawer = createDrawerNavigator();
const Drawer = (props: any) => {
  return (
    <CustomDrawer.Navigator
      initialRouteName="dashboard"
      drawerContent={DrawerContent}
      drawerType="slide"
    >
      <CustomDrawer.Screen name="Screens">
        {(props) => <Screens {...props} style={{ flex: 1 }} />}
      </CustomDrawer.Screen>
    </CustomDrawer.Navigator>
  );
};
export default Drawer;
