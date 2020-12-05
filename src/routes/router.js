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
        <PrivateRoute exact path='/profile/:id' component={Pages.Profile} />
        <Route exact path='/profile' component={Pages.Profile} />
        <Route exact path='/jobs' component={Pages.Jobs} />
        <Route exact path='/contribution' component={Pages.Contribution} />
        <Route exact path='/my-ideas' component={Pages.MyIdeas} />
      </Switch>
    </React.Suspense>
  );
};

export default Router;
