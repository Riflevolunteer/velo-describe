import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import VintageButton from '../components/VintageButton';

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
        <Text style={styles.heading}>Velo Describe</Text>
        <Text style={styles.subheading}>Select a Category</Text>
        {
          categories && categories.map(x =>
            <VintageButton key={x.title} title={x.title} onPress={() => navigation.navigate('Brands', {name: x.title, id: x.category_id})}/>
          )
        }
      </ScreenContainer>
    )
  }

  const styles = StyleSheet.create({
    heading: {
      ...theme.typography.display,
      fontSize: 30,
      marginBottom: theme.spacing.xs,
    },
    subheading: {
      ...theme.typography.label,
      marginBottom: theme.spacing.md,
    },
  });

  export default HomeScreen
