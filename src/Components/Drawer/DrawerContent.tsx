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
          {/* <List.Accordion
            title="Accessories"
            style={styles.listAccordion}
            titleStyle={{ fontWeight: "bold", fontSize: 13, left: 5 }}
            left={(props) => <List.Icon {...props} icon="view-list" />}
          >
            <CustomDrawerItem
              ItemLabel="View Accessories"
              ItemStyle={styles.labelInside}
              ItemEvent={() => CustomNavigation("accessories")}
            />
            <CustomDrawerItem
              ItemLabel="Add Accessories"
              ItemStyle={styles.labelInside}
              ItemEvent={() => CustomNavigation("addAccessories")}
            />
          </List.Accordion>

          <List.Accordion
            title="Products"
            style={styles.listAccordion}
            titleStyle={{ fontWeight: "bold", fontSize: 13, left: 5 }}
            left={(props) => <List.Icon {...props} icon="headphones" />}
          >
            <CustomDrawerItem
              ItemLabel="View Items"
              ItemStyle={styles.labelInside}
              ItemEvent={() => CustomNavigation("listItem")}
            />
            <CustomDrawerItem
              ItemLabel="Add Items"
              ItemStyle={styles.labelInside}
              ItemEvent={() => CustomNavigation("addItem")}
            />
          </List.Accordion> */}

          <CustomDrawerItem
            ItemLabel="Customers"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("customer")}
            ItemIcon={() => <Icon name="users" />}
            labelStyle={styles.labelStyle}
          />
           <CustomDrawerItem
            ItemLabel="Service"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("service")}
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
