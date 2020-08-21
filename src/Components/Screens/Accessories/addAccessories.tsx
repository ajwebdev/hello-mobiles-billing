import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import Loader from "../../Loader/Loader";
import { db } from "../../firebaseConfig";
import { isEmpty } from "ramda";
import { ErrorText } from "../../../utilities/validation";
import { setTime } from "../../../utilities/setTime";

const AccessoriesScreen = ({ route, navigation }) => {
  const [access, setAccess] = useState("");
  const [isloading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const id = route.params;
  
  useEffect(() => {
    seterror(false);
    if (id) fetchSingleDoc();
    else setloading(false);
  }, []);

  
  const addAccessories = () => {
    if (!isEmpty(access.trim())) {
      seterror(false);
      addData();
    } else {
      seterror(true);
    }
  };
  const addData = async () => {
    await db
      .collection("accessories")
      .doc()
      .set({
        access_name: access,
        created_date: setTime(),
      })
      .then(() => {
        navigation.goBack();
      });
  };


  const updateAccessories = () => {
    if (id) {
      if (!isEmpty(access.trim())) {
        setloading(true);
        updateData();
        seterror(false);
      } else {
        seterror(true);
      }
    }
  };

  const updateData = () => {
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


  const deleteAccessories = async () => {
    if (id) {
      setloading(true);
      await db
        .collection("accessories")
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        });
      setloading(false);
      navigation.goBack();
    }
  };

  const fetchSingleDoc = async () => {
    var docRef = db.collection("accessories").doc(id);
    await docRef.get().then((doc) => {
      if (doc.exists) {
        const access_name = doc.data().access_name;
        setAccess(access_name);
      } else {
        navigation.goBack();
      }
      setloading(false);
    });
  };
  const errorShow = (text: String) => {
    if (error) {
      return <Text style={{ color: "red" }}>{ErrorText(text)}</Text>;
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      {isloading ? (
        <Loader isLoading={isloading} />
      ) : (
        <View style={{ padding: 25 }}>
          <Card style={{ width: "auto", marginTop: 25 }}>
            <Card.Title title={id ? "Update Accessories" : "Add Accessories"} />
            <Card.Content>
              <TextInput
                label="Accessorie Name"
                value={access}
                mode="outlined"
                onChangeText={(access) => setAccess(access)}
                error={error}
              />
              {errorShow("Accessorie Name")}

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
      )}
    </View>
  );
};

export default AccessoriesScreen;
