import React from "react";
import {StyleSheet} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const Loader = (props: any) => {
  const color = props.color ? props.color : "purple";
  const size = props.size ? props.size : "medium";

  return (
    
  
  <ActivityIndicator
  style={style.Loader}
  animating={props.isLoading}
  color={color}
  size={size}
/>
  );
};
const style=StyleSheet.create({
  Loader:{
     flex: 1,   
    },
  
})
export default Loader;

