import useAuth from 'context/userContext';
import { useRouter } from 'next/router';
import Login from 'pages/login';
import Cookies from 'js-cookie';

export function ProtectRoute(Component) {
  return () => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const token = Cookies.get('token');

    if (process.browser) {
      if (
        loading ||
        (!isAuthenticated && window.location.pathname !== '/login')
      ) {
        return <Login />;
      }
    }

    return <Component {...arguments} />;
  };
}
