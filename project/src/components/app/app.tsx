import { Route, Routes } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks/index';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-router/history-router';
import { browserHistory } from '../../browser-history';
import { getIsOffersListLoading, getOffers } from '../../store/selectors';
import { getCity } from '../../store/city-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import RestrictRoute from '../restrict-route/restrict-route';

type AppProps = {
  cities: typeof CITIES;
};

function App({ cities }: AppProps): JSX.Element {

  const isOffersListLoading = useAppSelector(getIsOffersListLoading);
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isOffersListLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={
            <MainScreen
              offers={offers}
              city={city}
              cities={cities}
            />
          }
          />
          <Route
            path={AppRoute.Login}
            element={
              <RestrictRoute authStatus={authorizationStatus}>
                <LoginScreen />
              </RestrictRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={<RoomScreen />}
          />
        </Route>
        <Route path={AppRoute.NotFound} element={<Page404 />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
