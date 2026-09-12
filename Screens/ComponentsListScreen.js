import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import config from '../config'
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import VintageButton from '../components/VintageButton';

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
      <ScreenContainer>
        <Text style={styles.subheading}>{name}</Text>
        {
          components && components.map(x =>
            <VintageButton key={x.component_id} title={x.title} onPress={() => navigation.navigate('Detail', {name: x.title, id: x.component_id})}/>)
        }
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    subheading: {
      ...theme.typography.label,
      marginBottom: theme.spacing.md,
    },
  });

  export default ComponentsListScreen
