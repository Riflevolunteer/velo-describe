import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const ComponentDetailScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const [component, setComponent] = useState()
  
    useEffect(() => {
      fetch(`http://EXPC02YL10KLVCH:3000/componentdetail?id=${id}`).then(
        response => response.json()).then(component => {
          setComponent(component)
         }) 
        .catch(err => console.log(err))
    }, [])
  
    return (
      <View>
        { component && component[0] &&
    <Text>This is the Components Screen for {component[0].title} with id {component[0].component_id} from year {component[0].year_from}</Text>
        }
    </View>
    )
  };

  export default ComponentDetailScreen