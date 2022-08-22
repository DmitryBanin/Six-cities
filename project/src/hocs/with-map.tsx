import { ComponentType, useState } from 'react';
import { OfferTypes, City } from '../types/offer-type';
import { TypeClassName } from '../const';
import Map from '../components/map/map';
import PlacesList from '../components/places-list/places-list';
import NearPlaces from '../components/near-places/near-places';

export type MapHocProps = {
  renderMap: (offers: OfferTypes, city: City, placeType: TypeClassName) => JSX.Element;
  renderOffersList: (offers: OfferTypes, placeType: TypeClassName) => JSX.Element;
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
        renderMap={(offers: OfferTypes, city: City, placeType: TypeClassName) => (
          <Map
            offers={offers}
            activeCard={activeCard}
            city={city}
            placeType={placeType}
          />
        )}
        renderOffersList={(offers: OfferTypes, placeType: TypeClassName) => (
          placeType === TypeClassName.NearPlaces
            ?
            <NearPlaces
              offers={offers}
              placeType={placeType}
              onHoverCard={handleCardHover}
            />
            :
            <PlacesList
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
