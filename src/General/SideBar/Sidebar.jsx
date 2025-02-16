import React, { useContext, useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaCar, FaGift, FaKey, FaList, FaShieldAlt, FaUserTie } from "react-icons/fa";
import {
  FiBell,
  FiBriefcase,
  FiCheckCircle,
  FiCreditCard,
  FiFile, FiFileText,
  FiInbox,
  FiInfo,
  FiList,
  FiMail,
  FiMessageSquare,
  FiPlusCircle,
  FiRotateCcw,
  FiSliders, FiSunrise,
  FiUser,
  FiUserPlus,
  FiXCircle
} from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import { ADDAGENCY, ADDBOOKINGPACKAGE, ADDCUSTOMER, ADDUSERFORM, ADDVEHICLELIST, AGENCYLIST, APICALLFAIL, APINULLERROR, APPROVEDAGENCY, APPROVEDDRIVER, APPROVEDVEHICLE, ASSIGNDRIVER, BOOKINGLIST, CANCELBOOKINGLIST, CHANGEPASSWORD, CONTACTUS, COUPONS, CUSTOMERLIST, DRIVERLIST, FAQS, POPULARDESTINATIONPAGE, PROFILE, REASSIGNDRIVER, SMTP, USERADMINLIST, USERAUTH, VEHICLELIST } from "../../General/ConstStates";
import { AdminContext } from '../../store/admin-context';
import { LoginContext } from "../../store/login-context";
import { CurrentPageContext } from "../../store/pages-context";
import { callApi } from "../GeneralMethod";
import SidebarName from "./SidebarName";
import { LoadingContext } from "../../store/loading-context";

