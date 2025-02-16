import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NotificationManager } from 'react-notifications';
import "react-notifications/lib/notifications.css";
import { ApiHeader, APINULLERROR, CUSTOMERLIST, DEFAULTDATE, EMAILREGEX, PHONENOREGEX } from "../../General/ConstStates";
import { callApi, getCurrentDate, getCurrentDateTime } from "../../General/GeneralMethod";
import DateInput from "../../General/Input/DateInput";
import EmailInput from "../../General/Input/EmailInput";
import NumberInput from "../../General/Input/NumberInput";
import PasswordInput from "../../General/Input/PasswordInput";
import TypeInput from "../../General/Input/TypeInput";
import FormLabel from "../../General/Label/FormLabel";
import { LoadingContext } from "../../store/loading-context";
import SubmitButton from "../../General/Buttons/SubmitButton";
import ResetButton from "../../General/Buttons/ResetButton";
import { CurrentPageContext } from "../../store/pages-context";
import BackButton from "../../General/Buttons/BackButton";

const AddCustomer = ({editData, setEditData}) => {
  const InitialState = {
    
    "userFirstName": "",
    "userLastName": "",
    "carOwnerAgencyName": "",
    "phoneNo": "",
    "userEmail": "",
    "password": "",
    "gender": 0,
    "dob": DEFAULTDATE,
    "emergencyContactNo": "",
    "homeLocation": "",
    "workLocation": "",
    "workLocation1": "",
    "workLocation2": "",
    "workLocation3": "",
    "workLocation1Latitude": 0,
    "workLocation1Longitude": 0,
    "workLocation2Latitude": 0,
    "workLocation2Longitude": 0,
    "workLocation3Latitude": 0,
    "workLocation3Longitude": 0,
    "paymentMethod": "",
    "status": true,
    "createdDate": getCurrentDateTime(),
    "modifyDate": getCurrentDateTime(),
    "isDeleted": true,
    "deletedReason": "",
    "referCode": "",
    "lastLoginDate": getCurrentDateTime(),
    "isAdult": true,
    "noOfRide": 0,
    "isCouponCode": "",
    "other1": 0,
    "other2": "",
    "panNo": "",
    "userImage": "",
    "userType": 0,
    "acceptTermsCondition": 0
  };
  

  const {startLoading, stopLoading} = useContext(LoadingContext)
  const {handlePageClick} =useContext(CurrentPageContext)
  const [addCustomer, setAddCustomer] = useState(InitialState);

  const handleChange = (e) =>{
    if(e.target.name === "phoneNo"){
      if(e.target.value.length > 10){
        return
      }
    }
    //console.log(e)
    setAddCustomer({
      ...addCustomer,
      [e.target.name] : e.target.value
    })
     //console.log(typeof e.target.value);
  }

   const validation = () => {
      
      if(addCustomer.userFirstName === '' || addCustomer.userLastName === '' || addCustomer.dob === '' || addCustomer.gender === '' || addCustomer.userEmail === '' || addCustomer.phoneNo === ''){
        NotificationManager.warning("Enter required fields")
        return false
      }
      if (!PHONENOREGEX.test(addCustomer.phoneNo)) {
        NotificationManager.warning("Your phone number is not valid!")
        return false
      }
      if(!EMAILREGEX.test(addCustomer.userEmail)){
        NotificationManager.warning("Your email is not valid!")
        return false
      }
      return true
    }

  const handleCustomerForm = async (event) => {
      event.preventDefault();
      if(!validation()) return
      startLoading();
      //console.log(addCustomer)
      try {
        const response =
          addCustomer.userId === 0
            ? await callApi(
                "post",
                `${process.env.REACT_APP_API_URL}api/Auth/RegisterUser`,
                { ...addCustomer },
                { ...ApiHeader }
              )
            : await callApi(
                "post",
                `${process.env.REACT_APP_API_URL}api/Auth/UpdateUser`,
                { ...addCustomer },
                { ...ApiHeader }
              );
        stopLoading();

        if (response && response.data) {
          stopLoading(); // Check for response and response.data
          if (response.data.code === 200) {
            //console.log(response.data.data);
            NotificationManager.success(response.data.message);
            setEditData({});
            handlePageClick(CUSTOMERLIST);
          } else {
            console.error("API Error:", response.data.code, response.data);
            NotificationManager.error(response.data.message);
          }
        } else {
          stopLoading();
          console.error("API returned an invalid response:", response);
          NotificationManager.warning(response.data.message);
        }
      } catch (error) {
        console.error("API call failed:", error);
        NotificationManager.warning(APINULLERROR);
      }
    };

  const handleReset = () =>{
    setAddCustomer({...InitialState})
    setEditData({})
  }

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      // console.log(editData)
      setAddCustomer({
        ...editData,
        dob: editData.dob.split("T")[0],
        gender: editData.gender.toString(),
        phoneNo:editData.phoneNo.replace("+91",""),
        acceptTermsCondition: editData.acceptTermsCondition === true ? 1 : 0 
      });
    }
  }, [editData]);

  const handleBackClick = () =>{
    
  }
    
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">{Object.keys(editData).length > 0 ?"Update Customer" : "Add Customer"}</h1>
            {Object.keys(editData).length > 0 ? (
              <BackButton handleBackClick={handleBackClick} />
            ) : null}

            <div className="row">
              <div className="col-12">
                <div className="card-body">
                  <div className="col-12 col-xl-6">
                    <div className="card">
                      <div className="card-body">
                        <form onSubmit={handleCustomerForm}>
                          <div className="mb-3 row">
                            <FormLabel label={"First Name"} />
                            <div className="col-sm-8">
                              <TypeInput
                                inputName={"userFirstName"}
                                placeholderName={"Your first name"}
                                valueName={addCustomer.userFirstName}
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
                                valueName={addCustomer.userLastName}
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
                                valueName={addCustomer.phoneNo}
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
                                valueName={addCustomer.userEmail}
                                onChangeName={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <FormLabel label={"DOB"} />
                            <div className="col-sm-8">
                              <DateInput
                                inputName={"dob"}
                                maxName={getCurrentDate()}
                                valueName={addCustomer.dob}
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
                                   // defaultChecked={addCustomer.gender}
                                    checked={addCustomer.gender === "1" ? true : false}
                                    onChange={handleChange}
                                  />
                                  <span className="form-check-label">Male</span>
                                </label>
                                <label className="form-check">
                                  <input
                                    name="gender"
                                    type="radio"
                                    value={"2"}
                                   // defaultChecked={addCustomer.gender}
                                    checked={addCustomer.gender === "2" ? true : false}
                                    className="form-check-input"
                                    onChange={handleChange}
                                  />
                                  <span className="form-check-label">
                                    Female
                                  </span>
                                </label>
                                
                              </div>
                            </div>
                          </fieldset>

                          <div className="mb-3 row">
                            <div className="col-sm-9 ms-sm-auto">
                            <ResetButton onHandleClick={handleReset}/>
                              <SubmitButton buttonName={"Submit"}/>
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
  )
}

export default AddCustomer