import {api} from '../../api/api';
import {createAsyncThunk} from '@reduxjs/toolkit';
export interface userModel {
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const loginUser = createAsyncThunk<any, any, any>(
  'auth/login',
  async (args: {identifier: string; password: string}, {rejectWithValue}) => {
    console.log('args', args);
    try {
      const response = await api.post('/auth/local', args);
      return response.data as userModel;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
