import React from 'react';
import { Text, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const BrandsScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const { serverURL } = config
    const { data: brands, loading, error } = useFetchJson(`${serverURL}/brandsbycategory?id=${id}`)
    const sortedBrands = brands && [...brands].sort((a,b) => a.title > b.title && 1 || -1)

    return (
      <ScreenContainer>
        <Text style={styles.eyebrow}>Brands</Text>
        <Text style={styles.headline}>{name}</Text>
        <FetchState loading={loading} error={error} />
        {
          sortedBrands && sortedBrands.map(x =>
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
