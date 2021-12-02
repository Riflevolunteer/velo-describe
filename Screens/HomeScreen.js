import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const HomeScreen =({ navigation} ) => {

    const [categories, setCategories] = useState()
  
    useEffect(() => {
      fetch('http://EXPC02YL10KLVCH:3000/categories').then(
        response => response.json()).then(cat => {
          const sortedCategories = cat.sort((a,b) => a.title > b.title && 1 || -1)
          setCategories(sortedCategories)
         }) 
        .catch(err => console.log(err))
    }, [])
  
    return ( 
    <View style={styles}>
       {
        categories && categories.map(x => 
          <Button key={x.title} title={x.title} onPress={() => navigation.navigate('Brands', {name: x.title, id: x.category_id})}/>
         )
      } 
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default HomeScreen