import React from 'react';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';
import formatYears from '../utils/formatYears';

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
            {component[0].group_id && component[0].group_title && (
              <Pressable
                onPress={() => navigation.navigate('Group', { name: component[0].group_title, id: component[0].group_id })}
                style={({ pressed }) => [styles.groupLink, pressed && styles.groupLinkPressed]}
              >
                <Text style={styles.eyebrow}>{component[0].group_title}</Text>
                <Text style={styles.groupChevron}>{'→'}</Text>
              </Pressable>
            )}
            <Text style={styles.body}>{component[0].description}</Text>

            {formatYears(component[0].year_from, component[0].year_to) && (
              <>
                <View style={styles.divider} />
                <Text style={styles.eyebrow}>Manufacturing Years</Text>
                <Text style={styles.body}>{formatYears(component[0].year_from, component[0].year_to)}</Text>
              </>
            )}

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
    groupLink: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    groupLinkPressed: {
      opacity: 0.6,
    },
    groupChevron: {
      color: theme.colors.amber,
      fontSize: 14,
      marginLeft: theme.spacing.sm,
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
