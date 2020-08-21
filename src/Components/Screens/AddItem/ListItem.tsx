import React from "react";
import { View, Text, Button ,StyleSheet} from "react-native";
import { FAB } from "react-native-paper";
import CardList from "././../../List/CardList";
// import CardList from "src/component/List/CardList";
const ListItem = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
    <CardList title="hello"/>
    <View>
    <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("additem")}
      />
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    top: 370,
    backgroundColor: "#6200EE",
  },
});
export default ListItem;
