import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const BrandsScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const [brands, setBrands] = useState()
  
    useEffect(() => {
      fetch(`http://EXPC02YL10KLVCH:3000/brandsbycategory?id=${id}`).then(
        response => response.json()).then(brand => {
          const sortedBrands = brand.sort((a,b) => a.title > b.title && 1 || -1)
          setBrands(sortedBrands)
         }) 
        .catch(err => console.log(err))
    }, [])
  
    return (
      <View>
    <Text>This is the Brands Screen for {name} with id {id}</Text>
    { 
      brands && brands.map(x => 
        <Button key={x.brand_id} title={x.title} onPress={() => navigation.navigate('ComponentsList', {name: x.title, brand_id: x.brand_id, category_id: id})}/>)
    }
    </View>
    )
  };

  export default BrandsScreen