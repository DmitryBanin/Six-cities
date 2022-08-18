import { AppDispatch, State } from '../types/state.js';
import { OfferTypes } from '../types/offer-type';
import { loadOffers, setDataUploadStatus, requireAuthorization, redirectToRoute } from './action';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { StateAction } from './action-types';
import { toast } from 'react-toastify';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  StateAction.CheckAuth,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferTypes>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataUploadStatus(true));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  StateAction.CheckAuth,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  StateAction.Login,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    toast.success('You successfully login');
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  StateAction.Logout,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);


