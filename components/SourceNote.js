import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

// Where a bike's or component's data came from (data_source.label via the API).
const SourceNote = ({ label }) => label ? (
  <View style={styles.wrap}>
    <Text style={styles.eyebrow}>Source</Text>
    <Text style={styles.caption}>{label}</Text>
  </View>
) : null;

const styles = StyleSheet.create({
  wrap: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  eyebrow: {
    ...theme.typography.eyebrow,
    marginBottom: theme.spacing.sm,
  },
  caption: {
    ...theme.typography.caption,
  },
});

export default SourceNote;
