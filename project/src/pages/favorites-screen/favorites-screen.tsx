import Logo from '../../components/logo/logo';
import FavoritesList from '../../components/favorites-list/favorites-list';
import {OfferTypes} from '../../types/offer-type';
import Nav from '../../components/nav/nav';

type FavoritesScreenProps = {
  offers: OfferTypes;
}

function FavotitesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const favoritesTitle = favoriteOffers.length ? 'Saved listing' : 'Favorites (empty)';
  const favoritesAddedBlock = favoriteOffers.length ? <FavoritesList offers={favoriteOffers} /> : (
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
    </div>
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">{favoritesTitle}</h1>
            {favoritesAddedBlock}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavotitesScreen;

