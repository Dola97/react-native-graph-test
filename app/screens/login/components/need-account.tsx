import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scaleFactor, theme} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

export const NeedAccount = () => {
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text style={styles.text}>You dont have an account!</Text>

      <Text
        style={{...styles.text, textDecorationLine: 'underline'}}
        onPress={() => navigate('SignUp')}>
        Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.small * scaleFactor,
    color: theme.colors.primary,
  },
});
