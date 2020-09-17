import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import { Card, TextInput } from "react-native-paper";

import Loader from "../../Loader/Loader";

import {formatDate} from "../../../utilities/setTime"
import { DatePickerAndroid } from "react-native";

const AddService = ({navigation}) => {


  const [isLoading] = useState(false);
  const [serviceDate, serviceDateUpdate] = useState(formatDate(new Date(),'DD-MM-YYYY'));


  const [customerName, updateCustomerName] = useState({
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
        const date = formatDate(new Date(year, month, day),"DD-MM-YYYY");
        serviceDateUpdate(date);
        
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
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
                      label="Service Description"
                      onChangeText={(text) =>
                        updateStates(text, customerName, updateCustomerName)
                      }
                      value={customerName.val}
                      error={customerName.error}
                    />
                  </View>

                  <View style={styles.input}>
                    <View>
                      <TextInput
                        mode="outlined"
                        label="Serviced Date"
                        onTouchStart={showDate}
                        value={serviceDate}
                      />
                    </View>
                  </View>

                  <View style={styles.input}>
                    <TextInput
                      mode="outlined"
                      label="Serviced Charge"
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
