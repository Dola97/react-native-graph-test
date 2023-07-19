import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalsReducer from './modals-slice';
import LoginReducer from '../screens/login/login-slice';
import RegisterReducer from '../screens/register/register-slice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login', 'register'],
};
const rootReducer = combineReducers({
  modals: ModalsReducer,
  login: LoginReducer,
  register: RegisterReducer,
});
let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({serializableCheck: false}).concat();
  },
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
