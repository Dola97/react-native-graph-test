import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {scaleFactor, theme} from '../../../theme';

export const LoginHeader = () => {
  return (
    <>
      <Text style={styles.text}>Hello Again!</Text>
      <Text style={styles.heading}>Login Page</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.medium * scaleFactor,
    color: theme.colors.primary,
  },
  heading: {
    textAlign: 'center',
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.xlarge * scaleFactor,
    color: theme.colors.primary,
  },
});
