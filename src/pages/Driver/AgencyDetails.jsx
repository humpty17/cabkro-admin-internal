import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import SubmitButton from "../../General/Buttons/SubmitButton";
import {
  AGENCYLIST,
  APICALLFAIL,
  ApiHeaders,
  APINULLERROR,
  DEFAULTDATE,
  EMAILREGEX,
  PHONENOREGEX
} from "../../General/ConstStates";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import EmailInput from "../../General/Input/EmailInput";
import NumberInput from "../../General/Input/NumberInput";
import PasswordInput from "../../General/Input/PasswordInput";
import TypeInput from "../../General/Input/TypeInput";
import FormLabel from "../../General/Label/FormLabel";
import { LoadingContext } from "../../store/loading-context";
import AddWorkLocation from "./Components/AddWorkLocation";
import UploadDocuments from "./Components/UploadDocuments";
import { CurrentPageContext } from "../../store/pages-context";

const AgencyDetails = ({setEditData, editData}) => {
  const agencyObject = {
    "carOwnerId": 0,
    "carOwnerName": "",
    "carOwnerAgencyName": "",
    "phoneNumber": "",
    "email": "",
    "password": "",
    "carOwnerGender": 0,
    "carOwnerDOB": getCurrentDateTime(),
    "isAdult": false,
    "workLocation1": "",
    "workLocation2": "",
    "workLocation3": "",
    "aadharNo": "",
    "panNo": "",
    "currentAddress": "",
    "policeVarification": "",
    "addressLatitude": 0,
    "addressLongitude": 0,
    "workLocation1Latitude": 0,
    "workLocation1Longitude": 0,
    "workLocation2Latitude": 0,
    "workLocation2Longitude": 0,
    "workLocation3Latitude": 0,
    "workLocation3Longitude": 0,
    "available": false,
    "approveStatus": false,
    "isActive": true,
    "createdDate": getCurrentDateTime(),
    "modifyDate": getCurrentDateTime(),
    "isDeleted": true,
    "deletedReason": "",
    "approvedBy": 0,
    "approvedOn": getCurrentDateTime(),
    "aadharImageFront": "",
    "aadharImageBack": "",
    "panImage": "",
    "adharApproval": false,
    "panApproval": false,
    "policeVerificationImage": "",
    "paymentAcceptType": "",
    "walletActive": false,
    "walletBalance": 0,
    "vehicleId1": 0,
    "vehicleId2": 0,
    "vehicleId3": 0,
    "driverId1": 0,
    "driverId2": 0,
    "driverId3": 0,
    "carOwnerImage": "",
    "other1": 0,
    "other2": "",
    "acceptTermsCondition": 0,
    "isUpdate": false,
  };

  const [agencyDetails, setAgencyDetails] = useState({ ...agencyObject });
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const {handlePageClick} = useContext(CurrentPageContext)
  const handleInputChange = (e) => {
    if(e.target.name === "phoneNumber"){
      if(e.target.value.length > 10){
        return
      }
    }
    if (e.target.name === "acceptTermsCondition") {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.checked ? 1 : 0 });
    } else {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.value });
    }
  };

  const validateAgencyDetails = () => {
    if (agencyDetails.carOwnerName === '' || agencyDetails.carOwnerAgencyName === '' || agencyDetails.phoneNumber === '' || agencyDetails.email === '' || agencyDetails.panNo === '' || agencyDetails.password === '' ) {
      NotificationManager.warning('Enter required fields')
      return false
    }
    else if (!PHONENOREGEX.test(agencyDetails.phoneNumber)) {
      NotificationManager.warning("Your phone number is not valid!")
      return false
    }
    if (!EMAILREGEX.test(agencyDetails.email)) {
      NotificationManager.warning("Your email is not valid!")
      return false
    }
    return true
  }

  const handleAgencySubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log(agencyDetails);
    if (!validateAgencyDetails()) return
    startLoading();
    const formData = {
      "userId": 0,
      "userFirstName": agencyDetails.carOwnerName,
      "userLastName": "",
      "carOwnerAgencyName": agencyDetails.carOwnerAgencyName,
      "phoneNo": agencyDetails.phoneNumber,
      "userEmail": agencyDetails.email,
      "password": agencyDetails.password,
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
      "isDeleted": false,
      "deletedReason": "",
      "referCode": "",
      "lastLoginDate": DEFAULTDATE,
      "isAdult": true,
      "noOfRide": 0,
      "isCouponCode": "",
      "other1": 0,
      "other2": "",
      "panNo": agencyDetails.panNo,
      "userImage": "",
      "userType": 1,
      "acceptTermsCondition": agencyDetails.acceptTermsCondition
    }
    
    try {
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL}api/Auth/RegisterUser`,
        { ...formData },
        { ...ApiHeaders }
      );

      if (response) {
        if (response?.data?.code === 200) {
          //GET AGENCY DETAILS BY ID
          fetchCarOwnerDetails(response?.data?.data?.userId)
          
        }
      } else {
        NotificationManager.error(response?.data?.message || APINULLERROR);
        stopLoading();
      }
    } catch (err) {
      NotificationManager.error(APICALLFAIL);
      stopLoading();
    } finally {
      
    }
  };

  const fetchCarOwnerDetails = async(carOwnerId)=>{
    startLoading()
    try{
      const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Data/GetCarOwnerDetailsById/${carOwnerId}`, {},{})
      if(response){
        if(response?.data?.code === 200){
          setAgencyDetails({ ...response?.data?.data?.carOwnerDetails, password: agencyDetails.password });
          NotificationManager.success(
             "Agency Details saved successfully"
          );
        }
        else{
          NotificationManager.error(response?.data?.message || APINULLERROR);
        }
      }
      
      else{
        NotificationManager.error(response?.data?.message || APINULLERROR);
      }
    }
    catch(err){
      NotificationManager.error(APICALLFAIL);
    }
    finally{
      stopLoading()
    }
  }

  const handleChooseFile = async (event, type) => {
    debugger
    console.log("handle choose file")
    startLoading();
    const file = event.target.files[0];
    console.log(file)
    console.log(type)
    const fileFormData = new FormData();
      fileFormData.append("file", file);
      fileFormData.append("FileName", type);
      fileFormData.append("PhoneNo", agencyDetails.phoneNumber);
      fileFormData.append("CarOwnerId", agencyDetails.carOwnerId);
    
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "api/Drivers/UploadFile",
        fileFormData,
        {
          headers: {
            UserType: "1",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        console.log(response.data.code === 200)
        if (response?.data?.code === 200) {
          setAgencyDetails({ ...agencyDetails, [type]: response?.data?.data });
          NotificationManager.success(
            response?.data?.message || "File uploaded successfully"
          );
        }
        else{
          NotificationManager.error(response?.data?.message || APINULLERROR);
        }
      } else {
        NotificationManager.error(response?.data?.message || APINULLERROR);
      }
    } catch (err) {
      NotificationManager.error(APICALLFAIL);
    } finally {
      stopLoading();
    }
  };

  useEffect(()=>{
    if(Object.keys(editData).length > 0){
      setAgencyDetails(editData)
    }
  },[editData])

  const handleUpdateAgencyDetails = async()=>{
    
    startLoading()
    try{
      const response  = await callApi("put", `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateCarOwner/${agencyDetails.carOwnerId}`, {...agencyDetails}, {})
      if(response){
        if(response?.data?.code === 200){
          
          NotificationManager.success(response?.data?.message || "Data updated successfully")
          setAgencyDetails({...response?.data?.data?.carOwnerDetails})
          if(editData){
           setEditData({}) 
           handlePageClick(AGENCYLIST)
          }
        }
        else{
          NotificationManager.error(response?.data?.message || APINULLERROR);
        }
      }
      else{
        NotificationManager.error(response?.data?.message || APINULLERROR);
      }
    }
    catch(err){
      NotificationManager.error(APICALLFAIL);
    }
    finally{
      stopLoading()
    }
  }
  // convertToBase64(event.target.files[0])
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add Agency</h1>

            <div className="row">
              <div className="col-6 col-xl-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Agency details</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleAgencySubmit}>
                      <div className="mb-3 row">
                        <FormLabel label={"Agency Name"}></FormLabel>
                        <TypeInput
                          inputName={"carOwnerAgencyName"}
                          placeholderName={"Agency Name"}
                          valueName={agencyDetails.carOwnerAgencyName}
                          onChangeName={handleInputChange}
                        ></TypeInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Owner Name"}></FormLabel>
                        <TypeInput
                          inputName={"carOwnerName"}
                          placeholderName={"Owner Name"}
                          valueName={agencyDetails.carOwnerName}
                          onChangeName={handleInputChange}
                        ></TypeInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Phone No."}></FormLabel>
                        <NumberInput
                          inputName={"phoneNumber"}
                          placeholderName={"Phone No."}
                          valueName={agencyDetails.phoneNumber}
                          onChangeName={handleInputChange}
                        ></NumberInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Email"}></FormLabel>
                        <EmailInput
                          inputName={"email"}
                          placeholderName={"Email"}
                          valueName={agencyDetails.email}
                          onChangeName={handleInputChange}
                        ></EmailInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Pan No"}></FormLabel>
                        <TypeInput
                          inputName={"panNo"}
                          placeholderName={"Pan No"}
                          valueName={agencyDetails.panNo}
                          onChangeName={handleInputChange}
                        ></TypeInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Password"}></FormLabel>
                        <PasswordInput
                          inputName={"password"}
                          placeholderName={"Password"}
                          valueName={agencyDetails.password}
                          onChangeName={handleInputChange}
                        ></PasswordInput>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          <input
                            type="checkbox"
                            name={"acceptTermsCondition"}
                            className="form-check-input"
                            checked={agencyDetails.acceptTermsCondition === 1 ? true : false}
                            onChange={handleInputChange}
                          />
                          <span className="form-check-label">
                            I have read and agree with{" "}
                            <a href="#">terms & conditions</a>
                          </span>
                        </label>
                      </div>

                      <div className="mb-3 row">
                        <div className="col-sm-9 ms-sm-auto">
                          <SubmitButton
                            buttonName={"Submit"}
                            handleClick={handleAgencySubmit}
                          ></SubmitButton>
                          {/* <button type="submit" className="btn btn-primary"> */}
                          {/* Submit */}
                          {/* </button> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <UploadDocuments agencyDetails={agencyDetails} handleChooseFile={handleChooseFile}  />
            </div>

            <AddWorkLocation agencyDetails={agencyDetails} handleAgencySubmit={handleUpdateAgencyDetails} handleInputChange={handleInputChange}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgencyDetails;

