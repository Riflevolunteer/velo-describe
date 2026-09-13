import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, Pressable, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';

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
          <View style={styles.priceBlock}>
            <Text style={styles.eyebrow}>Average Market Price</Text>
            <Text style={styles.price}>{`${prices.avgPrice} USD`}</Text>
          </View>
        )}
        { listings && listings.length === 0 && (
          <View style={styles.listContent}>
            <Text style={styles.eyebrow}>Top Listings</Text>
            <Text style={styles.emptyText}>No listings found</Text>
          </View>
        )}
        { listings && listings.length > 0 && (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={listings}
            keyExtractor={(item, index) => `${index}`}
            ListHeaderComponent={<Text style={styles.eyebrow}>Top Listings</Text>}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Pressable style={styles.itemLinkRow} onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Text style={styles.itemLinkIcon}>{'↗'}</Text>
                </Pressable>
                {item.price != null && (
                  <Text style={styles.itemPrice}>{`${item.price} USD`}</Text>
                )}
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
      backgroundColor: theme.colors.background,
    },
    priceBlock: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.xs,
    },
    price: {
      ...theme.typography.headline,
      fontSize: 32,
      color: theme.colors.accent,
    },
    list: {
      width: '100%',
    },
    listContent: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
    },
    item: {
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    emptyText: {
      ...theme.typography.body,
    },
    itemLinkRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      ...theme.typography.body,
      flexShrink: 1,
      color: theme.colors.accent,
      textDecorationLine: 'underline',
    },
    itemLinkIcon: {
      ...theme.typography.body,
      color: theme.colors.accent,
      marginLeft: theme.spacing.xs,
    },
    itemPrice: {
      ...theme.typography.body,
      color: theme.colors.accent,
      marginTop: theme.spacing.xs,
    },
  });

  export default MarketAppraisalScreen
