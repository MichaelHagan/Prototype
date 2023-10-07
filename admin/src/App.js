import { fetchUtils, Admin, Resource, ListGuesser,EditGuesser } from "react-admin";
import {AdminList, AdminEdit, AdminCreate} from "./components/admins/Admins";
import {JobOwnerList, JobOwnerEdit, JobOwnerCreate} from "./components/jobowners/JobOwners";
import {UserList, UserEdit, UserCreate} from "./components/users/Users";
import { BussinessList, BussinessEdit, BussinessCreate } from "./components/bussinesses/Bussinesses";
import { CarList, CarEdit, CarCreate } from "./components/cars/Cars";
import { OrderList, OrderEdit, OrderCreate } from "./components/orders/Orders";
import { ImageCreate, ImageList, ImageEdit } from "./components/carimages/Images";
import PersonIcon from '@mui/icons-material/Person';
import GarageIcon from '@mui/icons-material/EmojiTransportation';
import CarIcon from '@mui/icons-material/CarRental';
import ImageIcon from '@mui/icons-material/Image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LoginPage from "./components/login/LoginPage";
import Provider from "./dataProvider.js";
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
    list={OrderList} 
    edit={OrderEdit} 
    create={OrderCreate} 
    icon={OrderIcon} 
    />

    <Resource 
    name="cars" 
    list={CarList} 
    edit={CarEdit} 
    create={CarCreate}
    icon={CarIcon} 
    />

    <Resource 
    name="images" 
    list={ImageList} 
    edit={ImageEdit} 
    create={ImageCreate}
    icon={ImageIcon} 
    />

    <Resource 
    name="businesses" 
    list={BussinessList} 
    edit={BussinessEdit} 
    create={BussinessCreate}
    icon={GarageIcon} 
    options={{ label: "Rental Providers" }}
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
    options={{ label: "Job Owners" }}
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