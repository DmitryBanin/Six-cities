import CitiesCard from '../place-card/place-card';
import { OfferTypes } from '../../types/offer-type';
import { TypeClassName } from '../../const';

type CitiesPlacesListProps = {
    offers: OfferTypes;
    placeType: TypeClassName;
    onHoverCard: (id: number | null) => void;
  }

function PlacesList({offers, placeType, onHoverCard}: CitiesPlacesListProps): JSX.Element {

  return (
    <div className={`${placeType === 'cities' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {offers.map((offer) => (
        <CitiesCard
          key={offer.id}
          offer={offer}
          placeType={placeType}
          onHoverCard={onHoverCard}
        />
      ))}
    </div>
  );
}

export default PlacesList;
