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
import Home from "./Home";
import Feed from "./Feed";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Profile from "./Profile/Profile";
import Jobs from "./Jobs";
import Contribution from "./Contribution";
import MyIdeas from "./MyIdeas";
import Settings from "./Settings";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Notifications from "./Notifications";
import Payment from "./Payment";
import LandingPage from "./LandingPage";
import ReferalMethod from "components/MultiForm/ReferalMethod";
import Contribute from "components/MultiForm/RiskQuestions/Contribute";
import JobCreations from "components/MultiForm/RiskQuestions/JobCreations";
import Competetion from "components/MultiForm/RiskQuestions/Competetion";
import ReferID from "components/MultiForm/RiskQuestions/ReferID";
import JobDetails from "./JobDetails";
import DashBoard from "pages/Dashboard/DashBoard";
import Verification from "./Verification";
import AccountType from "components/MultiForm/AccountType";
import Emailverification from "./EmailVerification";


export const Pages = {
  Home,
  Feed,
  Login,
  Logout,
  Register,
  Profile,
  Jobs,
  LandingPage,
  Contribute,
  JobCreations,
  Competetion,
  ReferID,
  // Questions,
  ReferalMethod,
  Contribution,
  MyIdeas,
  Settings,
  Payment,
  ForgotPassword,
  ResetPassword,
  Notifications,
  JobDetails,
  DashBoard,
  Verification,
  AccountType,
  Emailverification,
};
