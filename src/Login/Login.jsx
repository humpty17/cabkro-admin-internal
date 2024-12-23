import React, { useContext, useState } from "react";
import { FaLock, FaPhone } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { NotificationManager } from "react-notifications";
import { DASHBOARDPAGE, PHONENOREGEX } from '../General/ConstStates';
import { callApi } from "../General/GeneralMethod";
import { LoadingContext } from "../store/loading-context";
import { LoginContext } from "../store/login-context";
import { CurrentPageContext } from "../store/pages-context";
import { AdminContext } from "../store/admin-context";


const Login = () => {
 // const {currentPage,handlePageClick} =useContext(CurrentPageContext)
 const initialState ={
    phoneNo:'',
    password: '',
    rememberMe: false
 }
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const {icon, type, handleToggleData} = useContext(AdminContext)
  const {setCurrentPage} = useContext(CurrentPageContext)
  const {user,login, logout} = useContext(LoginContext)
  const [enteredUserDetail, setEnteredUserDetail] = useState(initialState)

  const handleInputChange = (e)=>{
    setEnteredUserDetail({...enteredUserDetail, [e.target.name]: e.target.value})
  }

  const validate = () =>{
    //Regular expression to match exactly 10 digits
   
    if(enteredUserDetail.phoneNo==="" || enteredUserDetail.password===""){
      NotificationManager.warning("Enter required fields")
      return false
    } 
    if (!PHONENOREGEX.test(enteredUserDetail.phoneNo)) {
      NotificationManager.warning("Your phone number is not valid!")
      return false
    }
    return true
  }

  const handleLoginClick = async (e) =>{
    e.preventDefault()
    //console.log(enteredUserDetail)
    if(!validate()) return
    startLoading()
    const response = await callApi("get", `${process.env.REACT_APP_API_URL_ADMIN}Auth/LoginAdmin?Phone=${enteredUserDetail.phoneNo}&Password=${enteredUserDetail.password}`, {}, {})
    stopLoading()
    if(response!==null && response !==undefined){
      //console.log(response)
      if(response.data.code === 200){
        // console.log(response.data.data)
        login(response.data.data)
        setCurrentPage(DASHBOARDPAGE)
      }
      else{
        NotificationManager.error(response.data.message)
      }
    }
    else{
      //notification manager error
      NotificationManager.error(response.data.message)
    }
  }

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome back!</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Phone No</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaPhone />
                          </span>
                          <input
                            className="form-control form-control-lg"
                            type="number"
                            name="phoneNo"
                            id="phoneNo"
                            placeholder="Enter your phone no"
                            value={enteredUserDetail.length > 10 ? validate() : enteredUserDetail.phoneNo}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock />
                          </span>
                          <input
                            className="form-control form-control-lg"
                            type={type}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={enteredUserDetail.password}
                            onChange={handleInputChange}
                          />
                          <span className="input-group-text" onClick={handleToggleData}>
                          {icon }
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="form-check align-items-center">
                          <input
                            id="customControlInline"
                            type="checkbox"
                            className="form-check-input"
                            checked={enteredUserDetail.rememberMe}                           
                            name="rememberMe"                            
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label text-small"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary"
                          onClick={handleLoginClick}
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="text-center mb-3">
                Don't have an account?{" "}
                <a onClick={handleSignUpClick}>Sign up</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
