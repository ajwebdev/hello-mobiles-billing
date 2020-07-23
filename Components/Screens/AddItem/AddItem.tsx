import React from "react";
import { View, Text, Button } from "react-native";

const AddItem = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Accessories Screen</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Go back"
      />
    </View>
  );
};

export default AddItem;
