import Login from 'pages/Login';
import useAuth from 'context/userContext';

export function ProtectRoute(Component) {
  const { isAuthenticated, loading } = useAuth();
  return () => {
    if (
      loading ||
      (!isAuthenticated && window.location.pathname !== '/login')
    ) {
      return <Login />;
    }

    return <Component {...arguments} />;
  };
}
