import { createAction } from '@reduxjs/toolkit';
import { CommentType } from '../types/comment-type';
import { OfferTypes, OfferType } from '../types/offer-type';
import { AuthorizationStatus, AppRoute } from '../const';
import { StateAction } from './action-types';

export const changeCity = createAction<{ city: string }>(StateAction.City.ChangeCity);
export const loadOffers = createAction<OfferTypes>(StateAction.Offer.LoadOffers);
export const setLoadOffersStatus = createAction<boolean>(StateAction.Offer.SetLoadOffersStatus);
export const loadOffer = createAction<OfferType>(StateAction.Offer.LoadOffer);
export const setLoadActiveOfferStatus = createAction<boolean>(StateAction.Offer.LoadActiveOfferStatus);
export const loadNearByOffers = createAction<OfferType[]>(StateAction.Offer.LoadNearByOffers);
export const loadComments = createAction<CommentType[]>(StateAction.Comment.LoadComments);
export const requireAuthorization = createAction<AuthorizationStatus>(StateAction.User.RequireAuth);
export const setUserName = createAction<string>(StateAction.User.SetUserName);
export const redirectToRoute = createAction<AppRoute>(StateAction.User.RedirectToRoute);
export const setServerError = createAction<string | null>(StateAction.Error.SetServerError);
export const setSendNewCommentStatus = createAction<boolean>(StateAction.Comment.SetSendNewCommentStatus);
