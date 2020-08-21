import React from "react";
import {StyleSheet} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const Loader = (props: any) => {
  const color = props.color ? props.color : Colors.deepPurple500;
  return (
    
  <ActivityIndicator style={style.Loader} animating={props.isLoading} color={color} />
    
  );
};
const style=StyleSheet.create({
  Loader:{
     flex: 1,   
    },
  
})
export default Loader;

