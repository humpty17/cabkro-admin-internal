import React, { useContext, useState } from "react";
import { FaCar, FaTaxi, FaKey, FaUserTie, FaList, FaShieldAlt, FaGift } from "react-icons/fa";
import { 
  FiSliders, FiSunrise, FiPlusCircle, FiList, FiXCircle, 
  FiCreditCard, FiBell, FiRotateCcw, FiUserPlus, FiCheckCircle, 
  FiInbox, FiMessageSquare, FiMail, FiBriefcase, FiShare2, 
  FiFile, FiFileText, FiInfo, FiShield, FiUser,  
} from "react-icons/fi";
import SidebarName from "./SidebarName";
import { ADDBOOKINGPACKAGE, ADDCUSTOMER, ADDUSERFORM, ADDVEHICLELIST, BOOKINGPACKAGELIST, CONTACTUS, COUPONS, CUSTOMERLIST, FAQS, POPULARDESTINATIONPAGE, PROFILE, SMTP, USERADMINLIST } from "../../General/ConstStates";
import { AdminContext } from '../../store/admin-context';
import { CurrentPageContext } from "../../store/pages-context";

const Sidebar = () => {
  const {sidebarOpen} = useContext(AdminContext)
  const {currentPage,    
  handlePageClick} =useContext(CurrentPageContext)
  const [show, setShow] = useState(false)

  const handleItemClick = (pageName)=>{
    handlePageClick(pageName)
  }

  const handleClick = () =>{
    setShow(show => !show)
  }

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

          <li className="sidebar-header">Data</li>
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
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" onClick={() =>handleItemClick(BOOKINGPACKAGELIST)}>
              <FiList className="align-middle" />
              <SidebarName name={'Booking Packages List'}/>
            </a>
          </li>

          <li className="sidebar-header">Bookings</li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiPlusCircle className="align-middle" />
              <span className="align-middle">Add Booking</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiList className="align-middle" />
              <span className="align-middle">Booking List</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiXCircle className="align-middle" />
              <span className="align-middle">Cancel Booking</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FaUserTie className="align-middle" />
              <span className="align-middle">Assign Driver</span>
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
            <a className="sidebar-link" href="#">
              <FiUserPlus className="align-middle" />
              <span className="align-middle">Add Agency</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiCheckCircle className="align-middle" />
              <span className="align-middle">Approve Agency</span>
            </a>
          </li>
          <li className="sidebar-item">
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
          </li>

          <li className="sidebar-header">Extra</li>
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
          </li>
          {/* <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiShield className="align-middle" />
              <span className="align-middle">Security</span>
            </a>
          </li> */}
          <li className="sidebar-item">
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
        <a className="sidebar-link" href="#">
          <FaShieldAlt className="align-middle" /> <span className="align-middle">User Auth</span>
        </a>
      </li>
      <li className="sidebar-item">
        <a className="sidebar-link" href="ChangePassword.html">
          <FaKey className="align-middle me-2" /> <span className="align-middle">Change Password</span>
        </a>
      </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
