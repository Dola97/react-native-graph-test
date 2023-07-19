import {api} from '../../api/api';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {userModel} from '../login/login-actions';

export const registerUser = createAsyncThunk<any, any, any>(
  'auth/register',
  async (
    args: {username: string; email: string; password: string},
    {rejectWithValue},
  ) => {
    console.log('args', args);
    try {
      const response = await api.post('/auth/local/register', args);
      console.log(response);
      return response.data as userModel;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
