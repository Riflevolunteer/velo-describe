import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
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
    // Years start collapsed so a big brand opens as a short list of years; a
    // brand with a single year has nothing to collapse, so it's always open.
    const [openYears, setOpenYears] = useState(() => new Set())
    const toggleYear = (year) => setOpenYears(prev => {
      const next = new Set(prev)
      next.has(year) ? next.delete(year) : next.add(year)
      return next
    })

    return (
      <ScreenContainer>
        <Text style={styles.eyebrow}>Models</Text>
        <FetchState loading={loading} error={error} />
        {bikes && bikes.length === 0 && (
          <Text style={styles.empty}>No bikes listed for this brand yet</Text>
        )}
        {
          groups && groups.map(group => {
            const single = groups.length === 1
            const open = single || openYears.has(group.year)
            return (
            <View key={group.year}>
              <Pressable
                style={({ pressed }) => [styles.yearHeader, pressed && !single && styles.yearHeaderPressed]}
                onPress={single ? undefined : () => toggleYear(group.year)}
              >
                <Text style={styles.yearLabel}>{group.year}</Text>
                <View style={styles.yearMeta}>
                  <Text style={styles.yearCount}>{group.bikes.length} {group.bikes.length === 1 ? 'model' : 'models'}</Text>
                  {!single && <Text style={styles.yearChevron}>{open ? '−' : '+'}</Text>}
                </View>
              </Pressable>
              {
                open && group.bikes.map(x =>
                  <ListRow
                    key={x.bike_id}
                    title={x.title}
                    meta={x.category}
                    onPress={() => navigation.navigate('BikeDetail', {name: x.title, id: x.bike_id})}
                  />)
              }
            </View>
            )
          })
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    yearHeaderPressed: {
      backgroundColor: theme.colors.border,
    },
    yearMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    yearCount: {
      ...theme.typography.caption,
    },
    yearChevron: {
      ...theme.typography.title,
      color: theme.colors.amber,
      width: 20,
      textAlign: 'right',
      marginLeft: theme.spacing.sm,
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
