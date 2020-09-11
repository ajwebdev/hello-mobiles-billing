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
const AddItem = ({ navigation, route }: any) => {
  const [isLoading, setLoading] = useState(false);
  const [accessName, updateAccessName] = useState({
    id: "",
    name: "",
    error: false,
  });
  const [customerName, updateCustomerName] = useState({ val: "", error: false });
  const [phoneNo, updatePhoneNo] = useState({ val: "", error: false });
  const [imei1, updateImei1] = useState({ val: "", error: false });
  const [imei2, updateImei2] = useState({
    val: "",
    error: false,
  });

  const id = route.params;
// const id=1;
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

  const addCustomer = async () => {
    await db
      .collection("customers")
      .doc()
      .set({
        customerName: customerName.val,
        phoneNo: phoneNo.val,
        ime1: ime1.val,
        ime2: ime2.val,
        customerCreatedAt: setTime(),
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
  const updateCustomer = async () => {
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
                <Card.Title title={id ? "Edit Customer" : "Add Customer"} />
                <Card.Content>
       
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Customer Name"
                      onChangeText={(text) =>
                        updateStates(text, customerName, updateCustomerName)
                      }
                      value={customerName.val}
                      error={customerName.error}
                    />
                    {/* <HelperText type="error" visible={itemName.error}>
                      {ErrorText("Customer Name")}
                    </HelperText> */}
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Customer No"
                      maxLength = {10}
                      onChangeText={(text) =>
                        updateStates(text, phoneNo, updatePhoneNo)
                      }
                      value={phoneNo.val}
                    
                    />
              
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="IMEI 1"
                      onChangeText={(text) =>
                        updateStates(text, imei1, updateImei1)
                      }
                      maxLength = {16}

                      value={imei1.val}
                      keyboardType={"numeric"}
                      contextMenuHidden={true}
                    />
              
                  </View>
                  <View style={styles.input}>
                  <TextInput
                      mode="outlined"
                      label="IMEI 2"
                      onChangeText={(text) =>
                        updateStates(text, imei2, updateImei2)
                      }
                      maxLength = {16}
                      value={imei2.val}
                      keyboardType={"numeric"}
                      contextMenuHidden={true}
                    />
                  </View>
            
                  <Button
                    mode="contained"
                    style={{ marginTop: 15 }}
                    onPress={
                      id
                        ? () => validation(updateCustomer)
                        : () => validation(addCustomer)
                    }
                   
                  >
                    {id ? "Update" : "Add "}
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
