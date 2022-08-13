import CitiesCard from '../cities-card/cities-card';
import { OfferTypes } from '../../types/offer-type';
import { PlaceType } from '../../const';

type CitiesPlacesListProps = {
    offers: OfferTypes;
    placeType: PlaceType;
    onHoverCard: (id: number | null) => void;
  }

function CitiesPlacesList({offers, placeType, onHoverCard}: CitiesPlacesListProps): JSX.Element {

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

export default CitiesPlacesList;
