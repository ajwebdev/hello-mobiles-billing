import React from "react";
import { List } from "react-native-paper";
import { TouchableOpacity, Text } from "react-native";
const CardList = (props: any) => {
  const title = props.title ? props.title : "";
  const description = props.description ? props.description : "";
  return (
    <List.Item
      title={title}
      description={description}
      {...props}
      style={props.Cstyle}
      right={() => {
        return (
          <TouchableOpacity onPress={props.navigation}>
            <List.Icon {...props} icon="pencil" />
          </TouchableOpacity>
        );
      }}
    />
  );
};
export default CardList;
