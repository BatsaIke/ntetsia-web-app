import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useHistory, useRouteMatch } from 'react-router-dom';
import api from 'utils/auth/api';

//api here is an axios instance

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  let history = useHistory();
  let match = useRouteMatch('/reset-password/:id');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('ntoken');
      const user = window.sessionStorage.getItem('user');
      if (token) {
        // console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const data = JSON.parse(user);
        setUser(data?.profile?.id);
        setIsAuthenticated(data?.token);
        // console.log('Got user', res);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const signin = async (params) => {
    try {
      const res = await api.post('/login', params);
      if (res.status === 200) {
        const token = res.data;
        toast({
          description: res.data.message,
          status: 'success',
          duration: 5000,
          position: 'top-right',
        });
        if (token) {
          Cookies.set('ntoken', token.data.token, { expires: 60 });
          const user = token.data;
          window.sessionStorage.setItem('user', JSON.stringify(user));
          setIsAuthenticated(user?.token);
          history.push('/');
          window.location.reload();
        }
      }
    } catch (error) {
      toast({
        description: error.response.data.errors.email[0],
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  const signup = async (params) => {
    try {
      const res = await api.post('/register', params);
      if (res.status === 200) {
        toast({
          title: 'Sign up successful',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast({
        title: 'Error occured.',
        description: error.response.data.errors.email[0],
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  const logout = () => {
    Cookies.remove('token');
    window.sessionStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.Authorization;
    history.push('/login');
  };

  const recoverPassword = async (params) => {
    try {
      const res = await api.post('/auth/recover-password', params);
      if (res.status === 200) {
        toast({
          title: 'Password recovery successful',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          position: 'top-right',
        });
        history.push(match);
      }
    } catch (error) {
      toast({
        title: 'Error occured.',
        description: error.response.data.errors.email[0],
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  const resetPassword = async (params) => {
    try {
      const res = await api.post('/auth/reset-password', params);
      console.log('reset', res);
      if (res.status === 200) {
        toast({
          title: 'Sign up successful',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          position: 'top-right',
        });
        history.push('/login');
      }
    } catch (error) {
      console.log('error', error);
      toast({
        title: 'Error occured.',
        description: error.response.data.errors.email[0],
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        signin,
        loading,
        logout,
        signup,
        recoverPassword,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(authContext);

  return context;
}
