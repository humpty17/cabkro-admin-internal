import { useContext, useState } from "react";
import { NotificationManager } from "react-notifications";
import {
  APICALLFAIL,
  ApiHeaders,
  ApiHeadersMultipart,
  APINULLERROR,
  DEFAULTDATE,
  EMAILREGEX,
  PHONENOREGEX,
} from "../../../General/ConstStates";
import { callApi, getCurrentDateTime } from "../../../General/GeneralMethod";
import { LoadingContext } from "../../../store/loading-context";
import AddWorkLocation from "./AddWorkLocation";
import AgencyDetailsCard from "./AgencyDetailsCard";
import UploadDocuments from "./UploadDocuments";
import axios from "axios";

const AgencyDetails = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const agencyObject = {
    userId: 0,
    userFirstName: "",
    userLastName: "",
    carOwnerAgencyName: "",
    phoneNo: "",
    userEmail: "",
    password: "",
    gender: 0,
    dob: DEFAULTDATE,
    emergencyContactNo: "",
    homeLocation: "",
    workLocation: "",
    workLocation1: "",
    workLocation2: "",
    workLocation3: "",
    workLocation1Latitude: 0,
    workLocation1Longitude: 0,
    workLocation2Latitude: 0,
    workLocation2Longitude: 0,
    workLocation3Latitude: 0,
    workLocation3Longitude: 0,
    paymentMethod: "",
    status: true,
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    isDeleted: true,
    deletedReason: "",
    referCode: "",
    lastLoginDate: DEFAULTDATE,
    isAdult: true,
    noOfRide: 0,
    isCouponCode: "",
    other1: 0,
    other2: "",
    panNo: "",
    userImage: "",
    userType: 1,
    acceptTermsCondition: 0,
  };

  // AGENCY DETAILS STATES
  const [agencyDetails, setAgencyDetails] = useState({ ...agencyObject });

  //HANDLE AGENCT DETAILS CHANGE
  const handleInputChange = (e) => {
    if(e.target.name === "phoneNo"){
      if(e.target.value.length > 10){
        return
      }
    }
    if (e.target.name === "acceptTermsCondition") {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.checked ? 1 : 0});
    } else {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.value });
    }
  };

  const validateAgencyDetails = () => {
    if (agencyDetails.userFirstName === '' || agencyDetails.carOwnerAgencyName === '' || agencyDetails.phoneNo === '' || agencyDetails.userEmail === '' || agencyDetails.panNo === '' || agencyDetails.password === '' ) {
      NotificationManager.warning('Enter required fields')
      return false
    }
    else if (!PHONENOREGEX.test(agencyDetails.phoneNo)) {
      NotificationManager.warning("Your phone number is not valid!")
      return false
    }
    if (!EMAILREGEX.test(agencyDetails.userEmail)) {
      NotificationManager.warning("Your email is not valid!")
      return false
    }
    return true
  }

  // HANDLE AGENECY DETAILS SUMBIT
  const handleAgencySubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log(agencyDetails);
    if (!validateAgencyDetails()) return
    startLoading();
    try {
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL}api/Auth/RegisterUser`,
        { ...agencyDetails },
        { ...ApiHeaders }
      );

      if (response) {
        if (response?.data?.code === 200) {
          setAgencyDetails({ ...response?.data?.data, password: agencyDetails.password });

          NotificationManager.success(
            "Agency register successfully"
          );
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

  const handleFileUpload = async (event, fileName) => {
    //Call API for Image Change
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      console.log(fileName)
      
      startLoading();
      const fileFormData = new FormData();
      fileFormData.append("file", file);
      fileFormData.append("FileName", fileName);
      fileFormData.append("PhoneNo", agencyDetails.phoneNo);
      fileFormData.append("UserId", agencyDetails.userId);
       console.log(fileFormData)
      // return
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "api/Drivers/UploadFile",
          fileFormData,
          {
            headers: {...ApiHeadersMultipart},
          }
        );
        // const response = await callApi("post", `${process.env.REACT_APP_API_URL}api/Drivers/UploadFile`,fileFormData, {...ApiHeadersMultipart})
       
        if (response !== null) {
          if (response.data.code === 200) {
            NotificationManager.success("File Uploaded Successfully");

           
          } else {
            NotificationManager.error("Error while uploading file");
          }
          // stopLoading();
        } else {
          NotificationManager.error("Error while uploading file"|| APINULLERROR);
          // stopLoading();
        }
      } catch (err) {
        NotificationManager.error("Error while uploading file"||APICALLFAIL);
        // stopLoading();
      }
      finally{
        stopLoading()
      }
    }

    // convertToBase64(event.target.files[0])
  };

  
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add Agency</h1>

            <div className="row">
              {/* AGENECY DETAILS */}
              <AgencyDetailsCard agencyDetails={agencyDetails} handleInputChange={handleInputChange} handleAgencySubmit={handleAgencySubmit}></AgencyDetailsCard>
              {/* UPLOAD DOCUMENT */}
              <UploadDocuments agencyDetails={agencyDetails} handleFileUpload={handleFileUpload} />
            </div>
            {/* ADD WORK LOCATION */}
            <AddWorkLocation agencyDetails={agencyDetails} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgencyDetails;
