import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { Card, TextInput, HelperText, Button } from "react-native-paper";
import SearchableDropdown from "react-native-searchable-dropdown";
import { db } from "../../firebaseConfig";
import {setTime} from "../../../utilities/setTime";
import Loader from "../../Loader/Loader";
import { isEmpty } from "ramda";
const AddItem = ({ navigation }) => {
  const [access, updateAccess] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const [accessName, updateAccessName] = useState({id:'',name:''});
  const [itemName, updateItemName] = useState('');
  const [model, updateModel] = useState('');
  const [quantity, updateQuantity] = useState('');
  const [customerPrice, updateCustomerPrice] = useState('');
  const [retailerPrice, updateRetailerPrice] = useState('');

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      fetchAccess();
      setLoading(false);
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
          const data = { id: doc.id, name: doc.data().access_name };
          access_data.push(data);
        });
        updateAccess(access_data);
        
      });
  };

  const addItem= async()=>{
    setLoading(true)
    await db.collection('items').doc().set({
      accessName:accessName.name,
      accessNameId:accessName.id,
      itemName:itemName,
      model:model,
      quantity:quantity,
      customerPrice:customerPrice,
      retailerPrice:retailerPrice,
      itemCreatedAt:setTime()
    }).then(()=>navigation.navigate('listItem'))
    setLoading(false)

  }
  const styles=StyleSheet.create({input:{ flexDirection: "column", marginTop: 15 }})

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <SafeAreaView>
          <ScrollView    keyboardShouldPersistTaps = 'always'>
          <View style={{ padding: 5 }}>
            <Card style={{ width: "auto", marginTop: 25 }}>
              <Card.Title title="Add Item" />
              <Card.Content>
              <SearchableDropdown
                    onItemSelect={(text:any) =>{updateAccessName(text)
                    }}
                    
                    containerStyle={{ padding: 5 }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: 'white',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 0,
                        
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={access}
                    defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: "Accessories",
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: 'gray',
                                borderRadius: 5,
                                
                             
                            }
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                    value={accessName}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("addAccessories")}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: "#6200EE",
                      textDecorationLine: "underline",
                      fontSize: 14,
                    }}
                  >
                    Add Accessories
                  </Text>
                </TouchableOpacity>
                <View style={styles.input}>
                  <TextInput mode="outlined" label="Product Name" onChangeText={(itemName) => updateItemName(itemName)}value={itemName}/>
                </View>
                {/* show only if category is phone */}
                <View style={styles.input}>
                <TextInput mode="outlined" label="Product Model" onChangeText={(model) => updateModel(model)}value={model}/>
                  
                </View>
                <View style={styles.input}>
                <TextInput mode="outlined" label="Quantity" onChangeText={(quantity) => updateQuantity(quantity)}value={quantity}/>
                  
                </View>
                <View style={styles.input}>
                <TextInput mode="outlined" label="Customer Price" onChangeText={(customerPrice) => updateCustomerPrice(customerPrice)}value={customerPrice}/>
                  
                </View>
                <View style={styles.input}>
                <TextInput mode="outlined" label="Retailer Price" onChangeText={(retailerPrice) => updateRetailerPrice(retailerPrice)}value={retailerPrice}/>
                </View>

                <Button mode="contained" style={{marginTop:15} } onPress={addItem}>Add Item</Button>
              </Card.Content>
            </Card>
          </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );


}

export default AddItem;
