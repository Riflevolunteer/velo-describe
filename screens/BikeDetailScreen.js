import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import FetchState from '../components/FetchState';
import SpecRow from '../components/SpecRow';
import useFetchJson from '../hooks/useFetchJson';
import formatYears from '../utils/formatYears';

const EMPTY_VALUES = new Set(['', 'n/a', 'none', 'not specified', 'unspecified', '-']);

const displayValue = (text) => {
  const trimmed = (text ?? '').trim();
  return EMPTY_VALUES.has(trimmed.toLowerCase()) ? 'None Specified' : trimmed;
};

const Fact = ({ label, value }) => value ? (
  <View style={styles.fact}>
    <Text style={styles.eyebrow}>{label}</Text>
    <Text style={styles.body}>{value}</Text>
  </View>
) : null;

const BikeDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const { serverURL } = config
    const { data, loading, error } = useFetchJson(`${serverURL}/bikedetail?id=${id}`)
    const bike = data?.bike
    const specs = data?.specs ?? []

    return (
      <ScreenContainer>
        <FetchState loading={loading} error={error} />
        { bike && (
          <>
            <Text style={styles.headline}>{[bike.brand_title, bike.category].filter(Boolean).join(' · ')}</Text>

            <Fact label="Years" value={formatYears(bike.year_from, bike.year_to)} />
            <Fact label="Sizes" value={bike.sizes} />
            <Fact label="Colours" value={bike.colors} />
            <Fact label="Weight" value={bike.weight} />

            <View style={styles.divider} />

            <Text style={styles.eyebrow}>Specifications</Text>
            {specs.length === 0 && (
              <Text style={styles.empty}>No specifications recorded for this model</Text>
            )}
            {specs.map(spec =>
              <SpecRow
                key={spec.bike_spec_id}
                label={spec.label}
                value={displayValue(spec.value_text)}
                onPress={spec.component_id
                  ? () => navigation.navigate('Detail', { name: spec.component_title, id: spec.component_id })
                  : undefined}
              />
            )}
          </>
        )}
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    headline: {
      ...theme.typography.body,
      color: theme.colors.gray,
      marginBottom: theme.spacing.lg,
    },
    fact: {
      marginBottom: theme.spacing.md,
    },
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.sm,
    },
    body: {
      ...theme.typography.body,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.lg,
    },
    empty: {
      ...theme.typography.body,
      color: theme.colors.gray,
      textAlign: 'center',
      paddingVertical: theme.spacing.xl,
    },
  });

  export default BikeDetailScreen
