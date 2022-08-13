import CitiesPlacesList from '../../components/cities-places-list/cities-places-list';
import { OfferTypes } from '../../types/offer-type';
import { PlaceType } from '../../const';

type NearPlacesProps = {
  offers: OfferTypes;
  placeType: PlaceType,
  onHoverCard: (id: number | null) => void;
};

function NearPlaces({ offers, placeType, onHoverCard }: NearPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <CitiesPlacesList offers={offers} placeType={placeType} onHoverCard={onHoverCard} />
    </section>
  );
}

export default NearPlaces;
