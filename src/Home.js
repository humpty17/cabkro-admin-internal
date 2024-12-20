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
  ADDVEHICLELIST,
  BOOKINGPACKAGELIST,
  COUPONS,
  CUSTOMERLIST,
  DASHBOARDPAGE,
  FAQS,
  LOGINPAGE,
  POPULARDESTINATIONPAGE,
  PROFILE,
  REGISTERPAGE,
  SMTP,
  USERADMINLIST,
} from "./General/ConstStates";

import Register from "./General/Register/Register";
import Login from "./Login/Login";
import AddUserForm from "./pages/Setting/AddUserForm";
import LoginContextProvider, { LoginContext } from "./store/login-context";
import UserAdminList from "./pages/Setting/UserAdminList";
import AddBookingPackage from "./pages/Data/AddBookingPackage";
import AddCustomer from "./pages/Customer/AddCustomer";
import Profile from "./pages/Setting/Profile/Profile";
import AddVehicleList from "./pages/Data/AddVehicleList";
import BookingPackageList from "./pages/Data/BookingPackageList";
import CustomerList from "./pages/Customer/CustomerList";
import Faqs from "./pages/Extra/FAQs";
import FAQs from "./pages/Extra/FAQs";
import SMTPDetails from "./pages/Extra/SMTPDetails";
import Coupons from "./pages/Extra/Coupons";

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
            {currentPage === ADDVEHICLELIST && <AddVehicleList/>}
            {currentPage === BOOKINGPACKAGELIST && <BookingPackageList/>}

            {/* setting section */}
            {currentPage === ADDUSERFORM && <AddUserForm/>}
            {currentPage === USERADMINLIST && <UserAdminList/>}
            {currentPage === PROFILE && <Profile/>}

            {/* customer section  */}
            {currentPage === ADDCUSTOMER && <AddCustomer/>}
            {currentPage === CUSTOMERLIST && <CustomerList/>}

            {/* Extra section */}
            {currentPage === FAQS && <FAQs/>}
            {currentPage === SMTP && <SMTPDetails/>}
            {currentPage === COUPONS && <Coupons/>}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
