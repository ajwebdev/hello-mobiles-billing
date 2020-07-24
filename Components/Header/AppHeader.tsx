import React from "react";
import { Appbar } from "react-native-paper";
import { StatusBar, View } from "react-native";
import styles from "./HeaderStyle";
const AppHeader = (props: any) => {
  const primaryColor = styles.header.backgroundColor;
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigationProps.toggleDrawer()}
        />
        <Appbar.Content title={props.HeaderTitle} />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <StatusBar backgroundColor={primaryColor} />
    </View>
  );
};

export default AppHeader;
