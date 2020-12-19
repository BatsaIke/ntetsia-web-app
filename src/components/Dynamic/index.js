//components
import Account from './Account';
import Profile from './Profile';
import Notifications from './Notifications';
import Theme from './Theme';
import School from './School';
import Work from './Work';

const components = {
  compA: Profile,
  compB: School,
  compC: Work,
  compD: Account,
  compE: Notifications,
  compF: Theme,
};

const DynamicSections = ({ tab }) => {
  const SelectedTab = components[tab];
  return <SelectedTab />;
};

export default DynamicSections;
