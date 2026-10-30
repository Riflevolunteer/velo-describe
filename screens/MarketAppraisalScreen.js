import React, { useState } from 'react';
import { View, Text, FlatList, Linking, Pressable, StyleSheet } from 'react-native';
import config from '../config';
import theme from '../theme';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';
import useMarketplaceRegion, { REGIONS } from '../hooks/useMarketplaceRegion';
import countryName from '../utils/countryName';

// Listings come from several eBay sites, each priced in its own currency, so
// label every price with the site it's from ("EBAY_GB" -> "eBay United Kingdom").
const siteName = (marketplace) => marketplace && `eBay ${countryName(marketplace.replace(/^EBAY_/, ''))}`;

const RegionPicker = ({ region, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.region}>
      <Pressable style={styles.regionRow} onPress={() => setOpen(o => !o)}>
        <Text style={styles.regionLabel}>
          {'Region: '}<Text style={styles.regionValue}>{countryName(region)}</Text>
        </Text>
        <Text style={styles.regionToggle}>{open ? 'Done' : 'Change'}</Text>
      </Pressable>
      {open && (
        <View style={styles.chips}>
          {REGIONS.map(code => (
            <Pressable
              key={code}
              style={[styles.chip, code === region && styles.chipSelected]}
              onPress={() => { onChange(code); setOpen(false); }}
            >
              <Text style={[styles.chipText, code === region && styles.chipTextSelected]}>{countryName(code)}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const MarketAppraisalScreen = ({ route }) => {
    const { componentId } = route.params;
    const { serverURL } = config
    const [region, setRegion] = useMarketplaceRegion()
    const { data: listingsData, loading: listingsLoading, error: listingsError } = useFetchJson(region && `${serverURL}/getTopListings?componentId=${componentId}&region=${region}`)
    const listings = listingsData && listingsData.listings
    const header = (
      <>
        {region && <RegionPicker region={region} onChange={setRegion} />}
        <Text style={styles.eyebrow}>Top Listings</Text>
      </>
    )

    return (
      <View style={styles.container}>
        { (listingsLoading || listingsError) && (
          <View style={styles.listContent}>
            {header}
            <FetchState loading={listingsLoading} error={listingsError} />
          </View>
        )}
        { listings && listings.length === 0 && (
          <View style={styles.listContent}>
            {header}
            <Text style={styles.emptyText}>No listings found</Text>
          </View>
        )}
        { listings && listings.length > 0 && (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={listings}
            keyExtractor={(item, index) => item.itemId || `${index}`}
            ListHeaderComponent={header}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Pressable style={styles.itemLinkRow} onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Text style={styles.itemLinkIcon}>{'↗'}</Text>
                </Pressable>
                {item.price != null && (
                  <Text style={styles.itemPrice}>
                    {item.currency ? `${item.price} ${item.currency}` : item.price}
                    {item.marketplace && <Text style={styles.itemSite}>{`  ·  ${siteName(item.marketplace)}`}</Text>}
                  </Text>
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
    itemSite: {
      ...theme.typography.caption,
    },
    region: {
      marginBottom: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    regionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    regionLabel: {
      ...theme.typography.body,
      color: theme.colors.gray,
    },
    regionValue: {
      color: theme.colors.ink,
      fontWeight: '600',
    },
    regionToggle: {
      ...theme.typography.body,
      color: theme.colors.accent,
      fontWeight: '600',
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    chip: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    chipSelected: {
      borderColor: theme.colors.accent,
      backgroundColor: theme.colors.accent,
    },
    chipText: {
      ...theme.typography.caption,
      color: theme.colors.ink,
    },
    chipTextSelected: {
      color: theme.colors.background,
      fontWeight: '600',
    },
    itemPrice: {
      ...theme.typography.body,
      color: theme.colors.accent,
      marginTop: theme.spacing.xs,
    },
  });

  export default MarketAppraisalScreen
