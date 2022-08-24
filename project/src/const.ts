export type PlaceType = {
  [key: string]: string,
};

export type ElementType = {
  [key: number]: string,
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer',
  Favorites = '/favorites',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum RatingStars {
  Star_0 = '0%',
  Star_1 = '20%',
  Star_2 = '40%',
  Star_3 = '60%',
  Star_4 = '80%',
  Star_5 = '100%'
}

export const Place: PlaceType = {
  'apartment': 'Apartment',
  'room': 'Private Room',
  'house': 'House',
  'hotel': 'Hotel',
};

export const ratingTitle: ElementType = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export enum Settings {
  MAX_RATING = 5,
  IMAGE_COUNT = 6,
  COMMENTS_COUNT = 10,
  MAX_COMMENTS_LENGTH = 300,
  MIN_COMMENTS_LENGTH = 50,
}

export enum Pin {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}

export const DEFAULT_CITY_NAME = 'Paris';
export const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN = 'six-cities-token';
export const NOT_ACTIVE_STAR = '#c7c7c7';

export enum TypeClassName {
  Cities = 'cities',
  Property = 'property',
  NearPlaces = 'near-places',
  PlaceCard = 'place-card',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
};

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum NameSpace {
  User = 'User',
  Data = 'Data',
  City = 'City',
  Favorite = 'Favorite',
}

export const PLACES_LIST_CLASSES: PlaceType = {
  'cities': 'cities__places-list tabs__content',
  'near-places': 'near-places__list',
};
