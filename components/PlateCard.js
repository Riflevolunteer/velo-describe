import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Rivet from './Rivet';

const PlateCard = ({ children, style }) => (
  <View style={[styles.card, style]}>
    <Rivet style={{ top: 6, left: 6 }} />
    <Rivet style={{ top: 6, right: 6 }} />
    <Rivet style={{ bottom: 6, left: 6 }} />
    <Rivet style={{ bottom: 6, right: 6 }} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: theme.colors.parchment,
    borderWidth: 2,
    borderColor: theme.colors.rustDark,
    borderRadius: 4,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    ...theme.shadow,
  },
});

export default PlateCard;
