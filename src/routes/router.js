import { Text } from "@chakra-ui/react";
import { Pages } from "pages";
import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const LandingP = <Route exact path="/landing" component={Pages.LandingPage} />;
  return (
    <React.Suspense fallback={<Text>Loading....</Text>}>

      <Switch>
        <PrivateRoute exact path="/" component={Pages.LandingPage} />
        <PrivateRoute exact path="/comments/:id" component={Pages.Feed} />
        <PrivateRoute exact path="/logout" component={Pages.Logout} />
        <Route exact path="/login" component={Pages.Login} />
        <Route exact path="/register" component={Pages.Register} />
        <Route exact path="/verify" component={Pages.Verification} />
        <Route exact path="/accounttype" component={Pages.AccountType} />

        <Route exact path="/forgot-password" component={Pages.ForgotPassword} />
        <Route exact path="/paymentpage" component={Pages.Payment} />
        <Route exact path="/home" component={Pages.Home} />
        <Route exact path="/refer" component={Pages.ReferalMethod} />
        <Route exact path="/contributionBelieve" component={Pages.Contribute} />
        <Route exact path="/jobBelieve" component={Pages.JobCreations} />
        <Route exact path="/competetionBelive" component={Pages.Competetion} />
        <Route exact path="/referID" component={Pages.ReferID} />
        <Route exact path="/dashboard" component={Pages.DashBoard} />
        <Route exact path="/email" component={Pages.Emailverification} />
        

      
        {LandingP}
        <Route
          exact
          path="/reset-password/:id"
          component={Pages.ResetPassword}
        />
        <PrivateRoute exact path="/profile/:id" component={Pages.Profile} />
        <PrivateRoute exact path="/profile" component={Pages.Profile} />
        <PrivateRoute exact path="/jobs" component={Pages.Jobs} />
        <Route exact path="/jobdetails" component={Pages.JobDetails} />
        <PrivateRoute
          exact
          path="/contribution"
          component={Pages.Contribution}
        />
        <PrivateRoute exact path="/my-ideas" component={Pages.MyIdeas} />
        <PrivateRoute exact path="/settings" component={Pages.Settings} />
        <PrivateRoute
          exact
          path="/notifications"
          component={Pages.Notifications}
        />
      </Switch>
    </React.Suspense>
  );
};

export default Router;
