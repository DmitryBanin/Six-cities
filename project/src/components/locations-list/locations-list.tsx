import LocationItem from '../locations-item/locations-item';
import { changeCity } from '../../store/city-process/city-process';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { CITIES } from '../../const';
import { getCity } from '../../store/city-process/selectors';

type LocationListProps = {
  cities: typeof CITIES;
};

function LocationsList({ cities }: LocationListProps): JSX.Element {

  const selectedCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  const handleSelectCity = (name: string) => {
    dispatch(changeCity({ city: name }));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem
          key={city}
          city={city}
          selectedCity={selectedCity}
          onSelectCity={handleSelectCity}
        />
      ))}
    </ul>
  );
}

export default LocationsList;
