import React, { createContext, useState } from 'react';
import { DASHBOARDPAGE, LOGINPAGE } from '../General/ConstStates';

export const CurrentPageContext = createContext({
  sidebarOpen:false,
  setCurrentPage:() => {},
  handleSideClick: () =>{},
  // handleNotificationClick: () =>{}
})

const CurrentPageContextProvider = ({children}) =>{
  const [currentPage, setCurrentPage] = useState(LOGINPAGE);
  
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