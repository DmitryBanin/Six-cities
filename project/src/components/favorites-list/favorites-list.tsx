import { OfferTypes } from '../../types/offer-type';
import FavoritesPlaces from '../favorites-card/favorites-card';

type FavoritesListProps = {
    offers: OfferTypes;
};

function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const favoriteOffers = [...new Set(offers.map((offer) => offer.city.name))];

  return (
    <ul className="favorites__list">
      {favoriteOffers.map((city): JSX.Element => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="https://www.google.com/">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offers
              .filter((offer) => city === offer.city.name)
              .map((offer) => <FavoritesPlaces key={offer.id} offer={offer} />)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
