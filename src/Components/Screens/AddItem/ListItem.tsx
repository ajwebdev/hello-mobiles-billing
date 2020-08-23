import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import CardList from "././../../List/CardList";
import { db } from "../../firebaseConfig";
import { isEmpty } from "ramda";
import CustomFlatList from "../../List/CustomFlatList";
import EmptyScreen from "../EmptyScreen";
import Loader from "../../Loader/Loader";

const ListItem = ({ navigation }: any) => {
  const [item, updateItem] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    fetchAccess();
    const subscribe = navigation.addListener("focus", () => {
      fetchAccess();
    });
    return subscribe;
  }, [navigation]);

  const fetchAccess = async () => {
    setLoading(true);

    var item_data:any = [];
    var docRef = db.collection("items");
    await docRef
      .orderBy("itemCreatedAt")
      .limit(50)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docs = doc.data();
          const data = {
            id: doc.id,
            access_name: docs.accessName,
            itemName: docs.itemName,
            model: docs.model,
            quantity: docs.quantity,
            customerPrice: docs.customerPrice,
            retailerPrice: docs.retailerPrice,
          };
          item_data.push(data);
          
        });
        setLoading(false);
        updateItem(item_data);
      });
  };

  const renderItem = ({ item }) => {
    const title=item.itemName +" "+item.model+" ("+item.access_name+")";
    const description="Price :"+item.customerPrice+"\n"+"Stock :"+item.quantity;

    return (
      <CardList
        title={title}
        description={description}
        navigation={() => navigation.navigate("addItem", item.id)}
      />
    );
  };

  const listItem = () => {
    if (!isEmpty(item)) {
      return (
        <CustomFlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      );
    } else {
      return <EmptyScreen Text="Please Add Items" />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader isLoading={isLoading} /> : listItem()}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("addItem")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    top:430,
    backgroundColor: "#6200EE",
  },
});
export default ListItem;
