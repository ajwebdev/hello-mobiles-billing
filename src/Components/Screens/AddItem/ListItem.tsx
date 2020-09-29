import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet,TouchableHighlight,TouchableNativeFeedback } from "react-native";
import {
  FAB,
  DataTable,
  List,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import CardList from "././../../List/CardList";
import { db } from "../../firebaseConfig";
import { isEmpty, equals, always, cond, T, sort } from "ramda";
import CustomFlatList from "../../List/CustomFlatList";
import EmptyScreen from "../EmptyScreen";
import Loader from "../../Loader/Loader";
const ListItem = ({ navigation }: any) => {
  const [item, updateItem] = useState();
  const [isLoading, setLoading] = useState(false);
  const [sort, setSort] = useState({ col: "itemCreatedAt", dir: "desc" });

  useEffect(() => {
    fetchItem();
    const subscribe = navigation.addListener("focus", () => {
      fetchItem();
    });

    return subscribe;

  }, [navigation]);

  const fetchItem = async () => {
    setLoading(true);
    var item_data: any = [];
    var docRef = db.collection("items");
    await docRef
      .orderBy(sort.col, sort.dir)
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
    // console.log('iii');
    // item.map((data,index)=>{
    //   console.log(data)
    // })
    const title =
      item.itemName + " " + item.model + " (" + item.access_name + ")";
    const description =
      "Price :" + item.customerPrice + "\n" + "Stock :" + item.quantity;
    return (
      // <CardList
      //   title={title}
      //   description={description}
      //   navigation={() => navigation.navigate("addItem", item.id)}
      // />
      <TouchableNativeFeedback onPress={() => navigation.navigate("addItem", item.id)}>
      <Card style={styles.cardList}>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
      </Card>
      </TouchableNativeFeedback>
    );
  };

  const listItem = cond([
    [equals([] || undefined), always(<EmptyScreen Text="Please Add Item" />)],
    [
      T,
      always(
        <CustomFlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      ),
    ],
  ]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader isLoading={isLoading} /> : listItem(item)}

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
    bottom:50,
    backgroundColor: "#6200EE",
  },
  cardList:{flex:1,     flex: 1,  
    paddingRight: 10,  
    paddingTop: 10,  
      
    borderBottomWidth: 0.5,  
    borderColor: '#c9c9c9',  
    flexDirection: 'row',  
    alignItems: 'center',  
    }
});
export default ListItem;
