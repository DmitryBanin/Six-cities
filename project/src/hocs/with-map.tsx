import { ComponentType, useState } from 'react';
import { OfferTypes, City } from '../types/offer-type';
import { PlaceType } from '../const';
import Map from '../components/map/map';
import CitiesPlacesList from '../components/places-list/places-list';
import NearPlaces from '../components/near-places/near-places';

export type MapHocProps = {
  renderMap: (offers: OfferTypes, city: City, placeType: PlaceType) => JSX.Element;
  renderOffersList: (offers: OfferTypes, placeType: PlaceType) => JSX.Element;
};

export function withMap<T>(Component: ComponentType<T & MapHocProps>)
  : ComponentType<T> {

  type ComponentProps = Omit<T, keyof MapHocProps>;

  function WithMap(props: ComponentProps): JSX.Element {

    const [activeCard, setActiveCardId] = useState<number | null>(null);
    const handleCardHover = (id: number | null): void => setActiveCardId(id);

    return (
      <Component
        {...props as T}
        renderMap={(offers: OfferTypes, city: City, placeType: PlaceType) => (
          <Map
            offers={offers}
            activeCard={activeCard}
            city={city}
            placeType={placeType}
          />
        )}
        renderOffersList={(offers: OfferTypes, placeType: PlaceType) => (
          placeType === PlaceType.NearPlaces
            ?
            <NearPlaces
              offers={offers}
              placeType={placeType}
              onHoverCard={handleCardHover}
            />
            :
            <CitiesPlacesList
              offers={offers}
              placeType={placeType}
              onHoverCard={handleCardHover}
            />
        )}
      />
    );
  }

  return WithMap;
}
