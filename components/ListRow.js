import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

const ListRow = ({ title, subtitle, meta, onPress }) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
    <View style={styles.textGroup}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {meta && <Text style={styles.meta}>{meta}</Text>}
    </View>
    <Text style={styles.chevron}>{'→'}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: {
    backgroundColor: theme.colors.surface,
  },
  textGroup: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  title: {
    ...theme.typography.title,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.grayLight,
    marginTop: theme.spacing.xs,
  },
  meta: {
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
  },
  chevron: {
    color: theme.colors.amber,
    fontSize: 16,
  },
});

export default ListRow;
