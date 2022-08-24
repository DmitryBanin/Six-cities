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
  try {
    const { data } = await api.get(APIRoute.Offers);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
});

export const fetchOneOfferAction = createAsyncThunk<
  { offer: OfferType; comments: CommentType[]; nearByOffers: OfferTypes },
  string,
  ThunkAPIConfigType
>(StateAction.Data.LoadOffer, async (id, { dispatch, extra: api }) => {
  try {
    const { data: offer } = await api.get(
      `${APIRoute.Offers}/${id}`
    );
    const { data: comments } = await api.get<CommentType[]>(
      `${APIRoute.Comments}/${id}`
    );
    const { data: nearByOffers } = await api.get<OfferTypes>(
      `${APIRoute.Offers}/${id}/nearBy`
    );
    return { offer, comments, nearByOffers };
  } catch {
    dispatch(redirectToRoute(AppRoute.NotFound));
    return { offer: {}, comments: [], nearByOffers: [] };
  }
});

export const sendNewComment = createAsyncThunk<
  CommentType[],
  CommentData,
  ThunkAPIConfigType
>(
  StateAction.Data.SendNewComment,
  async ({ roomId, comment, rating }, { extra: api }) => {
    try {
      const { data } = await api.post(`${APIRoute.Comments}/${roomId}`, {
        comment,
        rating,
      });
      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, ThunkAPIConfigType>(
  StateAction.User.CheckAuth,
  async (_arg, { extra: api }) => {
    try {
      const {
        data: { email: userName },
      } = await api.get(APIRoute.Login);
      return userName;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

export const loginAction = createAsyncThunk<string, AuthData, ThunkAPIConfigType>(
  StateAction.User.Login,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const {
        data: { token, email: userName },
      } = await api.post(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Main));
      toast.success('You successfully login');
      return userName;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkAPIConfigType>(
  StateAction.User.Logout,
  async (_arg, { extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  ThunkAPIConfigType
  >(StateAction.Data.LoadFavorites, async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get(APIRoute.Favorite);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  });

export const toggleFavorite = createAsyncThunk<
  OfferType,
  { id: number; status: number },
  ThunkAPIConfigType
>(StateAction.Data.ToggleFavorite, async ({ id, status }, { extra: api }) => {
  try {
    const { data } = await api.post(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
});

