import React, { useState } from 'react';
import { Text, Image, View, TextInput, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import Button from '../components/Button';
import useFetchJson from '../hooks/useFetchJson';
import useDebouncedValue from '../hooks/useDebouncedValue';
import formatYears from '../utils/formatYears';

const MIN_QUERY_LENGTH = 2;

const BikesHomeScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const { serverURL } = config

    const debouncedQuery = useDebouncedValue(query.trim(), 300);
    const isSearching = debouncedQuery.length >= MIN_QUERY_LENGTH;
    const searchURL = isSearching ? `${serverURL}/searchBikes?q=${encodeURIComponent(debouncedQuery)}` : null;
    const { data: results, loading, error } = useFetchJson(searchURL);

    return (
      <ScreenContainer>
        <View style={styles.brandRow}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brand}>Velo Scout</Text>
        </View>
        <Text style={styles.tagline}>
          Original catalogue specifications for vintage bikes, model by model. Every part we can identify links through to our component guide, where you can see its history and check what it sells for today.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Search bikes..."
          placeholderTextColor={theme.colors.grayLight}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />

        {isSearching && (
          <View style={styles.results}>
            <FetchState loading={loading} error={error} />
            {results && results.length === 0 && (
              <Text style={styles.emptyText}>No bikes found</Text>
            )}
            {
              results && results.map(x =>
                <ListRow
                  key={x.bike_id}
                  title={x.title}
                  subtitle={[x.brand_title, x.category].filter(Boolean).join(' · ')}
                  meta={formatYears(x.year_from, x.year_to)}
                  onPress={() => navigation.navigate('BikeDetail', {name: x.title, id: x.bike_id})}
                />
              )
            }
          </View>
        )}

        <Button title="Browse Brands" onPress={() => navigation.navigate('BikeBrands')} style={styles.browseButton} />
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
    tagline: {
      ...theme.typography.body,
      color: theme.colors.gray,
      marginTop: -theme.spacing.sm,
      marginBottom: theme.spacing.lg,
    },
    input: {
      ...theme.typography.body,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginBottom: theme.spacing.lg,
    },
    results: {
      marginBottom: theme.spacing.lg,
    },
    emptyText: {
      ...theme.typography.body,
      color: theme.colors.gray,
    },
    browseButton: {
      marginTop: theme.spacing.md,
    },
  });

  export default BikesHomeScreen
