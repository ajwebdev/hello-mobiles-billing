import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import Loader from "../../Loader/Loader";
import { db } from "../../firebaseConfig";
import { isEmpty } from "ramda";
import { ErrorText } from "../../../utilities/validation";

const AccessoriesScreen = ({ route, navigation }) => {
  const [access, setAccess] = useState("");
  const [isloading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const id = route.params;
  const addAccessories = () => {
    if (!isEmpty(access.trim())) {
      setloading(true);
      addData("collection");
      seterror(false);
      setloading(false);
    } else {
      seterror(true);
    }
    
  };
  const updateData = (collection: string) => {
    db.collection("accessories")
      .doc(id)
      .update({
        access_name: access,
      })
      .then(() => {
        setloading(false);
        alert("updated");
        navigation.goBack();
      });
  };

  const addData = (collection: string) => {
  
    db.collection("accessories").doc().set({
      access_name: access,
  }) .then(() => {
    alert(access);
    navigation.goBack();
  });
  
  
  };

  const updateAccessories = () => {
    if (id) {
      if (!isEmpty(access.trim())) {
        setloading(true);
        updateData("accessories");
        seterror(false);
      } else {
        seterror(true);
      }
    }
  };
  const deleteAccessories = async() => {
    if(id){
    setloading(true);

    await db.collection("accessories").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
      navigation.replace('accessories');

  }).catch(function(error) {
      console.error("Error removing document: ", error);
      navigation.replace('accessories');

      setloading(false);

  });
  }
}

  const fetchDoc = (collection: string) => {
    if (id) {
      setloading(true);

      var docRef = db.collection("accessories").doc(id);
      docRef.onSnapshot((doc) => {
        const access_name = doc.data().access_name;
        setAccess(access_name);
        setloading(false); 
      })
  }
}

  useEffect(() => {
    fetchDoc("accessories");
  }, []);

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <Card style={{ width: "auto", marginTop: 25 }}>
        {id ? (
          <Card.Title title="Update Accessories" />
        ) : (
          <Card.Title title="Add Accessories" />
        )}
        <Card.Content>
          <TextInput
            label="Accessorie Name"
            value={access}
            mode="outlined"
            onChangeText={(access) => setAccess(access)}
            error={error}
          />
          {error && (
            <Text style={{ color: "red" }}>{ErrorText("Accessories")}</Text>
          )}
          <Loader isLoading={isloading} />
          {id ? (
            <View style={{ flexDirection: "row" }}>
              <Button
                style={{ marginTop: 25, width: 100, marginLeft: 175 }}
                icon="camera"
                mode="outlined"
                onPress={updateAccessories}
              >
                Update
              </Button>
              <Button
                style={{ marginTop: 25, width: 100, marginLeft: -220 }}
                icon="delete"
                mode="outlined"
                onPress={deleteAccessories}
                color="red"
              >
                delete
              </Button>
            </View>
          ) : (
            <Button
              style={{ marginTop: 25, width: 100, marginLeft: 175 }}
              icon="camera"
              mode="contained"
              onPress={addAccessories}
            >
              Add
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default AccessoriesScreen;
