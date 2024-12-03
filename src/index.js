import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminContextProvider from './store/admin-context';
import CurrentPageContextProvider, { CurrentPageContext } from './store/pages-context';
import LoadingContextProvider from './store/loading-context';
import Loader from './General/Components/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);