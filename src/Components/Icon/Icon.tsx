import React from "react";
import { Feather } from "@expo/vector-icons";

const Icon = (props: any) => {
  const iconSize = props.size ? props.size : 24;
  const iconColor = props.color ? props.color : "black";
    return <Feather name={props.name} size={iconSize} color={iconColor} />;
};

export default Icon;
