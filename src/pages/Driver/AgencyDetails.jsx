import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import {
  AGENCYLIST,
  APICALLFAIL,
  APINULLERROR,
  EDIT,
  EMAILREGEX,
  PHONENOREGEX
} from "../../General/ConstStates";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { CurrentPageContext } from "../../store/pages-context";
import AddWorkLocation from "./Components/AddWorkLocation";
import AgencyDetailsCard from "./Components/AgencyDetailsCard";
import UploadDocuments from "./Components/UploadDocuments";

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
    "isAdult": true,
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
    "acceptTermsCondition": false,
    "isUpdate": false,
  };

  const [agencyAllDetails, setAgencyAllDetails] = useState({ ...agencyObject });
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const {handlePageClick} = useContext(CurrentPageContext)
  // const handleInputChange = (e) => {
  //   if(e.target.name === "phoneNumber"){
  //     if(e.target.value.length > 10){
  //       return
  //     }
  //   }
  //   if (e.target.name === "acceptTermsCondition") {
  //     setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.checked ? 1 : 0 });
  //   } else {
  //     setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.value });
  //   }
  // };

  

  const handleAgencySubmit = async (agencyDetails) => {
      try {
        const response = agencyDetails.carOwnerId === 0 ? await callApi(
          "post",
          `${process.env.REACT_APP_API_URL_ADMIN}Data/AddCarOwner`,
          { ...agencyDetails },
          {}
        ) : await callApi("put", `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateCarOwner/${agencyDetails.carOwnerId}`, {...agencyDetails}, {});
  
        if (response) {
          if (response?.data?.code === 200) {
            //GET AGENCY DETAILS BY ID
            fetchCarOwnerDetails(response?.data?.data?.carOwnerId)
            
          }
          else{
            NotificationManager.error(response?.data?.message)
            stopLoading()
          }
        } else {
          NotificationManager.error(response?.data?.message || APINULLERROR);
          stopLoading();
        }
      } catch (err) {
        NotificationManager.error(APICALLFAIL);
        stopLoading();
      } finally {
        // stopLoading()
      }
    
  
  
   
  };

  const fetchCarOwnerDetails = async(carOwnerId)=>{
    startLoading()
    try{
      const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Data/GetCarOwnerDetailsById/${carOwnerId}`, {},{})
      if(response){
        if(response?.data?.code === 200){
          setAgencyAllDetails({ ...response?.data?.data?.carOwnerDetails, password: agencyAllDetails.password });
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

  

  useEffect(()=>{
    if(Object.keys(editData).length > 0){
      console.log(editData)
      setAgencyAllDetails({...editData})
    }
  },[editData])

  // convertToBase64(event.target.files[0])
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add Agency</h1>

            <div className="row">
                <AgencyDetailsCard agencyObject={agencyAllDetails} handleAgencySubmit={handleAgencySubmit} op={EDIT}></AgencyDetailsCard>
              <UploadDocuments agencyDetails={agencyAllDetails} fetchCarOwnerDetails={fetchCarOwnerDetails}  op={EDIT}/>
            </div>

            <AddWorkLocation agencyObject={agencyAllDetails} handleAgencySubmit={handleAgencySubmit} op={EDIT}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgencyDetails;

