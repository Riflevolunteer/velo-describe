import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const Button = ({ title, onPress, style }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: theme.colors.ink,
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: theme.colors.accentDark,
  },
  text: {
    color: theme.colors.background,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 13,
  },
});

export default Button;
