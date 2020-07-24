import React from "react";
import { View, Text, Button } from "react-native";

const AccessoriesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Accessories Screen</Text>
      <Button
        onPress={() => navigation.navigate("dashboard")}
        title="Navigate"
      />
    </View>
  );
}

export default AccessoriesScreen;
