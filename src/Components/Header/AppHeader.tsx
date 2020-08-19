import React from "react";
import { Appbar } from "react-native-paper";
import { StatusBar, View } from "react-native";
import styles from "./HeaderStyle";
const AppHeader = (props: any) => {
  const primaryColor = styles.header.backgroundColor;

  const toggleBtn = <Appbar.Action icon="menu" onPress={() => props.navigationProps.toggleDrawer()}
    />
  
  const backBtn = <Appbar.BackAction onPress={() => props.navigationProps.goBack()} />
  
  const headerButton = props.navigationProps.canGoBack() ? backBtn : toggleBtn;
  return (
    <View>
      <Appbar.Header style={styles.header}>
        {headerButton}
        <Appbar.Content title={props.HeaderTitle} />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <StatusBar backgroundColor={primaryColor} />
    </View>
  );
};

export default AppHeader;
