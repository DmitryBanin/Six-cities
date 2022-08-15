import { createAction } from '@reduxjs/toolkit';
import { OfferTypes } from '../types/offer-type';

const changeCity = createAction<{ city: string }>('changeCity');
const loadOffers = createAction<{ offersList: OfferTypes }>('data/loadOffers');

export { changeCity, loadOffers };
