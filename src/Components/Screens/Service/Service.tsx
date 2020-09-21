import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Loader from "../../Loader/Loader";
import { formatDate, setTime } from "../../../utilities/setTime";
import { DatePickerAndroid } from "react-native";
import { db } from "../../firebaseConfig";
import { isEmpty } from "ramda";
const AddService = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [serviceDate, updateServiceDate] = useState({
    val: formatDate(new Date(), "DD-MM-YYYY"),
    error: false,
  });
  const [customerName, updateCustomerName] = useState({
    val: "",
    error: false,
  });
  const [serviceDesc, updateServiceDesc] = useState({
    val: "",
    error: false,
  });
  const [serviceCharge, updateServiceCharge] = useState({
    val: "",
    error: false,
  });
  const [serviceDiscount, updateServiceDiscount] = useState({
    val: "",
    error: false,
  });
  const id = "";

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
        updateStates(date,serviceDate,updateServiceDate,false);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  const addService = async () => {
    setLoading(true);
    await db.collection("service").doc().set({
      customerName: customerName.val,
      serviceDesc: serviceDesc.val,
      serviceDate: serviceDate.val,
      serviceCharge: serviceCharge.val,
      serviceDiscount: serviceDiscount.val,
      serviceCreatedAt: setTime(),
    });
    navigation.navigate('listService');
    setLoading(false);
  };

  const updateStates = (
    changeText: any,
    stateName: any,
    updateFn: any,
    checkError:boolean
  ) => {
    const text =
      isEmpty(changeText.trim()) && checkError
        ? { val: changeText, error: true }
        : { val: changeText, error: false };
    updateFn({ ...stateName, ...text });
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
                    <TextInput
                      mode="outlined"
                      label="Customer"
                      value={customerName.val}
                      error={customerName.error}
                      onChangeText={(text) =>
                        updateStates(text, customerName, updateCustomerName, true)
                      }
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
                          updateStates(text, serviceDate, updateServiceDate, false)
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
                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Discount"
                      value={serviceDiscount.val}
                      error={serviceDiscount.error}
                      onChangeText={(text) =>
                        updateStates(
                          text,
                          serviceDiscount,
                          updateServiceDiscount,
                          false
                        )
                      }
                    />
                  </View>
                  <View>
                    <Button
                      mode="contained"
                      style={{ marginTop: 20 }}
                      onPress={addService}
                    >
                      Add Service
                    </Button>
                  </View>
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
