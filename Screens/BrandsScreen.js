import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import config from '../config';

const BrandsScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const [brands, setBrands] = useState()
    const { serverURL } = config

    useEffect(() => {
      fetch(`${serverURL}/brandsbycategory?id=${id}`).then(
        response => response.json()).then(brand => {
          const sortedBrands = brand.sort((a,b) => a.title > b.title && 1 || -1)
          setBrands(sortedBrands)
         }) 
        .catch(err => console.log(err))
    }, [])
  
    return (
      <View style={styles.container}>
      { 
        brands && brands.map(x => 
          <Button key={x.brand_id} title={x.title} onPress={() => navigation.navigate('Components', {name: x.title, brand_id: x.brand_id, category_id: id})}/>)
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

  export default BrandsScreen