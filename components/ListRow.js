import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

const ListRow = ({ title, onPress }) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
    <Text style={styles.title}>{title}</Text>
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
  title: {
    ...theme.typography.title,
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  chevron: {
    color: theme.colors.grayLight,
    fontSize: 16,
  },
});

export default ListRow;
