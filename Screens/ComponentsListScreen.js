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
      <View style={styles.container}>
      { 
        components && components.map(x => 
          <Button key={x.component_id} title={x.title} onPress={() => navigation.navigate('Detail', {name: x.title, id: x.component_id})}/>)
      }
    </View>
    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2194f3',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default ComponentsListScreen