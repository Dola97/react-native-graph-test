import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scaleFactor, theme} from '../../../theme';
import {Button} from '../../../components/button';
import {useAppDispatch} from '../../../store/hooks';
import {registerUser} from '../register-action';
import {isValidEmail} from '../../../util';

export const RegisterForm = () => {
  const userName = useRef<any>(null);
  const identifier = useRef<any>(null);
  const pass = useRef<any>(null);
  const [error, setError] = useState('');
  const dispatch: any = useAppDispatch();
  const handleLogin = () => {
    const username = userName.current?.value;
    const email = identifier.current?.value;
    const password = pass.current?.value;
    if (isValidEmail(email)) {
      dispatch(registerUser({username, email, password}));
      setError('');
    } else {
      // Set validation state to false if the email format is invalid
      setError('Unvalid Email');
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}>
        <TextInput
          placeholder="username"
          ref={userName}
          style={styles.input}
          onChangeText={e => (userName.current.value = e)}
        />
        <TextInput
          placeholder="email"
          ref={identifier}
          keyboardType="email-address"
          style={{...styles.input, marginVertical: 10 * scaleFactor}}
          onChangeText={e => (identifier.current.value = e)}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TextInput
          placeholder="password"
          ref={pass}
          secureTextEntry
          style={{...styles.input, marginBottom: 10 * scaleFactor}}
          onChangeText={e => (pass.current.value = e)}
        />
      </KeyboardAwareScrollView>
      <Button title="Register" onPress={handleLogin} />
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10 * scaleFactor,
  },
  errorText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.small * scaleFactor,
    color: theme.colors.error,
  },
});
