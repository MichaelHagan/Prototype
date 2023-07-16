import { fetchUtils, Admin, Resource, ShowGuesser, ListGuesser,EditGuesser } from "react-admin";
import PaymentsIcon from '@mui/icons-material/Payments';
import LoginPage from "./components/login/LoginPage";
import Provider from "./dataProvider.ts";
import OrderIcon from "@mui/icons-material/DeliveryDining";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import { Dashboard } from "./components/dashboard/Dashboard";
import { authProvider } from './authProvider';
import './App.scss';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const  token  = localStorage.getItem('auth');
  options.headers.set('authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = Provider("http://localhost:5000", httpClient);

const App = () => (

   <Admin 
   authProvider={authProvider} 
   dataProvider={dataProvider}
   loginPage={LoginPage} 
   dashboard={Dashboard}
   >

    <Resource 
    name="orders" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser} 
    icon={OrderIcon} 
    />

    <Resource 
    name="services" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={OrderIcon} 
    />

    <Resource 
    name="businesses" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={PaymentsIcon} 
    />

    <Resource 
    name="locations" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={PaymentsIcon} 
    />

    <Resource 
    name="users" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={GroupIcon} 
    />

    <Resource 
    name="jobOwners" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={GroupIcon} 
    />

    <Resource 
    name="admins" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={AdminPanelSettingsIcon} 
    />

   </Admin>
  );

export default App;