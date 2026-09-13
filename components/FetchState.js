import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

const FetchState = ({ loading, error, errorMessage = "Couldn't load this. Check your connection and try again." }) => {
  if (!loading && !error) return null;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={theme.colors.accent} />}
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.gray,
    textAlign: 'center',
  },
});

export default FetchState;
