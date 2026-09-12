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
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
});

export default ScreenContainer;
