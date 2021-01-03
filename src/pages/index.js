import React from 'react';

//Pages
// const Home = React.lazy(() => import('./Home'));
// const Feed = React.lazy(() => import('./Feed'));
// const Login = React.lazy(() => import('./Login'));
// const Register = React.lazy(() => import('./Register'));
// const Profile = React.lazy(() => import('./Profile'));
// const Jobs = React.lazy(() => import('./Jobs'));
// const Contribution = React.lazy(() => import('./Contribution'));
// const MyIdeas = React.lazy(() => import('./MyIdeas'));
// const Settings = React.lazy(() => import('./Settings'));
// const ForgotPassword = React.lazy(() => import('./ForgotPassword'));
// const ResetPassword = React.lazy(() => import('./ResetPassword'));

//Pages
import Home from './Home';
import Feed from './Feed';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Jobs from './Jobs';
import Contribution from './Contribution';
import MyIdeas from './MyIdeas';
import Settings from './Settings';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Notifications from './Notifications';

export const Pages = {
  Home,
  Feed,
  Login,
  Register,
  Profile,
  Jobs,
  Contribution,
  MyIdeas,
  Settings,
  ForgotPassword,
  ResetPassword,
  Notifications,
};
