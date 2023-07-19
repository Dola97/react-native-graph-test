import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
export type AuthParamsList = {
  Login: undefined;
  SignUp: undefined;
};
export type AppParamsList = {
  User: undefined;
  Customer: undefined;
  Interactions: undefined;
};
export type RootParamsList = {
  Auth: undefined;
  App: undefined;
};
export type authNavigationProps<T extends keyof AuthParamsList> = {
  navigation: NativeStackScreenProps<AuthParamsList, T>;
};
export type PropsLogin = NativeStackScreenProps<AuthParamsList, 'SignUp'>;
export type appNavigationProps<T extends keyof AppParamsList> = {
  navigation: BottomTabNavigationProp<AppParamsList, T>;
};
export type rootNavigationProps<T extends keyof RootParamsList> = {
  navigation: NativeStackScreenProps<RootParamsList, T>;
};
