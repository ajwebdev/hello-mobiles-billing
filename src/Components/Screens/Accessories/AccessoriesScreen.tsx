import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList, StyleSheet, Text } from "react-native";
import { FAB } from "react-native-paper";
import Loader from "../../Loader/Loader";
import { db } from "../../firebaseConfig";
import CardList from "../../List/CardList";
import EmptyScreen from "../EmptyScreen";
import CustomFlatList from "../../List/CustomFlatList";
import { isEmpty, equals, always, T } from "ramda";
import { cond } from "ramda";
const AccessoriesScreen = ({ navigation }) => {
  const [access, updateAccess] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      fetchAccess();
    });
    return subscribe;
  }, [navigation]);

  const fetchAccess = async () => {
    setLoading(true);
    var access_data = [];
    var docRef = db.collection("accessories");
    await docRef
      .orderBy("created_date")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, access_name: doc.data().access_name };
          access_data.push(data);
        });
        setLoading(false);
        updateAccess(access_data);
        console.log(access)
      });
  };

  const renderItem = ({ item }) => {
    return (
      <CardList
        title={item.access_name}
        navigation={() => navigation.navigate("addAccessories", item.id)}
      />
    );
  };

  const renderAccessories = cond([
    [equals([]), always(<EmptyScreen Text="Please Add Accessories" />)],
    [T,always( <CustomFlatList data={access} renderItem={renderItem}
          keyExtractor={(item: any) => item.id} />),],
  ]);

 

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader isLoading={isLoading} /> : renderAccessories(access)}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("addAccessories")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 25,
    backgroundColor: "#6200EE",
  },
});
export default AccessoriesScreen;
