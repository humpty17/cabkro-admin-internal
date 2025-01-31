import { type } from '@testing-library/user-event/dist/type';
import React, { createContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const AdminContext = createContext({
  sidebarOpen:false,
  type:"password",
  icon:'',
  image : null,
  setImage : () => {},
  imageUrl : '',
  setImageUrl : () => {},
  handleDownload : () => {},
  handleSideClick: () =>{},
  handleToggleData : () => {}
})

const AdminContextProvider = ({children}) =>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<FaEyeSlash/>);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
  

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

  const handleDownload = (e) => {
    e.preventDefault()
    if (image) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = image.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return(
    <AdminContext.Provider value={{
      sidebarOpen,
      type,
      icon,
      image,
      setImage,
      imageUrl,
      setImageUrl,
      handleDownload,
      handleSideClick,
      handleToggleData
      // handleNotificationClick
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider