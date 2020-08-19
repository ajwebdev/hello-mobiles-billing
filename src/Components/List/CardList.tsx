import React from "react";
import { List } from "react-native-paper";
import { TouchableOpacity, Text } from "react-native";
const CardList = (props: any) => {
  return (
    <List.Item
      title={props.Item.access_name}
      description={props.Item.created_date}
      right={() => {
        return (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("addAccessories",props.Item.id)}
          >
            <List.Icon {...props} icon="pencil" />

          </TouchableOpacity>
        );
      }}
    />
  );
};
export default CardList;
