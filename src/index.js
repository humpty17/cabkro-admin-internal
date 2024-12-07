import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminContextProvider from './store/admin-context';
import CurrentPageContextProvider, { CurrentPageContext } from './store/pages-context';
import LoadingContextProvider from './store/loading-context';
import Loader from './General/Components/Loader';
import LoginContextProvider from './store/login-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <CurrentPageContextProvider>
        <LoadingContextProvider>
          <AdminContextProvider>
            <>
              <Loader></Loader>
              <App />
            </>
          </AdminContextProvider>
        </LoadingContextProvider>
      </CurrentPageContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);