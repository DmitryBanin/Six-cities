import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  setLoadOffersStatus,
  requireAuthorization,
  setServerError,
  loadOffer,
  loadNearByOffers,
  loadComments,
  setUserName,
  setLoadActiveOfferStatus,
  setSendNewCommentStatus,
} from './action';
import { DEFAULT_CITY_NAME, AuthorizationStatus } from '../const';
import { OfferTypes, OfferType } from '../types/offer-type';
import { CommentType } from '../types/comment-type';

type initialStateType = {
  city: string;
  offersList: OfferTypes;
  activeOffer: OfferType | null;
  comments: CommentType[];
  nearByOffers: OfferTypes;
  isOffersListLoading: boolean;
  isActiveOfferLoading: boolean;
  isNewCommentSending: boolean;
  authorizationStatus: AuthorizationStatus;
  serverError: string | null;
  userName: string;
};

const initialState: initialStateType = {
  city: DEFAULT_CITY_NAME,
  offersList: [],
  activeOffer: null,
  comments: [],
  nearByOffers: [],
  isOffersListLoading: false,
  isActiveOfferLoading: false,
  isNewCommentSending: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  serverError: null,
  userName: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(setLoadOffersStatus, (state, action) => {
      state.isOffersListLoading = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setLoadActiveOfferStatus, (state, action) => {
      state.isActiveOfferLoading = action.payload;
    })
    .addCase(loadNearByOffers, (state, action) => {
      state.nearByOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setSendNewCommentStatus, (state, action) => {
      state.isNewCommentSending = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    })
    .addCase(setServerError, (state, action) => {
      state.serverError = action.payload;
    });
});
