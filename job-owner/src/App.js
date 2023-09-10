import { fetchUtils, Admin, Resource } from "react-admin";
import LoginPage from "./components/login/LoginPage";
import Provider from "./dataProvider.ts";
import { BussinessList, BussinessEdit, BussinessCreate } from "./components/bussinesses/Bussinesses";
import { CarList, CarEdit, CarCreate } from "./components/cars/Cars";
import { OrderList, OrderEdit, OrderCreate } from "./components/orders/Orders";
import OrderIcon from "@mui/icons-material/DeliveryDining";
import GarageIcon from '@mui/icons-material/EmojiTransportation';
import CarIcon from '@mui/icons-material/CarRental';
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
    name="businesses" 
    list={BussinessList} 
    edit={BussinessEdit} 
    create={BussinessCreate}
    icon={GarageIcon} 
    options={{ label: "My Rentals" }}
    />

   </Admin>
  );

export default App;