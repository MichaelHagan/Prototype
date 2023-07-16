import { fetchUtils, Admin, Resource, ListGuesser,EditGuesser } from "react-admin";
import LoginPage from "./components/login/LoginPage";
import Provider from "./dataProvider.ts";
import OrderIcon from "@mui/icons-material/DeliveryDining";
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import { Dashboard } from "./components/dashboard/Dashboard";
import { authProvider } from './authProvider';
import './App.scss';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const  token  = localStorage.getItem('auth');
  options.headers.set('authorization', `Bearer ${token}`);
  console.log("We this for here: ",url);
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

   </Admin>
  );

export default App;