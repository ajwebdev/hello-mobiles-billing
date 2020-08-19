import React from "react";
import { View,Text } from "react-native";


const EmptyScreen=(props)=>{
    var text=(props.Text)?props.Text:"Empty Screen"
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{fontSize:16}}>{text}</Text>
        </View>
    )
}

export default EmptyScreen;