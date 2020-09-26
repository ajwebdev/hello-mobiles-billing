import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableHighlight,TouchableNativeFeedback } from "react-native";
import {
  FAB,
  DataTable,
  List,
  Card,
  Title,
  Paragraph,
  Button
} from "react-native-paper";
import CardList from "../../List/CardList";
import { db } from "../../firebaseConfig";
import { isEmpty, equals, always, cond, T, sort } from "ramda";
import CustomFlatList from "../../List/CustomFlatList";
import EmptyScreen from "../EmptyScreen";
import Loader from "../../Loader/Loader";
import groupBy from "lodash.groupby";

const CustomerList = ({ navigation }: any) => {
  const [customer, updateCustomer] = useState();
  const [isLoading, setLoading] = useState(false);
  const [sort, setSort] = useState({ col: "itemCreatedAt", dir: "desc" });

  useEffect(() => {
    customerItem();
    const subscribe = navigation.addListener("focus", () => {
      customerItem();
    });

    return subscribe;

  }, [navigation]);

  const customerItem = async () => {
    setLoading(true);
    var customer_item: any = [];
    var docRef = db.collection("customers");
    await docRef
      .orderBy(sort.col, sort.dir)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docs = doc.data();

          const data = {
            id: doc.id,
            customerName: docs.customerName,
            customerMobileNumber: docs.customerMobileNumber,
            customerIMEI: docs.customerIMEI
          };
          customer_item.push(data);
        });
        setLoading(false);
    
        updateCustomer(customer_item);
      });
  };

  const renderItem = ({item}) => {
   
    const title =
    item.customerName + " " + item.customerMobileNumber;
    const description =  item.customerIMEI;
    return (
      <View>
      <Button onPress={() => navigation.navigate("customer", item.id)}>EDIT</Button>
      <Card>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
      </Card>
      </View>

    );
  };

  const listItem = cond([
    [equals([] || undefined), always(<EmptyScreen Text="Please Add Customer" />)],
    [
      T,
      always(
        <CustomFlatList
          data={customer}
          renderItem={renderItem}
          keyExtractor={(customer: any) => customer.id}
        />
      ),
    ],
  ]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader isLoading={isLoading} /> : listItem(customer)}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("customer")}
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
});
export default CustomerList;
