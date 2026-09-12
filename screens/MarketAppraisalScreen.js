import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import Rivet from '../components/Rivet';

const MarketAppraisalScreen = ({ route }) => {
    const { searchText } = route.params;
    const [listings, setListings] = useState()
    const [prices, setPrices] = useState()

    const { serverURL } = config

    useEffect(() => {
      fetch(`${serverURL}/getTopListings?query=${searchText}`).then(
        response => response.json()).then(data => {
          setListings(data.listings)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      fetch(`${serverURL}/getMarketPlacePrices?query=${searchText}`).then(
        response => response.json()).then(prices => {
          setPrices(prices)
        }).catch(err => console.log(err))
    }, [])

    return (
      <View style={styles.container}>
        { prices && (
          <View style={styles.priceCard}>
            <Rivet style={{ top: 6, left: 6 }} />
            <Rivet style={{ top: 6, right: 6 }} />
            <Rivet style={{ bottom: 6, left: 6 }} />
            <Rivet style={{ bottom: 6, right: 6 }} />
            <Text style={styles.label}>Average Market Price</Text>
            <Text style={styles.priceText}>{`${prices.avgPrice} USD`}</Text>
          </View>
        )}
        { listings && (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={listings}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText} onPress={() => Linking.openURL(item.url)}>{item.title}</Text>
              </View>
            )}
          >
          </FlatList>
        )}
      </View>
    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.steel,
      alignItems: 'center',
    },
    priceCard: {
      width: '90%',
      marginTop: theme.spacing.lg,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.parchment,
      borderWidth: 2,
      borderColor: theme.colors.rustDark,
      borderRadius: 4,
      alignItems: 'center',
      ...theme.shadow,
    },
    label: {
      ...theme.typography.label,
    },
    priceText: {
      ...theme.typography.display,
      color: theme.colors.ink,
      fontSize: 24,
      marginTop: theme.spacing.xs,
    },
    list: {
      width: '100%',
      marginTop: theme.spacing.md,
    },
    listContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.lg,
    },
    item: {
      padding: theme.spacing.md,
      marginVertical: theme.spacing.xs,
      backgroundColor: theme.colors.steelLight,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.rust,
      borderRadius: 2,
    },
    itemText: {
      ...theme.typography.bodyOnDark,
    },
  });

  export default MarketAppraisalScreen
