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
      drawerStyle={{}}
    >
      <CustomDrawer.Screen name="Screens">
        {(props) => <Screens {...props} />}
      </CustomDrawer.Screen>
    </CustomDrawer.Navigator>
  );
};

export default Drawer;
