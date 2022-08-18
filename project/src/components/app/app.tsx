import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavotitesScreen from '../../pages/favorites-screen/favorites-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks/index';
import { withMap } from '../../hocs/with-map';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import React from 'react';
import HistoryRouter from '../history-router/history-router';
import { browserHistory } from '../../browser-history';
// import { isUserAuthorized } from '../../utils';

type AppProps = {
  cities: string[];
};

const MainScreenWithMap = withMap(MainScreen);
const RoomScreenWithMap = withMap(RoomScreen);

function App({ cities }: AppProps): JSX.Element {

  const { isDataLoaded, offersList, city, authorizationStatus } = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={
            <MainScreenWithMap
              offers={offersList}
              city={city}
              cities={cities}
            />
          }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavotitesScreen
                  offers={offersList}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={
              <RoomScreenWithMap
                offers={offersList}
              />
            }
          />
        </Route>
        <Route path={AppRoute.NotFound} element={<Page404 />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
