import React,{useState} from "react";
import { List } from "react-native-paper";

const CustomListAccordion = (props: any) => {
    const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (

    <List.Section>
      <List.Accordion
        title="Phone"
       
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="Redmi Note 4"  description="Price : 4000"/>
        <List.Item title="Redmi Note 5"  description="Price : 8000"/>

      </List.Accordion>
      <List.Accordion
        title="Temper"
       
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="Redmi Note 4"  description="Price : 4000"/>
        <List.Item title="Redmi Note 5"  description="Price : 8000"/>

      </List.Accordion>

      </List.Section>

  );
};

export default CustomListAccordion;