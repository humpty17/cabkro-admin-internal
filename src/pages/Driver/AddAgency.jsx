import { useContext, useEffect, useState } from "react";
import BackButton from "../../General/Buttons/BackButton";
import {
  AGENCYLIST,
  DEFAULTDATE,
  EDIT
} from "../../General/ConstStates";
import { getCurrentDateTime } from "../../General/GeneralMethod";
import { LoginContext } from "../../store/login-context";
import { CurrentPageContext } from "../../store/pages-context";
import AddWorkLocation from "./Components/AddWorkLocation";
import AgencyDetailsCard from "./Components/AgencyDetailsCard";
import UploadDocuments from "./Components/UploadDocuments";

const AddAgency = ({setEditData, editData}) => {
 
  const {user} = useContext(LoginContext)
  const agencyObject = {
    "carOwnerId": 0,
    "carOwnerName": "",
    "carOwnerAgencyName": "",
    "phoneNumber": "",
    "email": "",
    "password": "",
    "carOwnerGender": 0,
    "carOwnerDOB": DEFAULTDATE,
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
    "available": true,
    "approveStatus": true,
    "isActive": true,
    "createdDate": getCurrentDateTime(),
    "modifyDate": getCurrentDateTime(),
    "isDeleted": false,
    "deletedReason": "",
    "approvedBy": user?.userId || 0 ,
    "approvedOn": getCurrentDateTime(),
    "aadharImageFront": "",
    "aadharImageBack": "",
    "panImage": "",
    "adharApproval": true,
    "panApproval": true,
    "policeVerificationImage": "",
    "paymentAcceptType": "",
    "walletActive": true,
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
  
  const {handlePageClick} = useContext(CurrentPageContext)
 


  useEffect(()=>{
    if(Object.keys(editData).length > 0){
      // console.log(editData)
      setAgencyAllDetails({...editData})
    }
    else{
      setAgencyAllDetails({...agencyObject})
    }
  },[editData])

  const handleBackClick = () =>{
    debugger
    handlePageClick(AGENCYLIST)
    setEditData({})
    setAgencyAllDetails({...agencyObject})
  }

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add Agency</h1>
            {Object.keys(editData).length > 0 ? (
                  <BackButton handleBackClick={handleBackClick} />
                ) : null}
            <div className="row">
                <AgencyDetailsCard agencyObject={agencyAllDetails} setAgencyAllDetails={setAgencyAllDetails} op={EDIT}></AgencyDetailsCard>
              <UploadDocuments agencyDetails={agencyAllDetails} setAgencyAllDetails={setAgencyAllDetails}  op={EDIT}/>
            </div>

            <AddWorkLocation agencyObject={agencyAllDetails} setAgencyAllDetails={setAgencyAllDetails} op={EDIT}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddAgency;

