import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet, Image } from "react-native";
import Icon from "../Icon/Icon";
import CustomDrawerItem from "./CustomDrawerItem";
import { Drawer } from "react-native-paper";

const DrawerContent = (props: any) => {
  const CustomNavigation = (page: string) => {
    return props.navigation.navigate(page);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/hello-mobiles.png")}
              style={styles.Logo}
            />
          </View>

          <CustomDrawerItem
            ItemLabel="Home"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("dashboard")}
            ItemIcon={() => <Icon name="home" />}
          />

          <CustomDrawerItem
            ItemLabel="Add Accessories"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("accessories")}
            ItemIcon={() => <Icon name="list" />}
          />
          <CustomDrawerItem
            ItemLabel="Add Items"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("additem")}
            ItemIcon={() => <Icon name="smartphone" />}
          />
          <CustomDrawerItem
            ItemLabel="Products"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("dashboard")}
            ItemIcon={() => <Icon name="package" />}
          />
          <CustomDrawerItem
            ItemLabel="Report"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("dashboard")}
            ItemIcon={() => <Icon name="file-plus" />}
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
  drawerSection: {
    marginTop: 0,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },

  label: {
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  Logo: {
    height: 150,
    width: 300,
    marginTop: -5,
  },
});

export default DrawerContent;
