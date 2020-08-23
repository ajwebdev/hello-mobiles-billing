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
      textInputProps={{
        placeholder: props.placeholder?props.placeholder:"placeholder",
        underlineColorAndroid: "transparent",
        style: styles.textInputProps,
      }}
      listProps={{
        nestedScrollEnabled: true,
      }}
      value={props.value}
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
        borderRadius: 0,
    },
    itemTextStyle:{
         color: "#222" 
    },
    itemsContainerStyle:{
         maxHeight: 140
     },
     textInputProps:{
        padding: 12,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
     }
})

export default Dropdown;
