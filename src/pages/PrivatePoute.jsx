import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors.js';

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return null; 
  }

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
