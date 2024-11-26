import React, { createContext, useState } from 'react'
import { DASHBOARDPAGE } from '../General/ConstStates';

export const CurrentPageContext = createContext({
  sidebarOpen:false,
 
  handleSideClick: () =>{},
  // handleNotificationClick: () =>{}
})

const CurrentPageContextProvider = ({children}) =>{
  const [currentPage, setCurrentPage] = useState(DASHBOARDPAGE);
  
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