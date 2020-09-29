import React, { useEffect, useState } from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import {
  Card,
  TextInput,
  Button,
  FAB,
  Paragraph,
  Title,
} from "react-native-paper";
import Loader from "../../Loader/Loader";
import { db } from "../../firebaseConfig";
import { equals, always, T, cond } from "ramda";
import CustomFlatList from "../../List/CustomFlatList";
import EmptyScreen from "../EmptyScreen";

const ListService = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [sort, setSort] = useState({ col: "serviceCreatedAt", dir: "desc" });
  const [service, updateService] = useState('');
  const [refresh,updateRefresh]=useState({
    limit:10,
    lastVisible: null,
    listLoading: false,
    listRefreshing: false,
  })
  useEffect(() => {
    fetchService();
    const subscribe = navigation.addListener("focus", () => {
      fetchService();
    });

    return subscribe;
  }, [navigation]);

  const fetchService = async () => {
    setLoading(true);
    updateRefresh({...refresh,...{listLoading:true}})
    var service_data: any = [];
    var  docRef = db.collection("service").orderBy(sort.col, sort.dir).limit(10);;
    docRef.get().then(function (documentSnapshots) {
      // Get the last visible document
      var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      console.log("last", lastVisible.data());
    
      // Construct a new query starting at this document,
      // get the next 25 cities.
      var next = db.collection("service")
              .startAfter(lastVisible)
              .limit(10).get().then((documentSnapshots)=>{
                var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      console.log("last", lastVisible.data());
              });
 console.log("next.data()")
 


      
    
            }
    
    );;
     
      
  };

  const renderItem = ({ item }) => {
    const title = item.serviceDesc + " " + " (" + item.customerName + ")";
    const description =
      "Service Cost :" +
      item.serviceCharge +
      "\n" +
      "Serviced Date :" +
      item.serviceDate;
    return (
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("service", item.id)}
      >
        <Card style={styles.cardList}>
          <Card.Content>
            <Title>{title}</Title>
            <Paragraph>{description}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableNativeFeedback>
    );
  };
const handleLoadMore=()=>{
  console.warn('test');
}
  const listService = cond([
    [
      equals([] || undefined),
      always(<EmptyScreen Text="Please Add Service" />),
    ],
    [
      T,
      always(
        <CustomFlatList
          data={service}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.01}
          initialNumToRender={10}
        />
      ),
    ],
  ]);
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Loader isLoading={isLoading} /> : listService(service)}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("service")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 50,
    backgroundColor: "#6200EE",
  },
  cardList: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderColor: "#c9c9c9",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ListService;
