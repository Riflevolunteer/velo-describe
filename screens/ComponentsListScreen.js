import React from 'react';
import { Text, StyleSheet } from 'react-native';
import config from '../config'
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const ComponentsListScreen = ({ route, navigation }) => {
    const { name, brand_id, category_id } = route.params;
    const { serverURL } = config
    const { data: components, loading, error } = useFetchJson(`${serverURL}/componentsbybrandcategory?brand_id=${brand_id}&category_id=${category_id}`)
    const sortedComponents = components && [...components].sort((a,b) => a.title > b.title && 1 || -1)

    return (
      <ScreenContainer>
        <Text style={styles.eyebrow}>Components</Text>
        <Text style={styles.headline}>{name}</Text>
        <FetchState loading={loading} error={error} />
        {
          sortedComponents && sortedComponents.map(x =>
            <ListRow
              key={x.component_id}
              title={x.title}
              subtitle={`${x.year_from ?? '-'} - ${x.year_to ?? '-'}`}
              onPress={() => navigation.navigate('Detail', {name: x.title, id: x.component_id})}
            />)
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

  export default ComponentsListScreen
