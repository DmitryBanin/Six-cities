import { createAction } from '@reduxjs/toolkit';
import { OfferTypes } from '../types/offer-type';
import { AuthorizationStatus, AppRoute } from '../const';
import { StateAction } from './action-types';

export const changeCity = createAction<{ city: string }>(StateAction.ChangeCity);
export const loadOffers = createAction<OfferTypes>(StateAction.LoadOffers);
export const setDataUploadStatus = createAction<boolean>(StateAction.LoadStatus);
export const requireAuthorization = createAction<AuthorizationStatus>(StateAction.RequireAuthorization);
export const setServerError = createAction<string | null>(StateAction.SetServerError);
export const redirectToRoute = createAction<AppRoute>(StateAction.RedirectToRoute);
