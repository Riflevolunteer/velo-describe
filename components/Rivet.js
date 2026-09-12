import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

const Rivet = ({ style }) => <View style={[styles.rivet, style]} />;

const styles = StyleSheet.create({
  rivet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.steelLight,
    borderWidth: 1,
    borderColor: theme.colors.steelDark,
  },
});

export default Rivet;
