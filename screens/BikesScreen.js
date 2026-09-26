import React from 'react';
import { Text, StyleSheet } from 'react-native';
import config from '../config'
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';
import formatYears from '../utils/formatYears';

const BikesScreen = ({ route, navigation }) => {
    const { brand_id } = route.params;
    const { serverURL } = config
    const { data: bikes, loading, error } = useFetchJson(`${serverURL}/bikesbybrand?brand_id=${brand_id}`)

    return (
      <ScreenContainer>
        <Text style={styles.eyebrow}>Models</Text>
        <FetchState loading={loading} error={error} />
        {bikes && bikes.length === 0 && (
          <Text style={styles.empty}>No bikes listed for this brand yet</Text>
        )}
        {
          bikes && bikes.map(x =>
            <ListRow
              key={x.bike_id}
              title={x.title}
              subtitle={formatYears(x.year_from, x.year_to)}
              meta={x.category}
              onPress={() => navigation.navigate('BikeDetail', {name: x.title, id: x.bike_id})}
            />)
        }
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.lg,
    },
    empty: {
      ...theme.typography.body,
      color: theme.colors.gray,
      textAlign: 'center',
      paddingVertical: theme.spacing.xl,
    },
  });

  export default BikesScreen
