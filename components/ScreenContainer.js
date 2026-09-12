import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import theme from '../theme';

const ScreenContainer = ({ children, scroll = true, contentStyle }) => (
  <View style={styles.container}>
    {scroll ? (
      <ScrollView contentContainerStyle={[styles.scrollContent, contentStyle]}>
        {children}
      </ScrollView>
    ) : (
      <View style={[styles.content, contentStyle]}>{children}</View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.steel,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingVertical: theme.spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScreenContainer;
