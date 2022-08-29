import {store} from '../store/index.js';
import { OfferTypes, OfferType } from './offer-type';
import { CommentType } from './comment-type';
import { AuthorizationStatus } from '../const';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
};

export type DataProcess = {
  offers: OfferTypes;
  activeOffer: OfferType | null;
  comments: CommentType[];
  nearByOffers: OfferTypes;
  isOffersListLoading: boolean;
  isActiveOfferLoading: boolean;
  isNewCommentSending: boolean;
  favoriteOffers: OfferTypes,
  isActiveOfferError: boolean;
};

export type FavoriteProcess = {
    currentFavoriteOffer: OfferType | null;
  };

export type CityProcess = {
  city: string;
};
