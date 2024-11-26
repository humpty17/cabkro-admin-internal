import React, { createContext, useState } from 'react'

export const AdminContext = createContext({
  sidebarOpen:false,
  handleSideClick: () =>{},
  // handleNotificationClick: () =>{}
})

const AdminContextProvider = ({children}) =>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const handleSideClick = () => {
    setSidebarOpen(sidebarOpen => !sidebarOpen);
  };

  // const handleNotificationClick = () =>{
  //   setSidebarOpen(sidebarOpen => !sidebarOpen);
  // }

  

  return(
    <AdminContext.Provider value={{
      sidebarOpen,
      handleSideClick,
      // handleNotificationClick
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider