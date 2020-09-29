import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import { Card, TextInput, Button, HelperText } from "react-native-paper";
import Loader from "../../Loader/Loader";
import { formatDate, setTime } from "../../../utilities/setTime";
import { DatePickerAndroid } from "react-native";
import { db } from "../../firebaseConfig";
import { isEmpty } from "ramda";
import { ErrorText } from "../../../utilities/validation";
import Dropdown from "../../DropDown/DropDown";
const AddService = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [serviceDate, updateServiceDate] = useState({
    val: formatDate(new Date(), "DD-MM-YYYY"),
    error: false,
  });
  const [customerName, updateCustomerName] = useState({
    id: "",
    name: "",
    error: false,
  });
  const [customerDetails, updateCustomerDetails] = useState([{}]);
  const [serviceDesc, updateServiceDesc] = useState({ val: "", error: false });
  const [serviceCharge, updateServiceCharge] = useState({
    val: "",
    error: false,
  });

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
    fetchCustomer();
      if (!id) {
        setLoading(false);
      }
    });
    if (id) {
      setLoading(true);
      fetchSingleDoc();
    }
    return subscribe;
  }, [navigation]);

  const id = route.params;
  const fetchCustomer = async () => {
    var customers: any = [];
    var docRef = db.collection("customers");
    await docRef
      .orderBy("itemCreatedAt")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, name: doc.data().customerName };
          customers.push(data);

        });
        console.log(customers);
        updateCustomerDetails(customers);
      });
  };

  const fetchSingleDoc = async () => {
    var docRef = db.collection("service").doc(id);
    await docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        console.log(data);
        const customerName = data.customerName;
        const serviceDesc = data.serviceDesc;
        const serviceCharge = data.serviceCharge;
        const serviceDate = data.serviceDate;
        updateCustomerName({
          id: id,
          name: customerName,
          error: false,
        });

        updateServiceDesc({ val: serviceDesc, error: false });
        updateServiceCharge({ val: serviceCharge, error: false });
        updateServiceDate({ val: serviceDate, error: false });
      } else {
        navigation.goBack();
      }
    });
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
  const showDate = async () => {
    try {
      const options = { date: new Date() };
      const { action, year, month, day } = await DatePickerAndroid.open(
        options
      );
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = formatDate(new Date(year, month, day), "DD-MM-YYYY");
        updateStates(date, serviceDate, updateServiceDate, false);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const addService = async () => {
    setLoading(true);
    await db.collection("service").doc().set({
      customerName: customerName.name,
      customerId: customerName.id,
      serviceDesc: serviceDesc.val,
      serviceDate: serviceDate.val,
      serviceCharge: serviceCharge.val,
      serviceCreatedAt: setTime(),
    });
    navigation.navigate("listService");
    setLoading(false);
  };
  const updateStates = (
    changeText: any,
    stateName: any,
    updateFn: any,
    checkError: boolean
  ) => {
    const text =
      isEmpty(changeText.trim()) && checkError
        ? { val: changeText, error: true }
        : { val: changeText, error: false };
    updateFn({ ...stateName, ...text });
  };

  const updateService = async () => {
    setLoading(true);
    await db
      .collection("service")
      .doc(id)
      .update({
        customerName: customerName.name,
        customerId: customerName.id,
        serviceDesc: serviceDesc.val,
        serviceCharge: serviceCharge.val,
        serviceDate: serviceDate.val
      })
      .then(() => navigation.navigate("listService"));
    setLoading(false);
  };
  const deleteService=async ()=>{
    setLoading(true);
    if (id) {
      await db.collection("service")
        .doc(id)
        .delete()
        .then( ()=> {
          navigation.navigate("listService")
        });
    }
    setLoading(false);
    navigation.navigate("listService")
  }
  const renderButton = () => {
    return (
      <View>
        <Button mode="contained" style={{ marginTop: 20 }} onPress={id?updateService:addService}>
          {id ?"Update Service":"Add Service"}
        </Button>
        {id &&
        <Button mode="contained"                       style={{ marginTop: 15, backgroundColor: "red" }}
        onPress={deleteService}>
        Delete Service
      </Button>
        }
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ padding: 5 }}>
              <Card style={{ width: "auto", marginTop: 25 }}>
                <Card.Title title={id ? "Edit Service" : "Add Service"} />
                <Card.Content>
                  <View style={styles.input}>
                    <Dropdown
                      onItemSelect={(text: object) => {
                        const newText = { ...text, ...{ error: false } };
                        updateCustomerName({ ...customerName, ...newText });
                      }}
                      items={customerDetails}
                      selectedItems={customerName.name}
                      placeholder="Customer"
                      value={customerName.name}
                      error={customerName.error}
                    />
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Service Description"
                      value={serviceDesc.val}
                      error={serviceDesc.error}
                      onChangeText={(text) =>
                        updateStates(text, serviceDesc, updateServiceDesc, true)
                      }
                    />
                  </View>
                  <View style={styles.input}>
                    <View>
                      <TextInput
                        mode="outlined"
                        label="Serviced Date"
                        onTouchStart={showDate}
                        value={serviceDate.val}
                        onChangeText={(text) =>
                          updateStates(
                            text,
                            serviceDate,
                            updateServiceDate,
                            false
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Serviced Charge"
                      value={serviceCharge.val}
                      error={serviceCharge.error}
                      onChangeText={(text) =>
                        updateStates(
                          text,
                          serviceCharge,
                          updateServiceCharge,
                          true
                        )
                      }
                    />
                  </View>
                  <View>{renderButton()}</View>
                </Card.Content>
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default AddService;
