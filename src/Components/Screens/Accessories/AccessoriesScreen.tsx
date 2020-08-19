import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import { FAB } from "react-native-paper";
import Loader from "../../Loader/Loader";
import { db } from "../../firebaseConfig";
import CardList from "../../List/CardList";

const AccessoriesScreen = ({ navigation }) => {
  const [access, updateAccess] = useState();
  const [isLoading, setLoading] = useState(false);
  const fetchAccess = async () => {
    setLoading(true);
    var access_data = [];
    var docRef = db.collection("accessories");
    await docRef
      .limit(50)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, access_name: doc.data().access_name };
          access_data.push(data);
        });
        setLoading(false);

        updateAccess(access_data);
      });
  };

  useEffect(() => {
    const subscribeTo = navigation.addListener('focus', () => {
    fetchAccess();
    });
    return subscribeTo;

  }, [navigation]);

  const renderItem = ({ item }) => {
    return <CardList Item={item} navigation={navigation} />;
  };
  return (
      <View style={{ flex: 1 }}>
        {isLoading ? <Loader isLoading={isLoading} />:
        <View>
      {access && (
        <SafeAreaView>
          <FlatList
            data={access}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      </View>}
      <View>
      </View>
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
