import React from 'react';
import { Text, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const ComponentGroupScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const { serverURL } = config
    const { data, loading, error } = useFetchJson(`${serverURL}/componentGroup?id=${id}`)
    const group = data?.group
    const components = data?.components ?? []

    return (
      <ScreenContainer>
        <FetchState loading={loading} error={error} />
        { group && (
          <>
            {(group.year_from || group.year_to || group.description) && (
              <>
                <Text style={styles.eyebrow}>Groupset</Text>
                {(group.year_from || group.year_to) && (
                  <Text style={styles.body}>{`${group.year_from ?? '-'} - ${group.year_to ?? '-'}`}</Text>
                )}
                {group.description && <Text style={styles.body}>{group.description}</Text>}
              </>
            )}
            <Text style={styles.sectionEyebrow}>Components</Text>
          </>
        )}
        {
          data && components.length === 0 && !loading && !error &&
            <Text style={styles.empty}>No components in this group</Text>
        }
        {
          components.map(x =>
            <ListRow
              key={x.component_id}
              title={x.title}
              subtitle={`${x.year_from ?? '-'} - ${x.year_to ?? '-'}`}
              meta={x.category_title}
              onPress={() => navigation.navigate('Detail', {name: x.title, id: x.component_id})}
            />)
        }
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.md,
    },
    sectionEyebrow: {
      ...theme.typography.eyebrow,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    body: {
      ...theme.typography.body,
    },
    empty: {
      ...theme.typography.body,
      color: theme.colors.gray,
      textAlign: 'center',
      paddingVertical: theme.spacing.xl,
    },
  });

  export default ComponentGroupScreen
