import React from 'react';

//Pages
const Home = React.lazy(() => import('./Home'));
const Feed = React.lazy(() => import('./Feed'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const Profile = React.lazy(() => import('./Profile'));
const Jobs = React.lazy(() => import('./Jobs'));
const Contribution = React.lazy(() => import('./Contribution'));
const MyIdeas = React.lazy(() => import('./MyIdeas'));

export const Pages = {
  Home,
  Feed,
  Login,
  Register,
  Profile,
  Jobs,
  Contribution,
  MyIdeas,
};
