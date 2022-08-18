import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
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

type AppProps = {
  cities: string[];
};

const MainScreenWithMap = withMap(MainScreen);
const RoomScreenWithMap = withMap(RoomScreen);

function App({ cities }: AppProps): JSX.Element {

  const { isDataLoaded, offersList, city } = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
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
                authorizationStatus={AuthorizationStatus.Auth}
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
    </BrowserRouter>
  );
}

export default App;
