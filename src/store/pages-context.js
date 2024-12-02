import React, { createContext, useState } from 'react'
import { DASHBOARDPAGE, LOGINPAGE, REGISTERPAGE } from '../General/ConstStates';

export const CurrentPageContext = createContext({
  sidebarOpen:false,
 
  handleSideClick: () =>{},
  // handleNotificationClick: () =>{}
})

const CurrentPageContextProvider = ({children}) =>{
  const [currentPage, setCurrentPage] = useState(REGISTERPAGE);
  
  const handlePageClick = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <CurrentPageContext.Provider
      value={{
        currentPage,
        handlePageClick,
      }}
    >
      {children}
    </CurrentPageContext.Provider>
  );
}

export default CurrentPageContextProvider