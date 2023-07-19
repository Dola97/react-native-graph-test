import {createSlice} from '@reduxjs/toolkit';
import {loginUser, userModel} from './login-actions';
import {setAuthToken} from '../../api/api';
import Toast from 'react-native-toast-message';

export interface AuthState {
  user: userModel | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  user: undefined,
  loading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      setAuthToken(action.payload.jwt);
      console.log('user', action.payload);
    });
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(action.error.message);
      Toast.show({
        type: 'error',
        text1: action.error.message as string,
      });
      state.loading = false;
    });
  },
});

export const {logout} = loginSlice.actions;

export default loginSlice.reducer;
