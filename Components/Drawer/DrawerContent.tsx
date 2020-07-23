import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet, Image } from "react-native";
import { Drawer } from "react-native-paper";
import CustomDrawerItem from "./CustomDrawerItem";
const DrawerContent = (props: any) => {
  const CustomNavigation = (page: string) => {
    return props.navigation.navigate(page);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/hello-mobiles.png")}
                style={{ width: 300, height: 100 }}
              />
            </View>
          </View>
          <CustomDrawerItem
            ItemLabel="Home"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("dashboard")}
          />
          <CustomDrawerItem
            ItemLabel="Add Accessories"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("accessories")}
          />
          <CustomDrawerItem
            ItemLabel="Add Items"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("additem")}
          />
          <CustomDrawerItem
            ItemLabel="Products"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("dashboard")}
          />
          <CustomDrawerItem
            ItemLabel="Report"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("dashboard")}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

//Styles for  DrawerItems
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 0,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default DrawerContent;
