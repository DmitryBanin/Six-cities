import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavotitesScreen from '../../pages/favorites-screen/favorites-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks/index';

type AppScreenProps = {
  cities: string[];
};

function App({ cities }: AppScreenProps): JSX.Element {
  const { offersList, city } = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={
            <MainScreen
              offers={offersList}
              city={city}
              cities={cities}
            />
          }
          />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavotitesScreen offers={offersList}/>
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Room}/:id`} element={<RoomScreen offers={offersList}/>} />
        </Route>
        <Route path={AppRoute.NotFound} element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
