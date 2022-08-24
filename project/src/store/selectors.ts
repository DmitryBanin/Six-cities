import { State } from '../types/state';
import { NameSpace } from '../const';

export const getCity = (state: State) => state[NameSpace.City].city;
export const getOffers = (state: State) => state[NameSpace.Data].offers;
export const getActiveOffer = (state: State) => state[NameSpace.Data].activeOffer;
export const getComments = (state: State) => state[NameSpace.Data].comments;
export const getNearByOffers = (state: State) => state[NameSpace.Data].nearByOffers;
export const getIsOffersListLoading = (state: State) =>
  state[NameSpace.Data].isOffersListLoading;
export const getIsActiveOfferLoading = (state: State) =>
  state[NameSpace.Data].isActiveOfferLoading;
export const getIsNewCommentSending = (state: State) =>
  state[NameSpace.Data].isNewCommentSending;
export const getAuthorizationStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;
export const getUserName = (state: State) => state[NameSpace.User].userName;
