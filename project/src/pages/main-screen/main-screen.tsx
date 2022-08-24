import Logo from '../../components/logo/logo';
import { OfferTypes } from '../../types/offer-type';
import { TypeClassName, SortType, CITIES } from '../../const';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { useState, useCallback } from 'react';
import { getSortOffers } from '../../utils';
import Nav from '../../components/nav/nav';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';

type MainScreenProps = {
  city: string;
  offers: OfferTypes;
  cities: typeof CITIES;
}

function MainScreen({ offers, city, cities }: MainScreenProps): JSX.Element {

  const [activeSortType, setActiveSortType] = useState(SortType.Popular);
  const locationOffers = offers.filter((offer) => offer.city.name === city);
  const sortOffers = getSortOffers(activeSortType, [...locationOffers]);
  const currentCity = sortOffers[0].city;

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardHover = (id: number | null): void => {
    setActiveCardId(id);
  };


  const handleSortType = useCallback((type: string) => {
    setActiveSortType(type);
  }, []);

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
                activeSortType={activeSortType}
                onChangeSortType={handleSortType}
              />
              < PlacesList offers={sortOffers} placeType={TypeClassName.Cities} onHoverCard={handleCardHover} />
            </section>
            <div className="cities__right-section">
              < Map offers={locationOffers} city={currentCity} placeType={TypeClassName.Cities} activeCard={activeCardId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
