import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NotificationManager } from 'react-notifications';
import "react-notifications/lib/notifications.css";
import { EMAILREGEX, PHONENOREGEX } from "../../General/ConstStates";
import { callApi } from "../../General/GeneralMethod";
import DateInput from "../../General/Input/DateInput";
import EmailInput from "../../General/Input/EmailInput";
import NumberInput from "../../General/Input/NumberInput";
import PasswordInput from "../../General/Input/PasswordInput";
import TypeInput from "../../General/Input/TypeInput";
import FormLabel from "../../General/Label/FormLabel";
import { LoadingContext } from "../../store/loading-context";

const AddUserForm = () => {

  const InitialState = {
    userFirstName :'',
    userLastName : '',
    userEmail: '',
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
    if(e.target.name === "phoneNo"){
      if(e.target.value.length > 10){
        return
      }
    }
    setAddData({
      ...addData,
      [e.target.name] : e.target.value
    })
     console.log(typeof e.target.value);
  }
  const validation = () => {
    
    if(addData.userFirstName === '' || addData.userLastName === '' || addData.dob === '' || addData.gender === '' || addData.userEmail === '' || addData.password === '' || addData.phoneNo === ''){
      NotificationManager.warning("Enter required fields")
      return false
    }
    if (!PHONENOREGEX.test(addData.phoneNo)) {
      NotificationManager.warning("Your phone number is not valid!")
      return false
    }
    if(!EMAILREGEX.test(addData.userEmail)){
      NotificationManager.warning("Your email is not valid!")
      return false
    }
    return true
  }

  const handleUserForm = async (event) => {
    event.preventDefault();
    if(!validation()) return
    startLoading();
    
    try {
      const response = await callApi("post", `Auth/RegisterAdminUser`, {...addData}, {});
      stopLoading();

      if (response && response.data) {  // Check for response and response.data
        if (response.data.code === 200) {
          console.log(response.data.data);
          NotificationManager.success(response.data.message)
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

  const handleReset = () =>{
    setAddData({...InitialState})
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
                                inputName={"userFirstName"}
                                placeholderName={"Your first name"}
                                valueName={addData.userFirstName}
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"Last Name"} />
                            <div className="col-sm-8">
                              <TypeInput
                                inputName={"userLastName"}
                                placeholderName={"Your last name"}
                                valueName={addData.userLastName}
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
                                valueName={addData.phoneNo}
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"Email"} />
                            <div className="col-sm-8">
                              <EmailInput
                                inputName={"userEmail"}
                                placeholderName={"Email"}
                                valueName={addData.userEmail}
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
                                    name="gender"
                                    type="radio"
                                    value={"1"}
                                    className="form-check-input"
                                   // defaultChecked={addData.gender}
                                    checked={addData.gender === "1" ? true : false}
                                    onChange={handleChange}
                                  />
                                  <span className="form-check-label">Male</span>
                                </label>
                                <label className="form-check">
                                  <input
                                    name="gender"
                                    type="radio"
                                    value={"2"}
                                   // defaultChecked={addData.gender}
                                    checked={addData.gender === "2" ? true : false}
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
                            <button type="button" className="btn btn-primary" onClick={handleReset}>
                                Reset
                              </button>
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
