import Logo from '../../components/logo/logo';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { OfferTypes } from '../../types/offer-type';
import Nav from '../../components/nav/nav';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/data-process/selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type GroupOffer = {
  [city: string]: OfferTypes;
};

function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const groupFavoriteOffers = (): GroupOffer => {
    const groups: GroupOffer = {};

    favoriteOffers.forEach((offer) => {

      const city = offer.city.name;

      if (city in groups) {
        groups[city].push(offer);
      } else {
        groups[city] = [];
        groups[city].push(offer);
      }
    });
    return groups;
  };

  const groupedFavoriteOffersList = Object.entries(groupFavoriteOffers());
  const favoritesTitle = favoriteOffers.length ? 'Saved listing' : 'Favorites (empty)';
  const favoritesVisually = favoriteOffers.length ? 'favorites__title' : 'visually-hidden';
  const favoritesAddedBlock = favoriteOffers.length ? <FavoritesList groupedOffers={groupedFavoriteOffersList} /> : (
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
    </div>
  );

  return (
    <div className={`page ${favoriteOffers.length ? '' : 'page--favorites-empty'}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
      <main className={`page__main page__main--favorites ${favoriteOffers.length ? '' : 'page__main--favorites-empty'}`} >
        <div className="page__favorites-container container">
          <section className={`favorites ${favoriteOffers.length ? '' : 'favorites--empty'}`}>
            <h1 className={favoritesVisually}>{favoritesTitle}</h1>
            {favoritesAddedBlock}
          </section>
        </div>
      </main>
      <footer className={`footer ${favoriteOffers.length ? 'container' : ''}`}>
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;

