import React, { useContext } from "react";
import Sidebar from "./General/SideBar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./General/Components/Navbar";
import PopularDestinations from "./pages/Data/PopularDestinations";
import { CurrentPageContext } from "./store/pages-context";
import {
  ADDBOOKINGPACKAGE,
  ADDCUSTOMER,
  ADDUSERFORM,
  DASHBOARDPAGE,
  LOGINPAGE,
  POPULARDESTINATIONPAGE,
  REGISTERPAGE,
  USERADMINLIST,
} from "./General/ConstStates";

import Register from "./General/Register/Register";
import Login from "./Login/Login";
import AddUserForm from "./pages/Setting/AddUserForm";
import LoginContextProvider, { LoginContext } from "./store/login-context";
import UserAdminList from "./pages/Setting/UserAdminList";
import AddBookingPackage from "./pages/Data/AddBookingPackage";
import AddCustomer from "./pages/Customer/AddCustomer";

const Home = () => {
  const { currentPage, handlePageClick } = useContext(CurrentPageContext);
  const {user} = useContext(LoginContext)
  //console.log("user in home", user, currentPage)
  return (
    <>
      {currentPage === LOGINPAGE && user === null && <Login />}
      {currentPage === REGISTERPAGE && user === null && <Register />}
      {currentPage !== LOGINPAGE && currentPage !== REGISTERPAGE && user !== null && (
        <div className="wrapper">
          <Sidebar />
          <div className="main">
            <Navbar />
            {currentPage === DASHBOARDPAGE && <Dashboard />}

            {/* data section */}
            {currentPage === POPULARDESTINATIONPAGE && <PopularDestinations/>}
            {currentPage === ADDBOOKINGPACKAGE && <AddBookingPackage/>}

            {/* setting section */}
            {currentPage === ADDUSERFORM && <AddUserForm/>}
            {currentPage === USERADMINLIST && <UserAdminList/>}

            {/* customer section  */}
            {currentPage === ADDCUSTOMER && <AddCustomer/>}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
