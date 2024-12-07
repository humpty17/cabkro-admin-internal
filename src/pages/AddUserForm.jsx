import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaKey, FaCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { LoadingContext } from "../store/loading-context";
import { callApi } from "../General/GeneralMethod";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import FormLabel from "../General/Label/FormLabel";
import TypeInput from "../General/Input/TypeInput";
import NumberInput from "../General/Input/NumberInput";
import EmailInput from "../General/Input/EmailInput";
import PasswordInput from "../General/Input/PasswordInput";
import DateInput from "../General/Input/DateInput";

const AddUserForm = () => {

  const InitialState = {
    firstName :'',
    lastName : '',
    email: '',
    password: '',
    phoneNo : '',
    dob : '',
    gender: 0
  };
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [addData, setAddData] = useState(InitialState);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<FaEyeSlash/>); 
  
  const handleChange = (e) =>{
    setAddData({
      ...addData,
      [e.target.name] : e.target.value
    })
     console.log(e.target.value);
  }
  const validation = () => {
    const regex = /^\d{10}$/;
    if(addData.firstName === '' || addData.lastName === '' || addData.dob === '' || addData.gender === '' || addData.email === '' || addData.password === '' || addData.phoneNo === ''){
      NotificationManager.warning("Enter required fields")
      return false
    }
    if (!regex.test(addData.phoneNo)) {
      NotificationManager.warning("Your phone number is not valid!")
      return false
    }
    return true
  }

  const handleUserForm = async (event) => {
    event.preventDefault();
    if(!validation()) return
    startLoading();
    
    try {
      const response = await callApi("post", `Auth/RegisterAdminUser`, {
        userFirstName: addData.firstName,
        userLastName: addData.lastName,
        phoneNo: addData.phoneNo,
        userEmail: addData.email,
        password: addData.password,
        gender: addData.gender,
        dob: addData.dob
      }, {});

      stopLoading();

      if (response && response.data) {  // Check for response and response.data
        if (response.data.code === 200) {
          console.log(response.data.data);
          NotificationManager.succes(response.data.message)
        } else {
          console.error("API Error:", response.data.code, response.data);
          NotificationManager.error(response.data.message)
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(response.data.message)
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  
  const handleToggleData = () => {
    if (type==='password'){
       setIcon(<FaEye/>);
       setType('text')
    } else {
       setIcon(<FaEyeSlash/>)
       setType('password')
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
                            <FormLabel label={"First Name"} />
                            <div className="col-sm-8">
                              <TypeInput
                                inputName={"firstName"}
                                placeholderName={"Your first name"}
                                valueName={addData.firstName}
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"Last Name"} />
                            <div className="col-sm-8">
                              <TypeInput
                                inputName={"lastName"}
                                placeholderName={"Your last name"}
                                valueName={addData.lastName}
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"Phone No."} />
                            <div className="col-sm-8">
                              <NumberInput
                                inputName={"phoneNo"}
                                placeholderName={"8957465342"}
                                valueName={
                                  addData.length > 10
                                    ? validation()
                                    : addData.phoneNo
                                }
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"Email"} />
                            <div className="col-sm-8">
                              <EmailInput
                                inputName={"email"}
                                placeholderName={"Email"}
                                valueName={addData.email}
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"Password"} />
                            <div className="col-sm-8 input-group_1">
                              <PasswordInput
                                type={type}
                                inputName={"password"}
                                placeholderName={"Password"}
                                valueName={addData.password}
                                onChangeName={handleChange}
                              />
                              <span
                              className="input-group-text"
                              onClick={handleToggleData}
                            >
                              {icon}
                            </span>
                            </div>
                            
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"DOB"} />
                            <div className="col-sm-8">
                              <DateInput
                                inputName={"dob"}
                                maxName={"2024-12-31"}
                                valueName={addData.dob}
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <fieldset className="mb-3">
                            <div className="row">
                              <FormLabel label={"Gender"} />
                              <div className="col-sm-9">
                                <label className="form-check">
                                  <input
                                    name="radio-3"
                                    type="radio"
                                    value="0"
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
                                    value="0"
                                    defaultChecked={addData.gender}
                                    className="form-check-input"
                                    onChange={handleChange}
                                  />
                                  <span className="form-check-label">
                                    Female
                                  </span>
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
