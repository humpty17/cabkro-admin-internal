import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AdminContext } from "../../store/admin-context";
import { LoadingContext } from "../../store/loading-context";
import PasswordInput from "../../General/Input/PasswordInput";
import FormLabel from "../../General/Label/FormLabel";
import { callApi } from "../../General/GeneralMethod";
import { NotificationManager } from "react-notifications";
import { log10 } from "chart.js/helpers";

const ChangePassword = () => {
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const {icon, type, handleToggleData} = useContext(AdminContext)
  const [newPassword, setNewPassword] = useState({
    userId : '',
    password : ''
  })
  const [getUser, setGetUser] = useState([])
  console.log(getUser);
  
  const handleUserList = async() =>{
    startLoading();
        try {
          const response = await callApi(
            "get",
            `${process.env.REACT_APP_API_URL_ADMIN}Auth/GetAdminUserList`,
            {},
            {}
          );
          stopLoading();
          if (response !== null && response !== undefined) {
            if (response.data.code === 200) {
              setGetUser(response.data.data);
            } else {
              NotificationManager.error(response.data.message);
            }
          } else {
            console.error("API returned an invalid response:", response);
            NotificationManager.warning(response.data.message);
          }
        } catch (error) {
          console.error("API call failed:", error);
        }
      };
    
      useEffect(() => {
        handleUserList();
      }, []);
 
  const submitChangePassword = async(e) =>{
    e.preventDefault()
      startLoading();
      try {
        const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Auth/ChangePassword?UserId=${newPassword.userId}&Password=${newPassword.password}`,{},{});
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response.data.code === 200) {
            //console.log(bookingData)
            setNewPassword({ userId : '',
              password : ''})
          } else {
            NotificationManager.error(response.data.message);
          }
        } else {
          console.error("API returned an invalid response:", response);
          NotificationManager.warning(response.data.message);
        }
      } catch (error) {
        console.error("API call failed:", error);
      } 
    }

  const handleChangePassword = (e) =>{
    setNewPassword({
      ...newPassword,
      [e.target.name] : e.target.value
    })
    //console.log(e.target.value);
  }

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Change Password</h1>
            <div className="row">
              <div className="col-12">
                <div className="col-12 col-xl-6">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={submitChangePassword}>
                        <div className="mb-3 row">
                          <label className="col-form-label col-sm-3 text-sm-end">
                            Select User
                          </label>
                          <div className="col-sm-8">
                            <select
                              className="form-select"
                              name="userId"
                              onChange={handleChangePassword}
                            >
                              <option>Select</option>
                              {getUser.map((item, index) => (
                                <option
                                  key={item.userId}
                                  value={item.userId}
                                >
                                  {item.userFirstName}
                                </option>
                              ))}
                              {/* Add options dynamically as needed */}
                            </select>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <FormLabel label={"New Password"} />
                          <div className="col-sm-8 input-group_1">
                            <PasswordInput
                              type={type}
                              inputName={"password"}
                              placeholderName={"Enter new password"}
                              valueName={newPassword.password}
                              onChangeName={handleChangePassword}
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
                          <div className="col-sm-9 ms-sm-auto">
                            <button type="submit" className="btn btn-primary">
                              Change Password
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
        </main>
      </div>
    </div>
  );
};

export default ChangePassword;
