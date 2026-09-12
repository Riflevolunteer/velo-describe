import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';
import PlateCard from '../components/PlateCard';
import VintageButton from '../components/VintageButton';

const ComponentDetailScreen = ({ route, navigation }) => {
    const { name, id } = route.params;
    const [component, setComponent] = useState()

    const { serverURL, awsURL } = config

    useEffect(() => {
      fetch(`${serverURL}/componentdetail?id=${id}`).then(
        response => response.json()).then(component => {
          setComponent(component)
         })
        .catch(err => console.log(err))
    }, [])

    return (
      <ScreenContainer>
        { component && component[0] && (
          <>
            {component[0].image_url && (
              <Image source={{ uri: `${awsURL}${component[0].image_url}` }} style={styles.image} />
            )}
            <PlateCard>
              <Text style={styles.title}>{component[0].title}</Text>
              <Text style={styles.body}>{component[0].description}</Text>
              <Text style={styles.label}>Manufacturing Years</Text>
              <Text style={styles.body}>{`${component[0].year_from} - ${component[0].year_to}`}</Text>
              <Text style={styles.label}>Group</Text>
              <Text style={styles.body}>{component[0].group_title}</Text>
            </PlateCard>
            <VintageButton title="Market Appraisal" onPress={() => navigation.navigate('MarketAppraisal', { name: 'Market Appraisal', searchText: component[0].search_text })} />
          </>
        )}
      </ScreenContainer>
    )
  };

  const styles = StyleSheet.create({
    image: {
      width: 220,
      height: 220,
      borderWidth: 3,
      borderColor: theme.colors.rustDark,
      borderRadius: 4,
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.parchment,
    },
    title: {
      ...theme.typography.display,
      color: theme.colors.ink,
      fontSize: 20,
      marginBottom: theme.spacing.sm,
    },
    label: {
      ...theme.typography.label,
      marginTop: theme.spacing.sm,
    },
    body: {
      ...theme.typography.body,
    },
  });

  export default ComponentDetailScreen
