import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password validation and submission logic here
    console.log("Password Updated:", formData);
  };

  return (
    <div className="card border">
      {/* Card Header */}
      <div className="card-header border-bottom">
        <h4 className="card-header-title">Update Password</h4>
        <p className="mb-0">
          Your current email address is{" "}
          <span className="text-primary">example@gmail.com</span>
        </p>
      </div>

      {/* Card Body */}
      <form className="card-body" onSubmit={handleSubmit}>
      <div className="row">
        {/* New Password */}
        <div className="mb-3 col-md-6">
          <label className="form-label">Enter new password</label>
          <div className="input-group">
            <input
              className="form-control"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              id="psw-input"
            />
            {/* <span
              className="input-group-text p-0 bg-transparent cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEye className="p-2" />
              ) : (
                <FaEyeSlash className="p-2" />
              )}
            </span> */}
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="mb-3 col-md-6">
          <label className="form-label">Confirm new password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        </div>
        {/* Submit Button */}
        <div className="text-end">
          <button type="submit" className="btn btn-dark mb-0">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
