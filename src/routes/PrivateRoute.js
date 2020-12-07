import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get('ntoken');

  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
