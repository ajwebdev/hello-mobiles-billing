import React, { useEffect, useState } from "react";
import { View,Text, TouchableNativeFeedback,StyleSheet } from "react-native";
import { Card, TextInput, Button, FAB, Paragraph, Title } from "react-native-paper";
import Loader from "../../Loader/Loader";
import { db } from "../../firebaseConfig";
import { equals, always, T, cond } from "ramda";
import CustomFlatList from "../../List/CustomFlatList";
import EmptyScreen from "../EmptyScreen";


const ListService =({navigation})=>{
    
const [isLoading,setLoading]=useState(false)
const [sort, setSort] = useState({ col: "serviceCreatedAt", dir: "desc" });
const [service, updateService] = useState();

useEffect(() => {
    fetchService();
    const subscribe = navigation.addListener("focus", () => {
        fetchService();
    });

    return subscribe;

  }, [navigation]);

  const fetchService = async () => {
    setLoading(true);
    var service_data: any = [];
    var docRef = db.collection("service");
    await docRef
      .orderBy(sort.col, sort.dir)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docs = doc.data();

          const data = {
            id: doc.id,
            customerName: docs.customerName,
            serviceCharge: docs.serviceCharge,
            serviceCreatedAt: docs.serviceCreatedAt,
            serviceDate: docs.serviceDate,
            serviceDesc: docs.serviceDesc,
            serviceDiscount: docs.serviceDiscount,
          };
          service_data.push(data);
        });
        setLoading(false);
        updateService(service_data);
      });
  };


  const renderItem = ({ item }) => {

    const title =
      item.serviceDesc + " " + " (" + item.customerName + ")";
    const description =
      "Service Cost :" + item.serviceCharge + "\n" + "Serviced Date :" + item.serviceDate;
    return (
  
      <TouchableNativeFeedback onPress={() => navigation.navigate("addItem", item.id)}>
      <Card>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
      </Card>
      </TouchableNativeFeedback>
    );
  };

  const listService = cond([
    [equals([] || undefined), always(<EmptyScreen Text="Please Add Item" />)],
    [
      T,
      always(
        <CustomFlatList
          data={service}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      ),
    ],
  ]);
return(
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader isLoading={isLoading} /> : listService(service)}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("service")}
      />
    </View>)
}

const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      margin: 20,
      right: 0,
      bottom:50,
      backgroundColor: "#6200EE",
    },
  });

export default ListService;