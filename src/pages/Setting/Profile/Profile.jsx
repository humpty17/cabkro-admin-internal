import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import ProfileProgress from "./ProfileProgress";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "Jacqueline Miller",
    email: "hello@gmail.com",
    mobile: "222 555 666",
    nationality: "Paris",
    dob: "29 Aug 1996",
    gender: "Male",
    address: "2119 N Division Ave, New Hampshire, York, United States",
    profilePhoto: "assets/images/avatar/01.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setFormData({ ...formData, profilePhoto: photoURL });
    }
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
  };

  return (
    <div class="vstack gap-4 p-2">
      <ProfileProgress/>
      <div className="card border">
        {/* Card Header */}
        <div className="card-header border-bottom">
          <h4 className="card-header-title">Personal Information</h4>
        </div>

        {/* Card Body */}
        <div className="card-body">
          <form className="row g-3">
            {/* Profile Photo */}
            <div className="col-12">
              <label className="form-label">
                Upload your profile photo<span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <label className="position-relative me-4" title="Replace this pic">
                  <span className="avatar avatar-xl">
                    <img
                      id="uploadfile-1-preview"
                      className="avatar-img rounded-circle border border-white border-3 shadow"
                      src={formData.profilePhoto}
                      alt="Profile"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </span>
                </label>
                <label className="btn btn-sm btn-primary-soft mb-0" htmlFor="uploadfile-1">
                  <FaCamera /> Change
                </label>
                <input
                  id="uploadfile-1"
                  className="form-control d-none"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="col-md-6">
              <label className="form-label">
                Full Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                placeholder="Enter your full name"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">
                Email address<span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                placeholder="Enter your email id"
                onChange={handleChange}
              />
            </div>

            {/* Mobile */}
            <div className="col-md-6">
              <label className="form-label">
                Mobile number<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                placeholder="Enter your mobile number"
                onChange={handleChange}
              />
            </div>

            {/* Nationality */}
            <div className="col-md-6">
              <label className="form-label">
                Nationality<span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              >
                <option value="">Select your country</option>
                <option value="USA">USA</option>
                <option value="Paris">Paris</option>
                <option value="India">India</option>
                <option value="UK">UK</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="col-md-6">
              <label className="form-label">
                Date of Birth<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="dob"
                value={formData.dob}
                placeholder="Enter date of birth"
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <label className="form-label">
                Select Gender<span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-4">
                {["Male", "Female", "Others"].map((gender) => (
                  <div key={gender} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id={`gender-${gender}`}
                      checked={formData.gender === gender}
                      onChange={() => handleGenderChange(gender)}
                    />
                    <label className="form-check-label" htmlFor={`gender-${gender}`}>
                      {gender}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="col-12">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="col-12 text-end">
              <button type="button" className="btn btn-dark" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <UpdatePassword/>
    </div>
  );
};

export default Profile;
