import React from "react";
import { FaCar, FaTaxi, FaKey, FaUserTie, FaGift } from "react-icons/fa";
import { 
  FiSliders, FiSunrise, FiPlusCircle, FiList, FiXCircle, 
  FiCreditCard, FiBell, FiRotateCcw, FiUserPlus, FiCheckCircle, 
  FiInbox, FiMessageSquare, FiMail, FiBriefcase, FiShare2, 
  FiFile, FiFileText, FiInfo, FiShield, FiUser 
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand">
          <span className="align-middle">Cabkro Admin</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Admin</li>

          <li className="sidebar-item active">
            <a data-bs-target="#dashboards" aria-expanded="true" data-bs-toggle="collapse" className="sidebar-link">
              <FiSliders className="align-middle" />
              <span className="align-middle">Dashboards</span>
            </a>
            <ul id="dashboards" className="sidebar-dropdown list-unstyled collapse show" data-bs-parent="#sidebar">
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
            <a className="sidebar-link" href="popularDestination.html">
              <FiSunrise className="align-middle" />
              <span className="align-middle">Popular Destinations</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="AddVehicleList.html">
              <FaCar className="align-middle me-2" />
              <span className="align-middle">Add Vehicle List</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="AddBookingPackage.html">
              <FiPlusCircle className="align-middle" />
              <span className="align-middle">Add Booking Packages</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="BookingPackageList.html">
              <FiList className="align-middle" />
              <span className="align-middle">Booking Packages List</span>
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
            <a className="sidebar-link" href="AddCustomer.html">
              <FiUserPlus className="align-middle" />
              <span className="align-middle">Add Customer</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="CustomerList.html">
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
            <a className="sidebar-link" href="#">
              <FiInbox className="align-middle" />
              <span className="align-middle">Contact Us</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiMessageSquare className="align-middle" />
              <span className="align-middle">FAQs</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiMail className="align-middle" />
              <span className="align-middle">SMTP Details</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
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
            <a className="sidebar-link" href="#">
              <FiUser className="align-middle" />
              <span className="align-middle">Profile</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <FiShield className="align-middle" />
              <span className="align-middle">Security</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
