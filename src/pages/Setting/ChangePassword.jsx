import React, { useContext, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { APICALLFAIL, APINULLERROR, LOGINPAGE, UPDATEDATAERROR } from "../../General/ConstStates";
import { callApi } from "../../General/GeneralMethod";
import PasswordInput from "../../General/Input/PasswordInput";
import FormLabel from "../../General/Label/FormLabel";
import { AdminContext } from "../../store/admin-context";
import { LoadingContext } from "../../store/loading-context";
import { LoginContext } from "../../store/login-context";
import Swal from "sweetalert2";
import { CurrentPageContext } from "../../store/pages-context";

const ChangePassword = () => {
  const {user, logout} = useContext(LoginContext)
  const {currentPage, handlePageClick} =useContext(CurrentPageContext)
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { icon, type, handleToggleData } = useContext(AdminContext);
  const [newPassword, setNewPassword] = useState({
    userId: "",
    password: "",
  });
  const [getUser, setGetUser] = useState([]);
  

  const handleUserList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Auth/GetAdminUserList`,
        {},
        {}
      );
      
      if (response) {
        if (response.data.code === 200) {
          setGetUser(response.data.data);
        } else {
          NotificationManager.error(response.data.message);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(APINULLERROR);
      }
    } catch (error) {

      console.error("API call failed:", error);
      NotificationManager.error(APICALLFAIL)
    }
    finally{
      stopLoading()
    }
  };

  useEffect(() => {
    handleUserList();
  }, []);

  const validation = () => {
      
      if(newPassword.userId === '' || newPassword.password === ''){
        NotificationManager.warning("Enter required fields")
        return false
      }
      return true
    }

  const submitChangePassword = async (e) => {
    e.preventDefault();
    if(!validation()) return
    startLoading();
    debugger
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Auth/ChangePassword?UserId=${newPassword.userId}&Password=${newPassword.password}`,
        {},
        {}
      );
      // stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          NotificationManager.success(response?.data?.message || "Password updated successfully");
          if(newPassword.userId === user.userId.toString()){
            Swal.fire({
              "icon": "info",
              "text": "You have changed the password of current logged in user. Please login again!"
              
            }).then((result)=>{

              logout()
              handlePageClick(LOGINPAGE);
            })
          }
          setNewPassword({ userId: "", password: "" });
        } else {
           NotificationManager.error(response?.data?.message || UPDATEDATAERROR);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(APINULLERROR);
      }
    } catch (error) {
     NotificationManager.warning(APICALLFAIL);
    }
    finally{
      stopLoading()
    }
  };

  const handleChangePassword = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Change Password</h1>
            <div className="row">
              <div className="col-12">
                <div className="col-12 col-xl-7">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={submitChangePassword}>
                        <div className="mb-3 row">
                          <label className="col-form-label col-sm-3">
                            Select User
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-select"
                              name="userId"
                              onChange={handleChangePassword}
                            >
                              <option>Select</option>
                              {getUser.map((item, index) => (
                                <option key={item.userId} value={item.userId}>
                                  {item.userFirstName}
                                </option>
                              ))}
                              {/* Add options dynamically as needed */}
                            </select>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <FormLabel label={"New Password"} />
                          <div className="col-sm-9 input-group_1 text-sm-end">
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
