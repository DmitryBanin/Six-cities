import { AppDispatch, State } from '../types/state.js';
import { OfferTypes, OfferType } from '../types/offer-type';
import { CommentType, CommentData } from '../types/comment-type';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { StateAction } from './action-types';
import { toast } from 'react-toastify';

type ThunkAPIConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  OfferTypes,
  undefined,
  ThunkAPIConfigType
>(StateAction.Data.LoadOffers, async (_arg, { extra: api }) => {

  const { data } = await api.get(APIRoute.Offers);
  return data;
});

export const fetchOneOfferAction = createAsyncThunk<
{ offer: OfferType; comments: CommentType[]; nearByOffers: OfferTypes },
  string,
  ThunkAPIConfigType
>(StateAction.Data.LoadOffer, async (id, { extra: api }) => {
  const { data: offer } = await api.get<OfferType>(`${APIRoute.Offers}/${id}`);
  const { data: comments } = await api.get<CommentType[]>(
    `${APIRoute.Comments}/${id}`
  );
  const { data: nearByOffers } = await api.get<OfferTypes>(
    `${APIRoute.Offers}/${id}/nearBy`
  );
  return { offer, comments, nearByOffers };
});

export const sendNewComment = createAsyncThunk<
  CommentType[],
  CommentData,
  ThunkAPIConfigType
>(
  StateAction.Data.SendNewComment,
  async ({ roomId, comment, rating }, { extra: api }) => {
    const { data } = await api.post(`${APIRoute.Comments}/${roomId}`, {
      comment,
      rating,
    });
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, ThunkAPIConfigType>(
  StateAction.User.CheckAuth,
  async (_arg, { extra: api }) => {
    const {
      data: { email: userName },
    } = await api.get(APIRoute.Login);
    return userName;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, ThunkAPIConfigType>(
  StateAction.User.Login,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token, email: userName },
    } = await api.post(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
    toast.success('You successfully login');
    return userName;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkAPIConfigType>(
  StateAction.User.Logout,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  ThunkAPIConfigType
  >(StateAction.Data.LoadFavorites, async (_arg, { extra: api }) => {
    const { data } = await api.get(APIRoute.Favorite);
    return data;
  });

export const toggleFavorite = createAsyncThunk<
  OfferType,
  { id: number; status: number },
  ThunkAPIConfigType
>(StateAction.Data.ToggleFavorite, async ({ id, status }, { extra: api }) => {
  const { data } = await api.post(`${APIRoute.Favorite}/${id}/${status}`);
  return data;
});

