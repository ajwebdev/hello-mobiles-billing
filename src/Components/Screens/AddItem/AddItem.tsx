import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Card, TextInput, HelperText, Button } from "react-native-paper";
import { db } from "../../firebaseConfig";
import { setTime } from "../../../utilities/setTime";
import Loader from "../../Loader/Loader";
import { isEmpty } from "ramda";
import Dropdown from "../../DropDown/DropDown";
import style from "../../Header/HeaderStyle";

const AddItem = ({ navigation, route }: any) => {
  const [access, updateAccess] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const [accessName, updateAccessName] = useState({ id: "", name: "" });
  const [itemName, updateItemName] = useState("");
  const [model, updateModel] = useState("");
  const [quantity, updateQuantity] = useState("");
  const [customerPrice, updateCustomerPrice] = useState("");
  const [retailerPrice, updateRetailerPrice] = useState("");
  const id = route.params;
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      fetchAccess();
      if (!id) {
        setLoading(false);
      }
    });
    if (id) {
      fetchSingleDoc();
    }
    return subscribe;
  }, [navigation]);

  const fetchAccess = async () => {
    var access_data: any = [];
    var docRef = db.collection("accessories");
    await docRef
      .orderBy("created_date")
      .limit(50)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, name: doc.data().access_name };
          access_data.push(data);
        });
        updateAccess(access_data);
      });
  };
  const fetchSingleDoc = async () => {
    var docRef = db.collection("items").doc(id);
    await docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const access_name = data.accessName;
        const itemName = data.itemName;
        const quantity = data.quantity;
        const model = data.model;
        const cusPrice = data.customerPrice;
        const retailPrice = data.retailerPrice;
        updateAccessName({ id: data.accessNameId, name: access_name });
        updateItemName(itemName);
        updateQuantity(quantity);
        updateModel(model);
        updateCustomerPrice(cusPrice);
        updateRetailerPrice(retailPrice);
      } else {
        navigation.goBack();
      }
    });
    setLoading(false);
  };
  const addItem = async () => {
    await db
      .collection("items")
      .doc()
      .set({
        accessName: accessName.name,
        accessNameId: accessName.id,
        itemName: itemName,
        model: model,
        quantity: quantity,
        customerPrice: customerPrice,
        retailerPrice: retailerPrice,
        itemCreatedAt: setTime(),
      })
      .then(() => navigation.navigate("listItem"));
  };

  const delItem = () => {
    if (id) {
      db.collection("items")
        .doc(id)
        .delete()
        .then(function () {
          navigation.goBack();
        });
    }
  };
  const updateItem = async () => {
    setLoading(true);

    await db
      .collection("items")
      .doc(id)
      .update({
        accessName: accessName.name,
        accessNameId: accessName.id,
        itemName: itemName,
        model: model,
        quantity: quantity,
        customerPrice: customerPrice,
        retailerPrice: retailerPrice,
      })
      .then(() => navigation.navigate("listItem"));
    setLoading(false);
  };

  const styles = StyleSheet.create({
    input: {
      flexDirection: "column",
      marginTop: 15,
    },
    sideText: {
      textAlign: "right",
      color: "#6200EE",
      textDecorationLine: "underline",
      fontSize: 14,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ padding: 5 }}>
              <Card style={{ width: "auto", marginTop: 25 }}>
                <Card.Title title={id ? "Update Item" : "Add Item"} />
                <Card.Content>
                  <Dropdown
                    onItemSelect={(text: any) => {
                      updateAccessName(text);
                    }}
                    items={access}
                    value={accessName.name}
                    placeholder="Accessories"
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate("addAccessories")}
                  >
                    <Text style={styles.sideText}>Add Accessories</Text>
                  </TouchableOpacity>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Product Name"
                      onChangeText={(itemName) => updateItemName(itemName)}
                      value={itemName}
                    />
                  </View>
                  {/* show only if category is phone */}
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Product Model"
                      onChangeText={(model) => updateModel(model)}
                      value={model}
                    />
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Quantity"
                      onChangeText={(quantity) => updateQuantity(quantity)}
                      value={quantity}
                      keyboardType={'numeric'}
                      contextMenuHidden={true}
                    />
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Customer Price"
                      onChangeText={(customerPrice) =>
                        updateCustomerPrice(customerPrice)
                      }
                      value={customerPrice}
                      keyboardType={'numeric'}
                      contextMenuHidden={true}
                    />
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Retailer Price"
                      onChangeText={(retailerPrice) =>
                        updateRetailerPrice(retailerPrice)
                      }
                      value={retailerPrice}
                      keyboardType={'numeric'}
                      contextMenuHidden={true}
                    />
                  </View>

                  <Button
                    mode="contained"
                    style={{ marginTop: 15 }}
                    onPress={id ? updateItem : addItem}
                  >
                    {id ? "Update Item" : "Add Item"}
                  </Button>
                  {id && (
                    <Button
                      mode="contained"
                      style={{ marginTop: 15, backgroundColor: "red" }}
                      onPress={delItem}
                    >
                      Delete Item
                    </Button>
                  )}
                </Card.Content>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default AddItem;
