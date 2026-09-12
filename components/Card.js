import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },
});

export default Card;
