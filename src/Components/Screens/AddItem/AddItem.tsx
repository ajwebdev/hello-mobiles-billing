import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Card, TextInput, HelperText } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";
import { db } from "../../firebaseConfig";
const AddItem = ({ navigation }) => {
  const [access, updateAccess] = useState();
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      fetchAccess();
    });
    return subscribe;
  }, [navigation]);

  const fetchAccess = async () => {
    var access_data = [];
    var docRef = db.collection("accessories");
    await docRef
      .orderBy("created_date")
      .limit(50)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { value: doc.data().access_name };
          access_data.push(data);
        });
        updateAccess(access_data);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Card style={{ width: "auto", marginTop: 25 }}>
          <Card.Title title="Add Item" />
          <Card.Content>
            <Dropdown label="Accessories Name" data={access} useNativeDriver={true} />
            <TouchableOpacity
              onPress={() => navigation.navigate("addAccessories")}
            >
                <Text   style={{textAlign: 'right',color:"#6200EE",textDecorationLine: 'underline',fontSize:14}}>
                Add Accessories
                  </Text>
            </TouchableOpacity>

            <TextInput mode="flat" label="Item Name" />
            <TextInput mode="flat" label="Item Model" />
            <TextInput mode="flat" label="Item Model" />

          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default AddItem;
