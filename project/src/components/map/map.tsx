import { OfferTypes, City } from '../../types/offer-type';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { useRef, useEffect } from 'react';
import { Pin } from '../../const';
import { useLocation } from 'react-router-dom';
import { getMapType } from '../../utils';

type MapProps = {
    offers: OfferTypes;
    city: City;
    activeCard: number | null;
  }

const defaultPinIcon = new Icon({
  iconUrl: Pin.Default,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentPinIcon = new Icon({
  iconUrl: Pin.Current,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({city, offers, activeCard}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const { latitude, longitude, zoom } = city.location;

  const { pathname } = useLocation();
  const placeType = getMapType(pathname);

  useEffect(() => {
    if (map) {
      map.setView({ lat: latitude, lng: longitude }, zoom, { animate: true, duration: 1 });
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: defaultPinIcon,
        });
        marker
          .setIcon(offer.id === activeCard ? currentPinIcon : defaultPinIcon)
          .addTo(map);
      });
    }
  }, [map, offers, activeCard, latitude, longitude, zoom]);

  return (
    <section
      className={`${placeType === 'cities' ? 'cities' : 'property'}__map map`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
