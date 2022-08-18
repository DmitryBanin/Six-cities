import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setDataUploadStatus, requireAuthorization, setServerError } from './action';
import { DEFAULT_CITY_NAME, AuthorizationStatus } from '../const';
import { OfferTypes } from '../types/offer-type';

type InitialState = {
  city: string,
  offersList: OfferTypes;
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  serverError: string | null;
}

const initialState: InitialState = {
  city: DEFAULT_CITY_NAME,
  offersList: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  serverError: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(setDataUploadStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setServerError, (state, action) => {
      state.serverError = action.payload;
    });
});

export {reducer};
