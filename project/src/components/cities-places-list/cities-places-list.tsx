import CitiesCard from '../cities-card/cities-card';
import { OfferTypes } from '../../types/offer-type';
import { useState } from 'react';

type CitiesPlacesListProps = {
    offers: OfferTypes;
  }

function CitiesPlacesList({offers}: CitiesPlacesListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clickOffer, setClickOffer] = useState({});

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CitiesCard
          key={offer.id}
          offer={offer}
          setClickOffer={setClickOffer}
        />
      ))}
    </div>
  );
}

export default CitiesPlacesList;
