import { OfferTypes, OfferType } from './types/offer-type';
import { SortType, Settings, AppRoute, TypeClassName } from './const';
import dayjs from 'dayjs';
import { CommentType } from './types/comment-type';

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

export const sortByDate = (commentA: CommentType, commentB: CommentType) => {
  const timeA = dayjs(commentA.date);
  const timeB = dayjs(commentB.date);
  return timeB.diff(timeA);
};

export const prepareComments = (comments: CommentType[]): CommentType[] => [...comments].sort(sortByDate).slice(0, Settings.MAX_COMMENTS);

export const getMapType = (pathname: string): string => {
  if (pathname.includes(AppRoute.Room)) {
    return TypeClassName.Property;
  }
  return TypeClassName.Cities;
};
