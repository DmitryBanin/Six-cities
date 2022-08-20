import Logo from '../../components/logo/logo';
import { OfferTypes } from '../../types/offer-type';
import { PlaceType, SortType, CITIES } from '../../const';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { useState } from 'react';
import { getSortOffers } from '../../utils';
import { MapHocProps } from '../../hocs/with-map';
import Nav from '../../components/nav/nav';

type MainScreenProps = {
  city: string;
  offers: OfferTypes;
  cities: typeof CITIES;
}

function MainScreen({city, offers, cities, renderMap, renderOffersList}: MainScreenProps & MapHocProps): JSX.Element {

  const [activeSortType, setActiveSortType] = useState(SortType.Popular);
  const locationOffers = offers.filter((offer) => offer.city.name === city);
  const sortOffers = getSortOffers(activeSortType, [...locationOffers]);
  const currentCity = sortOffers[0].city;

  const handleSortType = (type: string) => {
    setActiveSortType(type);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList cities={cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{locationOffers.length} places to stay in {city}</b>
              <PlacesSorting
                onChangeSortType={handleSortType}
              />
              {renderOffersList(sortOffers, PlaceType.Cities)}
            </section>
            <div className="cities__right-section">
              {renderMap(locationOffers, currentCity, PlaceType.Cities)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
