import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet, Image } from "react-native";
import Icon from "../Icon/Icon";
import CustomDrawerItem from "./CustomDrawerItem";
import { Drawer, List } from "react-native-paper";        
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
              source={require("../../../assets/hello-mobiles.png")}
              style={styles.Logo}
            />
          </View>

          <CustomDrawerItem
            ItemLabel="Home"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("dashboard")}
            ItemIcon={() => <Icon name="home" />}
            labelStyle={styles.labelStyle}
          />
          <CustomDrawerItem
            ItemLabel="Accessories"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("accessories")}
            ItemIcon={() => <Icon name="list" />}
            labelStyle={styles.labelStyle}
          />
          <CustomDrawerItem
            ItemLabel="Items"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("listItem")}
            ItemIcon={() => <Icon name="smartphone" />}
            labelStyle={styles.labelStyle}
          />
          <CustomDrawerItem
            ItemLabel="Customers"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("customerList")}
            ItemIcon={() => <Icon name="users" />}
            labelStyle={styles.labelStyle}
          />
           <CustomDrawerItem
            ItemLabel="Service"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("listService")}
            ItemIcon={() => <Icon name="hard-drive" />}
            labelStyle={styles.labelStyle}
          />
          <CustomDrawerItem
            ItemLabel="Report"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("report")}
            ItemIcon={() => <Icon name="file-plus" />}
            labelStyle={styles.labelStyle}
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

  label: {
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  labelInside: {
    fontFamily: "Roboto",
    left: 70,
    color: "black",
  },
  labelStyle: {
    fontWeight: "bold",
    color: "black",
  },
  listAccordion: {
    right: 8,
  },
  Logo: {
    height: 150,
    width: 300,
    marginTop: -5,
  },
});

export default DrawerContent;
