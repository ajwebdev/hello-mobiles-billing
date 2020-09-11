import React from "react";

import { FlatList, SafeAreaView, View } from "react-native";
const CustomFlatList = (props: any) => {
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={props.data}
          renderItem={props.renderItem}
          keyExtractor={props.keyExtractor}
          {...props}
        />
      </SafeAreaView>
    </View>
  );
};

export default CustomFlatList;