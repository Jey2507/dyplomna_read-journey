import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import RestrictedRoute from '../../pages/RestrictedRoute.jsx';
import PrivateRoute from '../../pages/PrivatePoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
import { refreshUser } from '../../redux/auth/operation.js';
import Loader from '../Loader/Loader.jsx';
import MyLibrary from '../../pages/MyLibrary/MyLibrary.jsx';
import MyReading from '../../pages/MyReading/MyReading.jsx';

const ReadJourney = lazy(() => import('../../pages/ReadJourney/ReadJourney.jsx'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.jsx'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage.jsx'));
const NotfoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  if (isRefreshing) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RestrictedRoute redirectTo="/readjourney" component={<RegisterPage />} />} /> 
        <Route path="/login" element={<RestrictedRoute redirectTo="/readjourney" component={<LoginPage />} />} />
        <Route path="/readjourney" element={<PrivateRoute redirectTo="/login" component={<ReadJourney />} />} />
        <Route path="/mylibrary" element={<PrivateRoute redirectTo="/login" component={<MyLibrary />} />} />
        <Route path="/myreading" element={<PrivateRoute redirectTo="/login" component={<MyReading />} />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
