import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuthorization, } from './action';
import { DEFAULT_CITY_NAME, AuthorizationStatus } from '../const';
import { OfferTypes } from '../types/offer-type';

type InitialState = {
  city: string,
  offersList: OfferTypes,
  authorizationStatus: string,
}

const initialState: InitialState = {
  city: DEFAULT_CITY_NAME,
  offersList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(loadOffers, (state, action) => {
      const { offersList } = action.payload;
      state.offersList = offersList;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
