import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setDataUploadStatus, requireAuthorization } from './action';
import { DEFAULT_CITY_NAME, AuthorizationStatus } from '../const';
import { OfferTypes } from '../types/offer-type';

type InitialState = {
  city: string,
  offersList: OfferTypes;
  isDataLoaded: boolean;
  authorizationStatus: string;
}

const initialState: InitialState = {
  city: DEFAULT_CITY_NAME,
  offersList: [],
  isDataLoaded: true,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });
});

export {reducer};
