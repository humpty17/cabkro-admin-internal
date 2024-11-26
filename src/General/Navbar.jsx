import React, { useContext, useState } from "react";
import { FiBell, FiAlertCircle, FiHome, FiUserPlus, FiSettings, FiHelpCircle, FiPieChart, FiUser } from "react-icons/fi";
import { AdminContext } from "../store/admin-context";

const Navbar = () => {
  const {sidebarOpen,handleSideClick} = useContext(AdminContext);
  const [loginOpen, setLoginOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)

  const handleLoginClick = () =>{
    setLoginOpen(loginOpen => !loginOpen)
  }

  const handleNotificationClick = () => {
    setNotificationOpen(notificationOpen => !notificationOpen)
  }
  
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg px-4 py-3">
      <a className="sidebar-toggle js-sidebar-toggle" id="toggel" onClick={handleSideClick}>
        <i className="hamburger align-self-center"></i>
      </a>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          {/* Notifications Dropdown */}
          <li className="nav-item dropdown">
            <a className='nav-icon dropdown-toggle'  href="#" id="alertsDropdown" data-bs-toggle="dropdown" onClick={handleNotificationClick}>
              <div className="position-relative">
                <FiBell className="align-middle" />
                <span className="indicator">4</span>
              </div>
            </a>
            <div className={`dropdown-menu notification dropdown-menu-lg dropdown-menu-end py-0 ${notificationOpen ? 'show' : ''} `} aria-labelledby="alertsDropdown">
              <div className="dropdown-menu-header">4 New Notifications</div>
              <div className="list-group">
                <a href="#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <FiAlertCircle className="text-danger" />
                    </div>
                    <div className="col-10">
                      <div className="text-dark">Update completed</div>
                      <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                      <div className="text-muted small mt-1">30m ago</div>
                    </div>
                  </div>
                </a>
                <a href="#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <FiBell className="text-warning" />
                    </div>
                    <div className="col-10">
                      <div className="text-dark">Lorem ipsum</div>
                      <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                      <div className="text-muted small mt-1">2h ago</div>
                    </div>
                  </div>
                </a>
                <a href="#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <FiHome className="text-primary" />
                    </div>
                    <div className="col-10">
                      <div className="text-dark">Login from 192.186.1.8</div>
                      <div className="text-muted small mt-1">5h ago</div>
                    </div>
                  </div>
                </a>
                <a href="#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <FiUserPlus className="text-success" />
                    </div>
                    <div className="col-10">
                      <div className="text-dark">New connection</div>
                      <div className="text-muted small mt-1">Christina accepted your request.</div>
                      <div className="text-muted small mt-1">14h ago</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="dropdown-menu-footer">
                <a href="#" className="text-muted">Show all notifications</a>
              </div>
            </div>
          </li>

          {/* User Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle d-none d-sm-inline-block show" href="#" onClick={handleLoginClick} data-bs-toggle="dropdown">
              <img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1" alt="Charles Hall" />
              <span className="text-dark">Charles Hall</span>
            </a>
            <div className={`dropdown-menu dropdown-menu-end login ${loginOpen ? 'show' : ''}`} >
              <a className="dropdown-item" href="#">
                <FiUser className="align-middle me-1" /> Profile
              </a>
              <a className="dropdown-item" href="#">
                <FiPieChart className="align-middle me-1" /> Analytics
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="index.html">
                <FiSettings className="align-middle me-1" /> Settings & Privacy
              </a>
              <a className="dropdown-item" href="#">
                <FiHelpCircle className="align-middle me-1" /> Help Center
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Log out</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
