import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
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
import { getIsOffersListLoading } from '../../store/selectors';
import RestrictRoute from '../restrict-route/restrict-route';

function App(): JSX.Element {

  const isOffersListLoading = useAppSelector(getIsOffersListLoading);

  if (isOffersListLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <RestrictRoute>
              <LoginScreen />
            </RestrictRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={<RoomScreen />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<Page404 />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
