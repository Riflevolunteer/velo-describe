import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from '../config'
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const groupBikesByYear = (bikes) => {
    const groups = new Map();
    bikes.forEach(bike => {
      const year = bike.year_from || 'Unknown';
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(bike);
    });

    return Array.from(groups.entries())
      .sort(([yearA], [yearB]) => {
        if (yearA === 'Unknown') return 1;
        if (yearB === 'Unknown') return -1;
        return Number(yearA) - Number(yearB);
      })
      .map(([year, yearBikes]) => ({
        year,
        bikes: yearBikes.slice().sort((a, b) => a.title.localeCompare(b.title)),
      }));
  };

const BikesScreen = ({ route, navigation }) => {
    const { brand_id } = route.params;
    const { serverURL } = config
    const { data: bikes, loading, error } = useFetchJson(`${serverURL}/bikesbybrand?brand_id=${brand_id}`)
    const groups = bikes && groupBikesByYear(bikes)

    return (
      <ScreenContainer>
        <Text style={styles.eyebrow}>Models</Text>
        <FetchState loading={loading} error={error} />
        {bikes && bikes.length === 0 && (
          <Text style={styles.empty}>No bikes listed for this brand yet</Text>
        )}
        {
          groups && groups.map(group => (
            <View key={group.year}>
              <View style={styles.yearHeader}>
                <Text style={styles.yearLabel}>{group.year}</Text>
              </View>
              {
                group.bikes.map(x =>
                  <ListRow
                    key={x.bike_id}
                    title={x.title}
                    meta={x.category}
                    onPress={() => navigation.navigate('BikeDetail', {name: x.title, id: x.bike_id})}
                  />)
              }
            </View>
          ))
        }
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.lg,
    },
    yearHeader: {
      marginTop: theme.spacing.lg,
      marginHorizontal: -theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      marginBottom: theme.spacing.xs,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.accent,
    },
    yearLabel: {
      ...theme.typography.headline,
    },
    empty: {
      ...theme.typography.body,
      color: theme.colors.gray,
      textAlign: 'center',
      paddingVertical: theme.spacing.xl,
    },
  });

  export default BikesScreen
