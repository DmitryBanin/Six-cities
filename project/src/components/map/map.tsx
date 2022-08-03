import { OfferTypes, City } from '../../types/offer-type';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { useRef, useEffect } from 'react';
import { URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
    offers: OfferTypes;
    city: City;
  }

function Map({city, offers}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  // const currentIcon = new Icon({
  //   iconUrl: URL_MARKER_CURRENT,
  //   iconSize: [27, 39],
  //   iconAnchor: [13.5, 39],
  // });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: defaultIcon,
        });
        marker
          .setIcon(defaultIcon)
          .addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
