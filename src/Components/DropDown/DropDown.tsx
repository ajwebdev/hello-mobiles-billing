import React from "react";
import {StyleSheet} from "react-native";

import SearchableDropdown from "react-native-searchable-dropdown";

const Dropdown = (props: any) => {

  return (
    <SearchableDropdown 
      onItemSelect={props.onItemSelect}
      containerStyle={{ padding: 5 }}
      itemStyle={styles.itemStyle}
      itemTextStyle={styles.itemTextStyle}
      itemsContainerStyle={styles.itemsContainerStyle}
      items={props.items}
      defaultIndex={2}
      resetValue={false}
      placeholderTextColor={props.value?'black':'gray'}
      textInputProps={{
        placeholder: props.value?props.value:props.placeholder,
        underlineColorAndroid: "transparent",
        style: styles.textInputProps,
      }}
      listProps={{
        nestedScrollEnabled: true,
      }}
      
    />
  );
};


const styles = StyleSheet.create({
    itemStyle:{
        padding: 10,
        marginTop: 2,
        backgroundColor: "white",
        borderColor: "#bbb",
        borderWidth: 1,
        borderRadius: 5,
      
        right:0
    },
    itemTextStyle:{
         color: "#222" 
    },
    itemsContainerStyle:{
         maxHeight: 140
     },
     textInputProps:{
        padding: 16,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        color:"black",
        width:315,
        right:5
     }
})

export default Dropdown;
