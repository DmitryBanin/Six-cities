import CitiesPlacesList from '../../components/cities-places-list/cities-places-list';
import Logo from '../../components/logo/logo';
import { OfferTypes } from '../../types/offer-type';
import Map from '../../components/map/map';
import { isTextClassName, SortType } from '../../const';
import LocationContainer from '../../components/locations-list/locations-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { useState } from 'react';
import { getSortOffers } from '../../utils';

type MainScreenProps = {
  city: string;
  offers: OfferTypes;
  cities: string[],
}

function MainScreen({city, offers, cities}: MainScreenProps): JSX.Element {
  const [activeSortType, setActiveSortType] = useState(SortType.Popular);
  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const renderingOffers = getSortOffers(activeSortType, [...filteredOffers]);

  const handleSortType = (type: string) => {
    setActiveSortType(type);
  };

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

              <PlacesSorting onChangeSortType={handleSortType} />
              <CitiesPlacesList offers={renderingOffers} isTextClassName={isTextClassName.cities}/>

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
