import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scaleFactor, theme} from '../../theme';
import {RegisterForm} from './components/form';
import BackIcon from '../../assets/svgs/back.svg';
import {FadeInView} from '../../components/fadein-view';
import {PropsLogin} from '../../navigations/paramslist';

export const RegisterScreen = ({navigation}: PropsLogin) => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      style={styles.container}>
      <FadeInView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginVertical: 20 * scaleFactor}}>
          <BackIcon width={24 * scaleFactor} height={24 * scaleFactor} />
        </TouchableOpacity>
        <RegisterForm />
      </FadeInView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24 * scaleFactor,
    paddingTop: 12 * scaleFactor,
  },
});
