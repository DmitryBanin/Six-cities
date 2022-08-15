import { createAction } from '@reduxjs/toolkit';
import { OfferTypes } from '../types/offer-type';
import {AuthorizationStatus} from '../const';

export const changeCity = createAction<{ city: string }>('changeCity');
export const loadOffers = createAction<{ offersList: OfferTypes }>('dala/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
