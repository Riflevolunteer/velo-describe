import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';

const HomeScreen =({ navigation} ) => {

    const [categories, setCategories] = useState()
    const { serverURL } = config

    useEffect(() => {
      fetch(`${serverURL}/categories`).then(
        response => response.json()).then(cat => {
          const sortedCategories = cat.sort((a,b) => a.title > b.title && 1 || -1)
          setCategories(sortedCategories)
         })
        .catch(err => console.log(err))
    }, [])

    return (
      <ScreenContainer>
        <View style={styles.brandRow}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brand}>Velo Scout</Text>
        </View>
        <Text style={styles.headline}>Categories</Text>
        {
          categories && categories.map(x =>
            <ListRow key={x.title} title={x.title} onPress={() => navigation.navigate('Brands', {name: x.title, id: x.category_id})}/>
          )
        }
      </ScreenContainer>
    )
  }

  const styles = StyleSheet.create({
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    logo: {
      width: 32,
      height: 32,
      marginRight: theme.spacing.sm,
    },
    brand: {
      ...theme.typography.eyebrow,
    },
    headline: {
      ...theme.typography.headline,
      marginBottom: theme.spacing.lg,
    },
  });

  export default HomeScreen
