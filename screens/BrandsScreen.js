import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';

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
      <ScreenContainer>
        <Text style={styles.eyebrow}>Brands</Text>
        <Text style={styles.headline}>{name}</Text>
        {
          brands && brands.map(x =>
            <ListRow key={x.brand_id} title={x.title} onPress={() => navigation.navigate('Components', {name: x.title, brand_id: x.brand_id, category_id: id})}/>)
        }
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.xs,
    },
    headline: {
      ...theme.typography.headline,
      marginBottom: theme.spacing.lg,
    },
  });

  export default BrandsScreen
