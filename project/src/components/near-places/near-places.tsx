import PlacesList from '../places-list/places-list';
import { OfferTypes } from '../../types/offer-type';
import { TypeClassName } from '../../const';

type NearPlacesProps = {
  offers: OfferTypes;
  placeType: TypeClassName,
  onHoverCard: (id: number | null) => void;
};

function NearPlaces({ offers, placeType, onHoverCard }: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <PlacesList offers={offers} placeType={placeType} onHoverCard={onHoverCard} />
    </section>
  );
}

export default NearPlaces;
