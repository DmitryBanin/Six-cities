import { AppDispatch, State } from '../types/state.js';
import { OfferTypes, OfferType } from '../types/offer-type';
import { CommentType, CommentData } from '../types/comment-type';
import { loadOffers,
  setLoadOffersStatus,
  requireAuthorization,
  redirectToRoute,
  loadComments,
  loadNearByOffers,
  loadOffer,
  setUserName,
  setLoadActiveOfferStatus,
  setSendNewCommentStatus,
} from './action';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { StateAction } from './action-types';
import { toast } from 'react-toastify';

type ThunkAPIConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, ThunkAPIConfigType>(
  StateAction.Offer.LoadOffers,
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadOffersStatus(true));
      const { data } = await api.get<OfferTypes>(APIRoute.Offers);
      dispatch(loadOffers(data));
      dispatch(setLoadOffersStatus(false));
    } catch (err) {
      // условие для типизации ошибки, иначе ругается
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

export const fetchOneOfferAction = createAsyncThunk<void, string, ThunkAPIConfigType>(
  StateAction.Offer.LoadOffer,
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadActiveOfferStatus(true));
      const { data: offer } = await api.get<OfferType>(
        `${APIRoute.Offers}/${id}`
      );
      const { data: nearByOffers } = await api.get<OfferTypes>(
        `${APIRoute.Offers}/${id}/nearby`
      );
      const { data: comments } = await api.get<CommentType[]>(
        `${APIRoute.Comments}/${id}`
      );
      dispatch(loadOffer(offer));
      dispatch(loadNearByOffers(nearByOffers));
      dispatch(loadComments(comments));
      dispatch(setLoadActiveOfferStatus(false));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkAPIConfigType>(
  StateAction.User.CheckAuth,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const {
        data: { email: userName },
      } = await api.get(APIRoute.Login);

      dispatch(setUserName(userName));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkAPIConfigType>(
  StateAction.User.Login,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const {
        data: { token, email: userName },
      } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserName(userName));
      dispatch(redirectToRoute(AppRoute.Main));
      toast.success('You successfully login');
    } catch (err) {
      // условие для типизации ошибки, иначе ругается
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkAPIConfigType>(
  StateAction.User.Logout,
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (err) {
      // условие для типизации ошибки, иначе ругается
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
);

export const sendNewComment = createAsyncThunk<void, CommentData, ThunkAPIConfigType>(
  StateAction.Comment.SendNewComment,
  async ({ roomId, comment, rating }, { dispatch, extra: api }) => {
    try {
      setSendNewCommentStatus(true);
      const { data } = await api.post(`${APIRoute.Comments}/${roomId}`, {
        comment,
        rating,
      });
      dispatch(loadComments(data));
      setSendNewCommentStatus(false);
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

