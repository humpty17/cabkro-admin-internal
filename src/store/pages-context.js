import React, { createContext, useContext, useState } from 'react';
import { DASHBOARDPAGE, LOGINPAGE } from '../General/ConstStates';
import { LoginContext } from './login-context';

export const CurrentPageContext = createContext({
  sidebarOpen:false,
  setCurrentPage:() => {},
  handleSideClick: () =>{},
  // handleNotificationClick: () =>{}
})

const CurrentPageContextProvider = ({children}) =>{
  const {user} = useContext(LoginContext)
  const [currentPage, setCurrentPage] = useState(user===null ? LOGINPAGE : DASHBOARDPAGE) ;
  
  const handlePageClick = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <CurrentPageContext.Provider
      value={{
        currentPage,
        handlePageClick,
        setCurrentPage
      }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
}

export default CurrentPageContextProvider 