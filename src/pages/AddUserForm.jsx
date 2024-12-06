import React from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaKey, FaCalendarAlt } from "react-icons/fa";

const AddUserForm = () => {
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add User</h1>
            <div className="row">
              <div className="col-12">
                <div className="card-body">
                  <div className="col-12 col-xl-6">
                    <div className="card">
                      <div className="card-body">
                        <form>
                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaUser className="me-2" /> First Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your first name"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaUser className="me-2" /> Last Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your last name"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaPhoneAlt className="me-2" /> Phone No.
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="8957465342"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaEnvelope className="me-2" /> Email
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaKey className="me-2" /> Password
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaCalendarAlt className="me-2" /> DOB
                            </label>
                            <div className="col-sm-8">
                              <input type="date" className="form-control" />
                            </div>
                          </div>

                          <fieldset className="mb-3">
                            <div className="row">
                              <label className="col-form-label col-sm-3 text-sm-end pt-sm-0">
                                Gender
                              </label>
                              <div className="col-sm-9">
                                <label className="form-check">
                                  <input
                                    name="radio-3"
                                    type="radio"
                                    className="form-check-input"
                                    defaultChecked
                                  />
                                  <span className="form-check-label">Male</span>
                                </label>
                                <label className="form-check">
                                  <input
                                    name="radio-3"
                                    type="radio"
                                    className="form-check-input"
                                  />
                                  <span className="form-check-label">Female</span>
                                </label>
                                <label className="form-check">
                                  <input
                                    name="radio-3"
                                    type="radio"
                                    className="form-check-input"
                                    disabled
                                  />
                                  <span className="form-check-label">Other</span>
                                </label>
                              </div>
                            </div>
                          </fieldset>

                          <div className="mb-3 row">
                            <div className="col-sm-9 ms-sm-auto">
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUserForm;
