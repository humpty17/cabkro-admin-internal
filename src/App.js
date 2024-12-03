import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './Home';
import Loader from './General/Components/Loader';

function App() {
  return (
    <>
    <Loader></Loader>
    <Home/>
    </>
  );
}

export default App;
