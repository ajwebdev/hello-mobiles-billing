import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  Card,
  TextInput,
  HelperText,
  Button,
  Snackbar,
} from "react-native-paper";
import { db } from "../../firebaseConfig";
import { setTime } from "../../../utilities/setTime";
import { ErrorText } from "../../../utilities/validation";

import Loader from "../../Loader/Loader";
import { isEmpty, cond, equals, always } from "ramda";
import Dropdown from "../../DropDown/DropDown";

const AddItem = ({ navigation, route }: any) => {
  const [access, updateAccess] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const [accessName, updateAccessName] = useState({
    id: "",
    name: "",
    error: false,
  });
  const [itemName, updateItemName] = useState({ val: "", error: false });
  const [model, updateModel] = useState({ val: "", error: false });
  const [quantity, updateQuantity] = useState({ val: "", error: false });
  const [customerPrice, updateCustomerPrice] = useState({
    val: "",
    error: false,
  });
  const [retailerPrice, updateRetailerPrice] = useState({
    val: "",
    error: false,
  });
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

        updateAccessName({
          id: data.accessNameId,
          name: access_name,
          error: false,
        });

        updateItemName({ val: itemName, error: false });
        updateQuantity({ val: quantity, error: false });
        updateModel({ val: model, error: false });
        updateCustomerPrice({ val: cusPrice, error: false });
        updateRetailerPrice({ val: retailPrice, error: false });
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
        itemName: itemName.val,
        model: model.val,
        quantity: quantity.val,
        customerPrice: customerPrice.val,
        retailerPrice: retailerPrice.val,
        itemCreatedAt: setTime(),
      })
      .then(() => navigation.navigate("listItem"));
  };

  const validation = (fn) => {
    if (!hasError()) {
      fn();
    }
    updateStates(accessName.name, accessName, updateAccessName);
    updateStates(itemName.val, itemName, updateItemName);
    updateStates(quantity.val, quantity, updateQuantity);
    updateStates(customerPrice.val, customerPrice, updateCustomerPrice);
    updateStates(retailerPrice.val, retailerPrice, updateRetailerPrice);
  };

  const updateStates = (changeText: any, stateName: any, updateFn: any) => {
    const text = isEmpty(changeText.trim())
      ? { val: changeText, error: true }
      : { val: changeText, error: false };
    updateFn({ ...stateName, ...text });
  };

  const hasError = () => {
    if (
      !accessName.error &&
      accessName.name.trim() &&
      !itemName.error &&
      itemName.val.trim() &&
      !quantity.error &&
      quantity.val.trim() &&
      !customerPrice.error &&
      customerPrice.val.trim() &&
      !retailerPrice.error &&
      retailerPrice.val.trim()
    ) {
      return false;
    } else {
      return true;
    }
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
        itemName: itemName.val,
        model: model.val,
        quantity: quantity.val,
        customerPrice: customerPrice.val,
        retailerPrice: retailerPrice.val,
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
                    onItemSelect={(text: object) => {
                      const newText = { ...text, ...{ error: false } };
                      updateAccessName({ ...accessName, ...newText });
                    }}
                    items={access}
                    selectedItems={accessName.name}
                    placeholder="Accessories"
                    value={accessName.name}
                    error={accessName.error}
                  />
                  <HelperText type="error" visible={accessName.error}>
                    {ErrorText("Accessories")}
                  </HelperText>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("addAccessories")}
                  >
                    <Text style={styles.sideText}>Add Accessories</Text>
                  </TouchableOpacity>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Product Name"
                      onChangeText={(text) =>
                        updateStates(text, itemName, updateItemName)
                      }
                      value={itemName.val}
                      error={itemName.error}
                    />
                    <HelperText type="error" visible={itemName.error}>
                      {ErrorText("Product Name")}
                    </HelperText>
                  </View>

                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Product Model"
                      onChangeText={(models) =>
                        updateModel({ ...model, ...{ val: models } })
                      }
                      value={model.val}
                      error={model.error}
                    />
                    <HelperText type="error" visible={model.error}>
                      {ErrorText("Product Model")}
                    </HelperText>
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Quantity"
                      onChangeText={(text) =>
                        updateStates(text, quantity, updateQuantity)
                      }
                      value={quantity.val}
                      error={quantity.error}
                      keyboardType={"numeric"}
                      contextMenuHidden={true}
                    />
                    <HelperText type="error" visible={quantity.error}>
                      {ErrorText("Qunatity")}
                    </HelperText>
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Customer Price"
                      onChangeText={(text) =>
                        updateStates(text, customerPrice, updateCustomerPrice)
                      }
                      value={customerPrice.val}
                      error={customerPrice.error}
                      keyboardType={"numeric"}
                      contextMenuHidden={true}
                    />
                    <HelperText type="error" visible={customerPrice.error}>
                      {ErrorText("customerPrice")}
                    </HelperText>
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Retailer Price"
                      onChangeText={(text) =>
                        updateStates(text, retailerPrice, updateRetailerPrice)
                      }
                      value={retailerPrice.val}
                      error={retailerPrice.error}
                      keyboardType={"numeric"}
                      contextMenuHidden={true}
                    />
                    <HelperText type="error" visible={retailerPrice.error}>
                      {ErrorText("Retailer Price")}
                    </HelperText>
                  </View>
                  <Button
                    mode="contained"
                    style={{ marginTop: 15 }}
                    onPress={
                      id
                        ? () => validation(updateItem)
                        : () => validation(addItem)
                    }
                    disabled={hasError()}
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
