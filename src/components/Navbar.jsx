import React from "react";
import { FiBell, FiAlertCircle, FiHome, FiUserPlus, FiSettings, FiHelpCircle, FiPieChart, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </a>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          {/* Notifications Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown">
              <div className="position-relative">
                <FiBell className="align-middle" />
                <span className="indicator">4</span>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
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
            <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
              <img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1" alt="Charles Hall" />
              <span className="text-dark">Charles Hall</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
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
