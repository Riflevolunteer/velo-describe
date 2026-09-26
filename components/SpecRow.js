import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

const SpecRow = ({ label, value, onPress }) => {
  const content = (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueGroup}>
        <Text style={[styles.value, onPress && styles.linkValue]}>{value}</Text>
        {onPress && <Text style={styles.chevron}>{'→'}</Text>}
      </View>
    </>
  );

  if (!onPress) return <View style={styles.row}>{content}</View>;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: {
    backgroundColor: theme.colors.surface,
  },
  label: {
    ...theme.typography.caption,
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  valueGroup: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  value: {
    ...theme.typography.body,
    textAlign: 'right',
    flexShrink: 1,
  },
  linkValue: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
  chevron: {
    color: theme.colors.amber,
    fontSize: 16,
    marginLeft: theme.spacing.sm,
  },
});

export default SpecRow;
