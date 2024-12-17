import React from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

const ProfileProgress = () => {
  const progressPercentage = 85;

  return (
    <div className="bg-light rounded p-3">
      {/* Progress Bar Section */}
      <div className="overflow-hidden">
        <h6>Complete Your Profile</h6>
        <div
          className="progress progress-sm bg-success bg-opacity-10"
          style={{ height: "10px" }}
        >
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span className="progress-percent-simple h6 fw-light ms-auto">
              {progressPercentage}%
            </span>
          </div>
        </div>
        <p className="mb-0">
          Get the best out of booking by adding the remaining details!
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-body rounded p-3 mt-3">
        <ul className="list-inline d-flex flex-wrap gap-2 justify-content-between mb-0">
          {/* Verified Email */}
          <li className="list-inline-item h6 fw-normal mb-0">
            <a href="#" className="text-success text-decoration-none">
              <FaCheckCircle className="me-2" />
              Verified Email
            </a>
          </li>

          {/* Verified Mobile Number */}
          <li className="list-inline-item h6 fw-normal mb-0">
            <a href="#" className="text-success text-decoration-none">
              <FaCheckCircle className="me-2" />
              Verified Mobile Number
            </a>
          </li>

          {/* Complete Basic Info */}
          <li className="list-inline-item h6 fw-normal mb-0">
            <a href="#" className="text-primary text-decoration-none">
              <FaPlusCircle className="me-2" />
              Complete Basic Info
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileProgress;
