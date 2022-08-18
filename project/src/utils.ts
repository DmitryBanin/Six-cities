import { OfferTypes, OfferType } from './types/offer-type';
import { SortType, AuthorizationStatus } from './const';

export const getRatingStars = (rating: number) => {
  const ratingStars = Math.round(rating);
  switch (ratingStars) {
    case 0:
      return '0%';
    case 1:
      return '20%';
    case 2:
      return '40%';
    case 3:
      return '60%';
    case 4:
      return '80%';
    case 5:
      return '100%';
  }
};

export const getSortOffers = (type: string, offers: OfferTypes) => {
  switch (type) {
    case SortType.PriceLowToHigh:
      return offers.sort((offerA: OfferType, offerB: OfferType) => offerA.price - offerB.price);
    case SortType.PriceHighToLow:
      return offers.sort((offerA: OfferType, offerB: OfferType) => offerB.price - offerA.price);
    case SortType.TopRatedFirst:
      return offers.sort((offerA: OfferType, offerB: OfferType) => offerB.rating - offerA.rating);
    default:
      return offers;
  }
};


export const isAuthorized = ( authStatus: AuthorizationStatus ): boolean =>
  authStatus === AuthorizationStatus.Auth;
