import { createAction } from '@reduxjs/toolkit';
import { OfferTypes } from '../types/offer-type';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<{ city: string }>('changeCity');
export const loadOffers = createAction<OfferTypes>('loadOffers');
export const setDataUploadStatus = createAction<boolean>('uploadStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
