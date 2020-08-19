import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
const CustomDrawerItem = (props: any) => {
  return (
    <DrawerItem
      label={props.ItemLabel}
      style={props.ItemStyle}
      onPress={props.ItemEvent}
      icon={props.ItemIcon}
      labelStyle={{ fontWeight: "bold", color: "black" }}
      activeBackgroundColor="#CDA5EE"
      activeTintColor="black"
    />
  );
};

export default CustomDrawerItem;
