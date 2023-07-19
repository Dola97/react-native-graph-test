import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

import {scaleFactor, theme} from '../../../theme';
import {Button} from '../../../components/button';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {loginUser} from '../login-actions';
import {isValidEmail} from '../../../util';

export const LoginForm = () => {
  const email = useRef<any>(null);
  const pass = useRef<any>(null);
  const dispatch: any = useAppDispatch();
  const loading = useAppSelector(state => state.login.loading);
  const [error, setError] = useState('');
  const handleLogin = () => {
    const identifier = email.current?.value;
    const password = pass.current?.value;
    if (isValidEmail(identifier)) {
      dispatch(loginUser({identifier, password}));
      setError('');
    } else {
      // Set validation state to false if the email format is invalid
      setError('Unvalid Email');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        placeholderTextColor="#000"
        ref={email}
        style={styles.input}
        keyboardType="email-address"
        onChangeText={e => (email.current.value = e)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        placeholder="password"
        placeholderTextColor="#000"
        ref={pass}
        secureTextEntry
        style={{...styles.input, marginVertical: 10 * scaleFactor}}
        onChangeText={e => (pass.current.value = e)}
      />

      <Button title="Login" onPress={handleLogin} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 12 * scaleFactor,
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.small * scaleFactor,
    color: theme.colors.text,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.small * scaleFactor,
    color: theme.colors.error,
  },
});
