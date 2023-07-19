import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from './store';

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () =>
  useDispatch<AppDispatch | AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
