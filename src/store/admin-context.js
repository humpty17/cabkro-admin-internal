import { type } from '@testing-library/user-event/dist/type';
import React, { createContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const AdminContext = createContext({
  sidebarOpen:false,
  type:"password",
  icon:'',
  handleSideClick: () =>{},
  handleToggleData : () => {}
})

const AdminContextProvider = ({children}) =>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<FaEyeSlash/>);
  

  const handleSideClick = () => {
    setSidebarOpen(sidebarOpen => !sidebarOpen);
  };

  const handleToggleData = () => {
    if (type === "password") {
      setIcon(<FaEye />);
      setType("text");
    } else {
      setIcon(<FaEyeSlash />);
      setType("password");
    }
  };

  // const handleNotificationClick = () =>{
  //   setSidebarOpen(sidebarOpen => !sidebarOpen);
  // }

  

  return(
    <AdminContext.Provider value={{
      sidebarOpen,
      type,
      icon,
      handleSideClick,
      handleToggleData
      // handleNotificationClick
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider