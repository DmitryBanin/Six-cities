import CitiesCard from '../cities-card/cities-card';
import { OfferTypes } from '../../types/offer-type';
import { useState } from 'react';

type CitiesPlacesListProps = {
    offers: OfferTypes;
    isTextClassName: boolean;
  }

function CitiesPlacesList({offers, isTextClassName}: CitiesPlacesListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clickOffer, setClickOffer] = useState({});

  return (
    <div className={`${isTextClassName ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {offers.map((offer) => (
        <CitiesCard
          key={offer.id}
          offer={offer}
          setClickOffer={setClickOffer}
          isTextClassName={isTextClassName}
        />
      ))}
    </div>
  );
}

export default CitiesPlacesList;
