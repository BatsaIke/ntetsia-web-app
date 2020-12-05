import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import api from 'utils/auth/api';

//api here is an axios instance

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      const user = window.sessionStorage.getItem('user');
      if (token) {
        // console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const data = JSON.parse(user);
        setUser(data?.id);
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
          position: 'top-right',
          description: res.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        if (token) {
          Cookies.set('token', token.data.token, { expires: 60 });
        }
        history.push('/');
      }
    } catch (error) {
      toast({
        description: error.response.data.errors.email[0],
        status: 'error',
        duration: 9000,
        isClosable: true,
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
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error occured.',
        description: error.response.data.errors.email[0],
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const logout = () => {
    Cookies.remove('token');
    window.sessionStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.Authorization;
    history.push('/');
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signin,
        loading,
        logout,
        signup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// export default const useAuth () ret useContext(authContext);

export default function useAuth() {
  const context = useContext(authContext);

  return context;
}
