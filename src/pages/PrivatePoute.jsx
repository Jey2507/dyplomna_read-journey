import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors.js';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isAuth = !isLoggedIn && !isRefreshing;

  return isAuth ? <Navigate to={redirectTo} /> : component;
}