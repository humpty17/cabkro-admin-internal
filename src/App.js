import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "react-notifications/lib/notifications.css";
import Home from './Home';
import Loader from './General/Components/Loader';
import { NotificationContainer } from "react-notifications";
function App() {
  return (
    <>
    <NotificationContainer></NotificationContainer>
    <Loader></Loader>
    <Home/>
    </>
  );
}

export default App;


