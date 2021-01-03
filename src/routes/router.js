import { Text } from '@chakra-ui/react';
import { Pages } from 'pages';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
    <React.Suspense fallback={<Text>Loading....</Text>}>
      <Switch>
        <PrivateRoute exact path='/' component={Pages.Home} />
        <PrivateRoute exact path='/feed/:id' component={Pages.Feed} />
        <Route exact path='/login' component={Pages.Login} />
        <Route exact path='/register' component={Pages.Register} />
        <Route exact path='/forgot-password' component={Pages.ForgotPassword} />
        <Route
          exact
          path='/reset-password/:id'
          component={Pages.ResetPassword}
        />
        <PrivateRoute exact path='/profile/:id' component={Pages.Profile} />
        <PrivateRoute exact path='/profile' component={Pages.Profile} />
        <PrivateRoute exact path='/jobs' component={Pages.Jobs} />
        <PrivateRoute
          exact
          path='/contribution'
          component={Pages.Contribution}
        />
        <PrivateRoute exact path='/my-ideas' component={Pages.MyIdeas} />
        <PrivateRoute exact path='/settings' component={Pages.Settings} />
        <PrivateRoute
          exact
          path='/notifications'
          component={Pages.Notifications}
        />
      </Switch>
    </React.Suspense>
  );
};

export default Router;
