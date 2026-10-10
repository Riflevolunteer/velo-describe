import React from 'react';
import { View, Text, FlatList, Linking, Pressable, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const MarketAppraisalScreen = ({ route }) => {
    const { componentId } = route.params;
    const { serverURL } = config
    const { data: listingsData, loading: listingsLoading, error: listingsError } = useFetchJson(`${serverURL}/getTopListings?componentId=${componentId}&marketplace=ALL`)
    const listings = listingsData && listingsData.listings

    return (
      <View style={styles.container}>
        { (listingsLoading || listingsError) && (
          <View style={styles.listContent}>
            <Text style={styles.eyebrow}>Top Listings</Text>
            <FetchState loading={listingsLoading} error={listingsError} />
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
                  <Text style={styles.itemPrice}>{item.currency ? `${item.price} ${item.currency}` : item.price}</Text>
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
    eyebrow: {
      ...theme.typography.eyebrow,
      marginBottom: theme.spacing.xs,
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
