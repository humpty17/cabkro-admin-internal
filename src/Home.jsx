import React, { useContext, useState } from "react";
import Navbar from "./General/Components/Navbar";
import {
  ADDAGENCY,
  ADDBOOKINGPACKAGE,
  ADDCUSTOMER,
  ADDUSERFORM,
  ADDVEHICLELIST,
  AGENCYLIST,
  APPROVEDAGENCY,
  APPROVEDDRIVER,
  APPROVEDVEHICLE,
  ASSIGNDRIVER,
  BOOKINGLIST,
  BOOKINGPACKAGELIST,
  CANCELBOOKINGLIST,
  CHANGEPASSWORD,
  CONTACTUS,
  COUPONS,
  CUSTOMERLIST,
  DASHBOARDPAGE,
  DRIVERLIST,
  FAQS,
  LOGINPAGE,
  POPULARDESTINATIONPAGE,
  PROFILE,
  REASSIGNDRIVER,
  REGISTERPAGE,
  SMTP,
  UPDATEAGENCYALLDETAILS,
  USERADMINLIST,
  USERAUTH,
  VEHICLELIST,
} from "./General/ConstStates";
import Sidebar from "./General/SideBar/Sidebar";
import Dashboard from "./pages/Dashboard";
import PopularDestinations from "./pages/Data/PopularDestinations";
import { CurrentPageContext } from "./store/pages-context";

import Register from "./General/Register/Register";
import Login from "./Login/Login";
import AssignDriver from "./pages/Bookings/AssignDriver";
import BookingList from "./pages/Bookings/BookingList";
import CancelBookingList from "./pages/Bookings/CancelBookingList";
import AddCustomer from "./pages/Customer/AddCustomer";
import CustomerList from "./pages/Customer/CustomerList";
import AddBookingPackage from "./pages/Data/AddBookingPackage";
import AddVehicleList from "./pages/Data/AddVehicleList";
import BookingPackageList from "./pages/Data/BookingPackageList";
import AddAgency from "./pages/Driver/AddAgency";
import AgencyList from "./pages/Driver/AgencyList";
import ApprovedAgency from "./pages/Driver/ApprovedAgency";
import ApprovedDriver from "./pages/Driver/ApprovedDriver";
import ApprovedVehicle from "./pages/Driver/ApprovedVehicle";
import UpdateAgencyAllDetails from "./pages/Driver/Components/UpdateAgencyAllDetails";
import DriverList from "./pages/Driver/DriverList";
import VehicleList from "./pages/Driver/VehicleList";
import ContactUs from "./pages/Extra/ContactUs";
import Coupons from "./pages/Extra/Coupons";
import FAQs from "./pages/Extra/FAQs";
import SMTPDetails from "./pages/Extra/SMTPDetails";
import AddUserForm from "./pages/Setting/AddUserForm";
import ChangePassword from "./pages/Setting/ChangePassword";
import UserAdminList from "./pages/Setting/UserAdminList";
import UserProfile from "./pages/Setting/UserProfile";
import { LoginContext } from "./store/login-context";
import UserAuth from "./pages/Setting/UserAuth";

const Home = () => {
  const { currentPage, handlePageClick } = useContext(CurrentPageContext);
  const { user } = useContext(LoginContext);

  const [editData, setEditData] = useState({});
  // const [isEdit, setIsEdit] = useState(false)
  //console.log("user in home", user, currentPage)
  return (
    <>
      {currentPage === LOGINPAGE && user === null && <Login />}
      {currentPage === REGISTERPAGE && user === null && <Register />}
      {currentPage !== LOGINPAGE &&
        currentPage !== REGISTERPAGE &&
        user !== null && (
          <div className="wrapper">
            <Sidebar setEditData={setEditData}/>
            <div className="main">
              <Navbar />
              {currentPage === DASHBOARDPAGE && <Dashboard />}

              {/* data section */}
              {currentPage === POPULARDESTINATIONPAGE && (
                <PopularDestinations />
              )}
              {currentPage === ADDBOOKINGPACKAGE && <AddBookingPackage />}
              {currentPage === ADDVEHICLELIST && <AddVehicleList />}
              {currentPage === BOOKINGPACKAGELIST && <BookingPackageList />}

              {/* setting section */}
              {currentPage === ADDUSERFORM && (
                <AddUserForm setEditData={setEditData} editData={editData} />
              )}
              {currentPage === USERADMINLIST && (
                <UserAdminList setEditData={setEditData} editData={editData} />
              )}
              {currentPage === PROFILE && <UserProfile />}
              {currentPage === CHANGEPASSWORD && <ChangePassword />}
              {currentPage === USERAUTH && <UserAuth></UserAuth>}

              {/* customer section  */}
              {currentPage === ADDCUSTOMER && (
                <AddCustomer setEditData={setEditData} editData={editData} />
              )}
              {currentPage === CUSTOMERLIST && (
                <CustomerList setEditData={setEditData} editData={editData} />
              )}

              {/* Extra section */}
              {currentPage === FAQS && <FAQs />}
              {currentPage === SMTP && <SMTPDetails />}
              {currentPage === COUPONS && <Coupons />}
              {currentPage === CONTACTUS && <ContactUs />}

              {/* Driver section */}
              {currentPage === ADDAGENCY && (
                <AddAgency
                  setEditData={setEditData}
                  editData={editData}
                ></AddAgency>
              )}
              {currentPage === AGENCYLIST && (
                <AgencyList
                  setEditData={setEditData}
                  editData={editData}
                ></AgencyList>
              )}
              {currentPage === VEHICLELIST && (
                <VehicleList setEditData={setEditData} editData={editData} />
              )}
              {currentPage === APPROVEDAGENCY && (
                <ApprovedAgency setEditData={setEditData} editData={editData} />
              )}
              {currentPage === APPROVEDVEHICLE && (
                <ApprovedVehicle
                  setEditData={setEditData}
                  editData={editData}
                />
              )}
              {currentPage === DRIVERLIST && (
                <DriverList setEditData={setEditData} editData={editData} />
              )}
              {currentPage === APPROVEDDRIVER && (
                <ApprovedDriver setEditData={setEditData} editData={editData} />
              )}

              {currentPage === UPDATEAGENCYALLDETAILS && (
                <UpdateAgencyAllDetails
                  setEditData={setEditData}
                  editData={editData}
                ></UpdateAgencyAllDetails>
              )}

              {/* Booking Section */}
              {currentPage === BOOKINGLIST && (<BookingList></BookingList>)}
              {currentPage === CANCELBOOKINGLIST && (<CancelBookingList></CancelBookingList>)}
              {currentPage === ASSIGNDRIVER && (<AssignDriver assignDriver={false}></AssignDriver>)}
              {currentPage === REASSIGNDRIVER && (<AssignDriver assignDriver={true}></AssignDriver>)}
            </div>
          </div>
        )}
    </>
  );
};

export default Home;
