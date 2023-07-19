import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {scaleFactor, theme} from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  textStyle,
  buttonStyle,
  ...restProps
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} {...restProps}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10 * scaleFactor,
    paddingHorizontal: 20 * scaleFactor,
    borderRadius: 8 * scaleFactor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium * scaleFactor,
    fontFamily: theme.fonts.bold,
  },
});
