import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaKey, FaCalendarAlt } from "react-icons/fa";
import { LoadingContext } from "../store/loading-context";
import { callApi } from "../General/GeneralMethod";

const AddUserForm = () => {

  const InitialState = {
    firstName :'',
    lastName : '',
    email: '',
    password: '',
    phoneNo : '',
    gender: ''
  };
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [addData, setAddData] = useState(InitialState);
  const [date, setDate] = useState(null);
  
  const handleChange = (e) =>{
    setAddData({
      ...addData,
      [e.target.name] : e.target.value
    })
     console.log(e.target.value);
  }

  const handleDateChange = (e) =>{
    const date = new Date(e.target.value); 
    const formattedDate = date.toISOString().slice(0, 10);
    setDate(formattedDate)
  }

  const handleUserForm = (event) =>{
    event.preventDefault();

    startLoading();
    const response = callApi("post", `Auth/RegisterAdminUser`, {
      userFirstName : addData.firstName,
      userLastName : addData.lastName,
      phoneNo : addData.phoneNo,
      userEmail : addData.email,
      password : addData.password,
      gender : addData.gender,
      dob : date
    }, { })
    stopLoading();

    if(response!==null && response !==undefined){
      if(response.data.code === 200){
        console.log(response.data.data)
      }
    }
  }
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
                        <form onSubmit={handleUserForm}>
                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaUser className="me-2" /> First Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="Your first name"
                                value={addData.firstName}
                                onChange={handleChange}
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
                                name="lastName"
                                className="form-control"
                                placeholder="Your last name"
                                value={addData.lastName}
                                onChange={handleChange}
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
                                name="phoneNo"
                                className="form-control"
                                placeholder="8957465342"
                                value={addData.phoneNo}
                                onChange={handleChange}
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
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={addData.email}
                                onChange={handleChange}
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
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={addData.password}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-3 text-sm-end">
                              <FaCalendarAlt className="me-2" /> DOB
                            </label>
                            <div className="col-sm-8">
                              <input type="date" name="dob" className="form-control" value={date} onChange={handleDateChange}/>
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
                                    value='male'
                                    className="form-check-input"
                                    defaultChecked={addData.gender}
                                    onChange={handleChange} 
                                  />
                                  <span className="form-check-label">Male</span>
                                </label>
                                <label className="form-check">
                                  <input
                                    name="radio-3"
                                    type="radio"
                                    value='female'
                                    checked={addData.gender} 
                                    className="form-check-input"
                                    onChange={handleChange} 
                                  />
                                  <span className="form-check-label">Female</span>
                                </label>
                                {/* <label className="form-check">
                                  <input
                                    name="radio-3"
                                    type="radio"
                                    value='option3'
                                    className="form-check-input"
                                    disabled
                                  />
                                  <span className="form-check-label">Other</span>
                                </label> */}
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
