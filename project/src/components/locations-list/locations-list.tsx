import LocationItem from '../locations-item/locations-item';
import { changeCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/index';

type LocationListProps = {
  cities: string[];
};

function LocationsList({ cities }: LocationListProps): JSX.Element {

  const selectedCity = useAppSelector((state) => state.city);
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
