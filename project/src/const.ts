export type Place = {
  [key: string]: string,
};

// export type PlaceType = {
//   [key: string]: boolean,
// };

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

export const place: Place = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export const ratingTitle: ElementType = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export enum SettingCount {
  MAX_RATING = 5,
  IMAGE_COUNT = 6,
  COMMENTS_COUNT = 10,
}

export enum Pin {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}

export const DEFAULT_CITY_NAME = 'Paris';

export enum PlaceType {
  Cities = 'cities',
  Property = 'property',
  NearPlaces = 'near-places',
}

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
};

