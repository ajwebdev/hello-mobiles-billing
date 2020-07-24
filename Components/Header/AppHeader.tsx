import React from "react";
import { Appbar } from "react-native-paper";

const AppHeader = (props: any) => {
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigationProps.toggleDrawer()}
      />
      <Appbar.Content title={props.HeaderTitle} />
      <Appbar.Action icon="magnify" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
}

export default AppHeader;
