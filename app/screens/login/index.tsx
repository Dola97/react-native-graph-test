import React from 'react';
import {StyleSheet} from 'react-native';
import {scaleFactor, theme} from '../../theme';
import {FadeInView} from '../../components/fadein-view';
import {LoginHeader} from './components/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginForm} from './components/form';
import {useAppSelector} from '../../store/hooks';
import {NeedAccount} from './components/need-account';

export const LoginScreen = () => {
  const minibar = useAppSelector(state => state.modals);
  console.log('minibar', minibar);
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      style={styles.container}>
      <FadeInView>
        <LoginHeader />
        <LoginForm />
        <NeedAccount />
      </FadeInView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24 * scaleFactor,
  },
});
