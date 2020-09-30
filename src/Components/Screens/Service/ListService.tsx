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
  const [service, updateService] = useState("");
  const [refreshLoad, setRefreshLoad] = useState(false);
  const [lastVisible, setLastVisible] = useState({});
  const [limit, setLimit] = useState(10);
  let onEndReachedCalledDuringMomentum = false;
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
    var docRef = db.collection("service").orderBy("serviceCreatedAt").limit(10);
    docRef.get().then((documentSnapshots) => {
      documentSnapshots.forEach((doc) => {
        const docs = doc.data();
        const data = {
          id: doc.id,
          customerName: docs.customerName,
          serviceCharge: docs.serviceCharge,
          serviceDate: docs.serviceDate,
          serviceDesc: docs.serviceDesc,
          customerId: docs.customerId,
        };
        service_data.push(data);
        setLoading(false);
      });
      updateService(service_data);
      // Get the last visible document

      var cursor = documentSnapshots.docs[documentSnapshots.docs.length - 1].id;
      if (cursor) {
        setLastVisible(cursor);
      } else {
        setLastVisible("");
        setRefreshLoad(false);
      }
    });
    setRefreshLoad(false);
  };

  const renderFooter = () => {
    if (!refreshLoad) return true;

    return (
      <ActivityIndicator
        size="large"
        color={"#D83E64"}
        style={{ marginBottom: 10 }}
      />
    );
  };
  const loadMore = async () => {
    if (lastVisible) {
   
      setRefreshLoad(true);
      var service_data: any = [];

      var next = await db
        .collection("service")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAfter(lastVisible)
        .limit(10)
        .get()
        .then((documentSnapshots) => {
          var cursor =documentSnapshots.docs[documentSnapshots.docs.length - 1].id;
         if(cursor){
           setLastVisible(cursor);
          documentSnapshots.forEach((doc) => {
            const docs = doc.data();
            const data = {
              id: doc.id,
              customerName: docs.customerName,
              serviceCharge: docs.serviceCharge,
              serviceDate: docs.serviceDate,
              serviceDesc: docs.serviceDesc,
              customerId: docs.customerId,
            };
            service_data.push(data);
          }
        );
        const newService = [...service, ...service_data];
        updateService(newService);

      }
      else{
        setLastVisible('');
        setRefreshLoad(false);

      }

       

        });
    }
    onEndReachedCalledDuringMomentum = true;
    setRefreshLoad(false);
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
  const handleLoadMore = () => {
    console.warn("test");
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
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum && !refreshLoad) {
              loadMore();
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

export default ListService;
