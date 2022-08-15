import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from './action';
import { DEFAULT_CITY_NAME } from '../const';
import { OfferTypes } from '../types/offer-type';

type InitalState = {
  city: string,
  offersList: OfferTypes,
}

const initialState: InitalState = {
  city: DEFAULT_CITY_NAME,
  offersList: [],
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
    });
});
