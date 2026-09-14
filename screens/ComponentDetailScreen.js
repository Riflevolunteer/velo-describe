import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const ComponentDetailScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const { serverURL, awsURL } = config
    const { data: component, loading, error } = useFetchJson(`${serverURL}/componentdetail?id=${id}`)

    return (
      <ScreenContainer>
        <FetchState loading={loading} error={error} />
        { component && component[0] && (
          <>
            {component[0].image_url && (
              <Image source={{ uri: `${awsURL}${component[0].image_url}` }} style={styles.image} />
            )}
            <Text style={styles.eyebrow}>{component[0].group_title}</Text>
            <Text style={styles.body}>{component[0].description}</Text>

            <View style={styles.divider} />

            <Text style={styles.eyebrow}>Manufacturing Years</Text>
            <Text style={styles.body}>{`${component[0].year_from ?? '-'} - ${component[0].year_to ?? '-'}`}</Text>

            <View style={styles.spacer} />

            <Button title="Price Check" onPress={() => navigation.navigate('MarketAppraisal', { name: 'Price Check', searchText: component[0].search_text })} />
          </>
        )}
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 260,
      backgroundColor: theme.colors.surface,
      marginBottom: theme.spacing.lg,
    },
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.md,
    },
    body: {
      ...theme.typography.body,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.lg,
    },
    spacer: {
      height: theme.spacing.xl,
    },
  });

  export default ComponentDetailScreen
