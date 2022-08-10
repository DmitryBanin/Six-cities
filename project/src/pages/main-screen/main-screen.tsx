import CitiesPlacesList from '../../components/cities-places-list/cities-places-list';
import Logo from '../../components/logo/logo';
import { OfferTypes } from '../../types/offer-type';
import Map from '../../components/map/map';
import { isTextClassName } from '../../const';
import LocationContainer from '../../components/locations-list/locations-list';

type MainScreenProps = {
  city: string;
  offers: OfferTypes;
  cities: string[],
}

function MainScreen({city, offers, cities}: MainScreenProps): JSX.Element {
  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">

            <Logo />

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Login
                    </span>
                    {/* <span className="header__favorite-count">3</span> */}
                  </a>
                </li>
                {/* <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <LocationContainer cities={cities}/>

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
              {/* <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form> */}

              <CitiesPlacesList offers={filteredOffers} isTextClassName={isTextClassName.cities}/>

            </section>
            <div className="cities__right-section">

              <Map city={offers[0].city} offers={offers} isTextClassName={isTextClassName.cities} />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
