import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminContextProvider from './store/admin-context';
import CurrentPageContextProvider, { CurrentPageContext } from './store/pages-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrentPageContextProvider>
    <AdminContextProvider>
    <App />
    </AdminContextProvider>
    </CurrentPageContextProvider>
  </React.StrictMode>
);