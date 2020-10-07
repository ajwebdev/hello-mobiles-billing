import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
import firebase from "firebase";
import "firebase/firestore";

const ListService = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [service, updateService] = useState([]);
  const [isMoreLoading, setisMoreLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState("");
  const [limit, setLimit] = useState(10);
  let onEndReachedCalledDuringMomentum = true;
  const documentId=firebase.firestore.FieldPath.documentId();
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
    var docRef =await db.collection("service").orderBy(documentId).limit(10).get();
    if (!docRef.empty) {
      const cursor=docRef.docs[docRef.docs.length - 1].id;
      setLastVisible(cursor)
      for (let i = 0; i < docRef.docs.length; i++) {
        const data=docRef.docs[i].data();
        const serviceId={id:docRef.docs[i].id};
        service_data.push({...data,...serviceId});
      }
      console.log("old service");
      console.log(service_data);
      updateService(service_data);
  }
  else{
    setLastVisible("")

  }
  setLoading(false);

}

  const renderFooter = () => {
    if (!isMoreLoading) return true;
    return (
      <ActivityIndicator
        size="large"
        color={"#D83E64"}
        style={{ marginBottom: 10 }}
      />
    );
  };
  const loadMore = async () => {
    console.log('loading..'+lastVisible)
    if (lastVisible) {
      setisMoreLoading(true);
      setTimeout(async() => {  
      var nextDocRef = await db.collection("service")
        .orderBy(documentId,)
        .startAfter(lastVisible)
        .limit(10)
        .get()
        if (!nextDocRef.empty) {
          let newService = service;
          setLastVisible(nextDocRef.docs[nextDocRef.docs.length - 1].id);
          console.log('lastVisible..'+nextDocRef.docs[nextDocRef.docs.length - 1].id)
  
          for(let i = 0; i < nextDocRef.docs.length; i++) {
            const data=nextDocRef.docs[i].data();
            const serviceId={id:nextDocRef.docs[i].id};
            newService.push({...data,...serviceId});
            
          }
          console.log("newService");

          console.log(newService);
          updateService(newService);
          console.log(" .docs.length");
          console.log(nextDocRef.docs.length);
          if (nextDocRef.docs.length < 10) setLastVisible("");
        } else {
          setLastVisible("");
        }
  
        setisMoreLoading(false);
    
  },1000)
}
onEndReachedCalledDuringMomentum = true;
  }

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
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          ListFooterComponent={renderFooter}
          bounces={false}
        
          onMomentumScrollBegin={() => {onEndReachedCalledDuringMomentum = false; }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
              loadMore();
              onEndReachedCalledDuringMomentum=true;
            }
          }}
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

export default ListService