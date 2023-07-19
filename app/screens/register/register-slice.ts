import {createSlice} from '@reduxjs/toolkit';
import {registerUser} from './register-action';
import {setAuthToken} from '../../api/api';
import {AuthState} from '../login/login-slice';
import Toast from 'react-native-toast-message';

const initialState: AuthState = {
  user: undefined,
  loading: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      setAuthToken(action.payload.jwt);
      console.log('user', action.payload);
    });
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      Toast.show({
        type: 'error',
        text1: action.error.message as string,
      });

      state.loading = false;
    });
  },
});

export default registerSlice.reducer;
