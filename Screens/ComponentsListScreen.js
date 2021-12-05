import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import config from '../config'

const ComponentsListScreen = ({ route, navigation }) => {
    const { name, brand_id, category_id } = route.params;
    const [components, setComponents] = useState()
    const { serverURL } = config

    useEffect(() => {
      fetch(`${serverURL}/componentsbybrandcategory?brand_id=${brand_id}&category_id=${category_id}`).then(
        response => response.json()).then(components => {
          const sortedComponents = components.sort((a,b) => a.title > b.title && 1 || -1)
          setComponents(sortedComponents)
         }) 
        .catch(err => console.log(err))
    }, [])
  
    return (
      <View>
    <Text>This is the Components Screen for {name} with id {brand_id}</Text>
    { 
      components && components.map(x => 
        <Button key={x.component_id} title={x.title} onPress={() => navigation.navigate('ComponentDetail', {name: x.title, id: x.component_id})}/>)
    }
    </View>
    )
  };

  export default ComponentsListScreen