const Sidebar = ({setEditData}) => {
  const {sidebarOpen} = useContext(AdminContext)
  const {user} = useContext(LoginContext)
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const {currentPage, handlePageClick} =useContext(CurrentPageContext)
  const [show, setShow] = useState(false)
  const [allPages, setAllPages] = useState([])

  const handleItemClick = (pageName)=>{
    setEditData({})
    handlePageClick(pageName)
  }

  const handleClick = () =>{
    setShow(show => !show)
  }

  useEffect(()=>{
    getUserPages(user?.userId)
  },[])

    const getUserPages = async (selectedUser) => {
      startLoading();
      try {
        const response = await callApi(
          "get",
          `${process.env.REACT_APP_API_URL_ADMIN}Auth/GetPages/GetPages?UserId=${selectedUser}`,
          {},
          {}
        );
  
        if (response) {
          if (response.data.code === 200) {
            setAllPages([...response.data.data.filter((data,index)=>data.isAuth === true)]);
          } else {
            NotificationManager.error(response.data.message);
            setAllPages([]);
          }
        } else {
          NotificationManager.error(APINULLERROR);
        }
      } catch (err) {
        console.log(err);
        NotificationManager.error(APICALLFAIL);
      } finally {
        stopLoading();
      }
    };
  // useEffect(()=>{
  //   console.log(allPages)
  // },[allPages])


  const componentMap = {
    FiSunrise,FaCar,FiPlusCircle,FiList,FiXCircle,FaUserTie,FaUserTie,FiCreditCard,FiBell,FiRotateCcw,FiUserPlus,FiList,FiUserPlus,FiList,FiCheckCircle,FiList,FiCheckCircle,FiList,FiCheckCircle,FiInbox,FiMessageSquare,FiMail,FiBriefcase,FaGift,FiXCircle,FiFile,FiFileText,FiInfo,FiUser,FiUserPlus,FaList,FaShieldAlt,FaKey
  };

  const DynamicComponent = ({ componentName }) => {
    // Step 2: Get the component from the mapping
    const Component = componentMap[componentName];;
    
    if (!Component) {
      return <div>Component not found</div>; // Handle invalid component names
    }
  
    // Step 3: Render the component dynamically with props
    return <Component className="align-middle"  />;
  };

  return (
    <nav id="sidebar" className={`sidebar js-sidebar ${sidebarOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand">
          <span className="align-middle">Cabkro Admin</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Admin</li>

          <li className="sidebar-item active">
            <a data-bs-target="#dashboards" aria-expanded='true' data-bs-toggle="collapse" className="sidebar-link" onClick={handleClick}>
              <FiSliders className="align-middle" />
              <span className="align-middle">Dashboards</span>
            </a>
            <ul id="dashboards" className={`sidebar-dropdown list-unstyled collapse ${show ? 'show' : 'collapsed'} `} data-bs-parent="#sidebar">
              <li className="sidebar-item active">
                <a className="sidebar-link" href="index.html">Booking</a>
              </li>
              <li className="sidebar-item">
                <a className="sidebar-link" href="index.html">Customer</a>
              </li>
              <li className="sidebar-item">
                <a className="sidebar-link" href="index.html">Dashboard</a>
              </li>
            </ul>
          </li>

          {
            allPages.map((data,index)=>{
              
                if(data.parent === 0){
                  return(
                    <div key={index}>
                    <li className="sidebar-header">{data.pageName}</li>
                    <li className="sidebar-item">
                    {allPages.map((child, index)=>(
                      child.parent === data.pageId ? <div key={index}>
                      <li className="sidebar-item">
                      <a className="sidebar-link" onClick={()=>handleItemClick(child.pageRoute)}>
                      <DynamicComponent 
                                        componentName={child.pageIcons}
                                        
                                    />
                        <SidebarName name={child.pageName}/>
                      </a>
                    </li></div>:null
                    ))}
                  </li>
                    </div>
                  )
                }
              
            })
          }
          {/* <li className="sidebar-header">Data</li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(POPULARDESTINATIONPAGE)}>
              <FiSunrise className="align-middle" />
              <SidebarName name={'Popular Destinations'}/>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(ADDVEHICLELIST)}>
              <FaCar className="align-middle me-2" />
              <SidebarName name={'Add Vehicle List'}/>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() =>handleItemClick(ADDBOOKINGPACKAGE)}>
              <FiPlusCircle className="align-middle" />
              <SidebarName name={'Add Booking Packages'}/>
              
            </a>
          </li> */}
          {/* <li className="sidebar-item">
            <a className="sidebar-link" onClick={() =>handleItemClick(BOOKINGPACKAGELIST)}>
              <FiList className="align-middle" />
              <SidebarName name={'Booking Packages List'}/>
            </a>
          </li> */}

          {/* <li className="sidebar-header">Bookings</li> */}
          {/* <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiPlusCircle className="align-middle" />
              <span className="align-middle">Add Booking</span>
            </a>
          </li> */}
          {/* <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(BOOKINGLIST)}>
              <FiList className="align-middle" />
              <span className="align-middle">Booking List</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(CANCELBOOKINGLIST)}>
              <FiXCircle className="align-middle" />
              <span className="align-middle">Cancel Booking</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(ASSIGNDRIVER)}>
              <FaUserTie className="align-middle" />
              <span className="align-middle">Assign Driver</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(REASSIGNDRIVER)}>
              <FaUserTie className="align-middle" />
              <span className="align-middle">Re-Assign Driver</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiCreditCard className="align-middle" />
              <span className="align-middle">Add Payment</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiBell className="align-middle" />
              <span className="align-middle">Send Booking Details</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiRotateCcw className="align-middle" />
              <span className="align-middle">Booking Refunds</span>
            </a>
          </li>

          <li className="sidebar-header">Customer</li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(ADDCUSTOMER)}>
              <FiUserPlus className="align-middle" />
              <span className="align-middle">Add Customer</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(CUSTOMERLIST)}>
              <FiList className="align-middle" />
              <span className="align-middle">Customer List</span>
            </a>
          </li>

          <li className="sidebar-header">Driver</li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(ADDAGENCY)}>
              <FiUserPlus className="align-middle" />
              <span className="align-middle">Add Agency</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(AGENCYLIST)}>
            <FiList className="align-middle" />
              <span className="align-middle">Agency List</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(APPROVEDAGENCY)}>
              <FiCheckCircle className="align-middle" />
              <span className="align-middle">Approve Agency</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(VEHICLELIST)}>
            <FiList className="align-middle" />
              <span className="align-middle">Vehicle List</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(APPROVEDVEHICLE)}>
              <FiCheckCircle className="align-middle" />
              <span className="align-middle">Approve Vehicle</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(DRIVERLIST)}>
            <FiList className="align-middle" />
              <span className="align-middle">Driver List</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={()=>handleItemClick(APPROVEDDRIVER)}>
              <CiLogin className="align-middle"/>
              <span className="align-middle">Approve Driver</span>
            </a>
          </li> */}
          {/* <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FaTaxi className="align-middle me-2" />
              <span className="align-middle">Add Vehicle</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiCreditCard className="align-middle" />
              <span className="align-middle">Driver Wallet</span>
            </a>
          </li> */}

          {/* <li className="sidebar-header">Extra</li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => handleItemClick(CONTACTUS)}>
              <FiInbox className="align-middle" />
              <span className="align-middle">Contact Us</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => handleItemClick(FAQS)}>
              <FiMessageSquare className="align-middle" />
              <span className="align-middle">FAQs</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => handleItemClick(SMTP)}>
              <FiMail className="align-middle" />
              <span className="align-middle">SMTP Details</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => handleItemClick(COUPONS)}>
              <FiBriefcase className="align-middle" />
              <span className="align-middle">Coupon Codes</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FaGift className="align-middle me-2" />
              <span className="align-middle">Offers & Promo</span>
            </a>
          </li>

          <li className="sidebar-header">Policies</li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiXCircle className="align-middle" />
              <span className="align-middle">Cancel Policies</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiFile className="align-middle" />
              <span className="align-middle">Privacy Policies</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiFileText className="align-middle" />
              <span className="align-middle">Service Level Agreement</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiInfo className="align-middle" />
              <span className="align-middle">About Us</span>
            </a>
          </li>

          <li className="sidebar-header">Setting</li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() => handleItemClick(PROFILE)}>
              <FiUser className="align-middle" />
              <span className="align-middle">Profile</span>
            </a>
          </li> */}
          {/* <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiShield className="align-middle" />
              <span className="align-middle">Security</span>
            </a>
          </li> */}
          {/* <li className="sidebar-item">
						<a className="sidebar-link" onClick={()=>handleItemClick(ADDUSERFORM)}>
            <FiUserPlus className="align-middle"/> 
            <span className="align-middle">Add user</span>
            </a>
					</li>
          <li className="sidebar-item">
        <a className="sidebar-link" onClick={()=>handleItemClick(USERADMINLIST)}>
          <FaList className="align-middle" /> <span className="align-middle">User List</span>
        </a>
      </li>
      <li className="sidebar-item">
        <a className="sidebar-link" onClick={()=>handleItemClick(USERAUTH)}>
          <FaShieldAlt className="align-middle" /> <span className="align-middle">User Auth</span>
        </a>
      </li>
      <li className="sidebar-item">
        <a className="sidebar-link" onClick={()=>handleItemClick(CHANGEPASSWORD)}>
          <FaKey className="align-middle me-2" /> <span className="align-middle">Change Password</span>
        </a>
      </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
