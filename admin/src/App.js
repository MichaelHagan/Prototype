import { fetchUtils, Admin, Resource, ListGuesser,EditGuesser } from "react-admin";
import {AdminList, AdminEdit, AdminCreate} from "./components/admins/Admins";
import {JobOwnerList, JobOwnerEdit, JobOwnerCreate} from "./components/jobowners/JobOwners";
import {UserList, UserEdit, UserCreate} from "./components/users/Users";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
    icon={WorkIcon} 
    />

    <Resource 
    name="businesses" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={BusinessIcon} 
    />

    <Resource 
    name="locations" 
    list={ListGuesser} 
    edit={EditGuesser} 
    create={EditGuesser}
    icon={LocationOnIcon} 
    />

    <Resource 
    name="users" 
    list={UserList} 
    edit={UserEdit} 
    create={UserCreate}
    icon={PersonIcon} 
    />

    <Resource 
    name="jobOwners" 
    list={JobOwnerList} 
    edit={JobOwnerEdit} 
    create={JobOwnerCreate}
    icon={GroupIcon} 
    />

    <Resource 
    name="admins" 
    list={AdminList} 
    edit={AdminEdit}  
    create={AdminCreate}
    icon={AdminPanelSettingsIcon} 
    />

   </Admin>
  );

export default App;