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
} from "react-native-paper";
import { db } from "../../firebaseConfig";
import { ErrorText } from "../../../utilities/validation";
import Loader from "../../Loader/Loader";
import { isEmpty, cond, equals, always } from "ramda";
import { setTime } from "../../../utilities/setTime";


const Customer = ({ navigation, route }: any) => {
    const [customerName, updateCustomerName] = useState({ val: "", error: false });
    const [customerMobileNumber,updateCustomerMobileNumber] = useState({ val: "", error: false });
    const [customerIMEI,updatecustomerIMEI]= useState({val:"",error:false});
    const [isLoading, setLoading] = useState(true);


    const id = route.params;
    useEffect(() => {
      const subscribe = navigation.addListener("focus", () => {
       
        if (!id) {
          setLoading(false);
        }
      });
      if (id) {
        fetchSingleDoc();
      }
      return subscribe;
    }, [navigation]);
  
 
    const fetchSingleDoc = async () => {
        var docRef = db.collection("customers").doc(id);
        await docRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
             const customerName = data.customerName;
            const customerMobileNumber = data.customerMobileNumber;
            const customerIMEI = data.customerIMEI;
            
            updateCustomerName({ val: customerName, error: false });
            updateCustomerMobileNumber({ val: customerMobileNumber, error: false });
            updatecustomerIMEI({ val: customerIMEI, error: false });
           
          } else {
            navigation.goBack();
          }
        });
        setLoading(false);
      };

      const addcustomer = async () => {
        await db
          .collection("customers")
          .doc()
          .set({
            customerName: customerName.val,
            customerIMEI: customerIMEI.val,
            customerMobileNumber: customerMobileNumber.val,
            itemCreatedAt: setTime(),
          }).then(()=>navigation.navigate('customerList'))
       
      };

      const validation = (fn) => {
        if (!hasError()) {
          fn();
        }
         updateStates(customerName.val, customerName, updateCustomerName);
        updateStates(customerMobileNumber.val, customerMobileNumber, updateCustomerMobileNumber);
         updateStates(customerIMEI.val, customerIMEI, updatecustomerIMEI);
      };
      const updateStates = (changeText: any, stateName: any, updateFn: any) => {
        const text = isEmpty(changeText.trim())
          ? { val: changeText, error: true }
          : { val: changeText, error: false };
        updateFn({ ...stateName, ...text });
      };

      const hasError = () => {
        if (
       
          !customerName.error &&
          customerName.val.trim() &&
          !customerMobileNumber.error &&
          customerMobileNumber.val.trim() &&
          !customerIMEI.error &&
          customerIMEI.val.trim()
        ) {
          return false;
        } else {
          return true;
        }
      };

      const deletecustomer = () => {
        if (id) {
          db.collection("customers")
            .doc(id)
            .delete()
            .then(function () {
              navigation.goBack();
            });
        }
      };
      const updatecustomer = async () => {
        setLoading(true);
    
        await db
          .collection("customers")
          .doc(id)
          .update({
            customerName: customerName.val,
            customerMobileNumber: customerMobileNumber.val,
            customerIMEI: customerIMEI.val,
          })
          .then(() => navigation.navigate("CustomerList"));
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
                        <HelperText type="error" visible={customerName.error}>
                          {ErrorText("Customer Name")}
                        </HelperText>
                      </View>
    
                      <View style={styles.input}>
                        <TextInput
                          mode="outlined"
                          label="Customer No"
                          onChangeText={(text) =>
                            updateStates(text, customerMobileNumber,  updateCustomerMobileNumber)
                          }
                          value={customerMobileNumber.val}
                          error={customerMobileNumber.error}
                        
                        />
                          <HelperText type="error" visible={customerMobileNumber.error}>
                          {ErrorText("Customer No")}
                        </HelperText>
                  
                      </View>
                      <View style={styles.input}>
                          <TextInput
                            mode="outlined"
                            label="IMEI Number"
                            onChangeText={(text) =>
                              updateStates(text, customerIMEI, updatecustomerIMEI)
                            }
                            value={customerIMEI.val}
                            keyboardType={"numeric"}
                            contextMenuHidden={true}
                            error={customerIMEI.error}
                          />
                    
                          <HelperText type="error" visible={customerIMEI.error}>
                                  {ErrorText("Customer IMEI")}
                                </HelperText>
                      </View>
                      
                      
                      <Button
                        mode="contained"
                        style={{ marginTop: 15 }}
                        onPress={
                          id
                            ? () => validation(updatecustomer)
                            : () => validation(addcustomer)
                        }
                        disabled={hasError()}
                      >
                        {id ? "Update Customer" : "Add Customer"}
                      </Button>
                      {id && (
                        <Button
                          mode="contained"
                          style={{ marginTop: 15, backgroundColor: "red" }}
                          onPress={deletecustomer}
                        >
                          Delete Customer
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
}
export default Customer;
