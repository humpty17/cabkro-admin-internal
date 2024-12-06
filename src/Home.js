import React, { useContext } from "react";
import Sidebar from "./General/SideBar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./General/Components/Navbar";
import PopularDestinations from "./pages/PopularDestinations";
import { CurrentPageContext } from "./store/pages-context";
import {
  ADDUSERFORM,
  DASHBOARDPAGE,
  LOGINPAGE,
  POPULARDESTINATIONPAGE,
  REGISTERPAGE,
} from "./General/ConstStates";

import Register from "./General/Register/Register";
import Login from "./Login/Login";
import AddUserForm from "./pages/AddUserForm";

const Home = () => {
  const { currentPage, handlePageClick } = useContext(CurrentPageContext);
  return (
    <>
      {currentPage === LOGINPAGE && <Login />}
      {currentPage === REGISTERPAGE && <Register />}
      {currentPage !== LOGINPAGE && currentPage !== REGISTERPAGE && (
        <div className="wrapper">
          <Sidebar />
          <div className="main">
            <Navbar />
            {currentPage === DASHBOARDPAGE && <Dashboard />}
            {currentPage === POPULARDESTINATIONPAGE && <PopularDestinations/>}
            {currentPage === ADDUSERFORM && <AddUserForm/>}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
