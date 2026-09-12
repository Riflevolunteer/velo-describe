import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';
import Rivet from './Rivet';

const VintageButton = ({ title, onPress, style }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
  >
    <Rivet style={{ top: 4, left: 4 }} />
    <Rivet style={{ top: 4, right: 4 }} />
    <Rivet style={{ bottom: 4, left: 4 }} />
    <Rivet style={{ bottom: 4, right: 4 }} />
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '90%',
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.xs,
    backgroundColor: theme.colors.parchment,
    borderWidth: 2,
    borderColor: theme.colors.rustDark,
    borderRadius: 4,
    alignItems: 'center',
    ...theme.shadow,
  },
  pressed: {
    backgroundColor: theme.colors.parchmentDark,
    transform: [{ scale: 0.98 }],
  },
  text: {
    ...theme.typography.body,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.colors.ink,
  },
});

export default VintageButton;
