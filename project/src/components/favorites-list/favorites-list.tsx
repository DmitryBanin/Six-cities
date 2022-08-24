import { OfferTypes } from '../../types/offer-type';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesListProps = {
  groupedOffers: [string, OfferTypes][];
};

function FavoritesList({groupedOffers}: FavoritesListProps): JSX.Element {

  return (
    <ul className="favorites__list">
      {groupedOffers.map(([city, group]): JSX.Element => (
        <FavoriteCard
          key={city}
          city={city}
          offers={group}
        />
      ))}
    </ul>
  );
}

export default FavoritesList;
