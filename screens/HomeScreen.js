import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
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
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
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
    logo: {
      width: 56,
      height: 56,
      marginBottom: theme.spacing.md,
    },
    headline: {
      ...theme.typography.headline,
      marginBottom: theme.spacing.lg,
    },
  });

  export default HomeScreen
