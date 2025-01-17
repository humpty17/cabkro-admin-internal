import { useContext, useEffect, useState } from "react";
import AgencyDetailsCard from "./AgencyDetailsCard";
import UploadDocuments from "./UploadDocuments";
import AddWorkLocation from "./AddWorkLocation";
import VehicleDetailsCard from "./VehicleDetailsCard";
import { callApi, getCurrentDateTime } from "../../../General/GeneralMethod";
import { APICALLFAIL, ApiHeaders, APINULLERROR, DEFAULTDATE, EDIT } from "../../../General/ConstStates";
import DriverDetailsCard from "./DriverDetailsCard";
import { NotificationManager } from "react-notifications";
import { LoadingContext } from "../../../store/loading-context";

const UpdateAgencyAllDetails = ({ editData, setEditData }) => {
  const vehicleInitialObject = {
    "vehicleId": 0,
    "carOwnerId": 0,
    "phoneNumber": "",
    "email": "",
    "vehicleNumber": "",
    "vehicleType": "",
    "vehicleFuelType": "",
    "vehicleModelName": "",
    "vehicleCompanyName": "",
    "vehicleSeaterCount": 0,
    "registrationCerificate": "",
    "vehicleInsurance": "",
    "vehicleInsuranceExpireDate": DEFAULTDATE,
    "vehicleRegistrationExpireDate": DEFAULTDATE,
    "vehiclePermit": "",
    "available": true,
    "approveStatus": false,
    "isActive": true,
    "createdDate": getCurrentDateTime(),
    "modifyDate": getCurrentDateTime(),
    "isDeleted": false,
    "deletedReason": "",
    "approvedBy": 0,
    "approvedOn": DEFAULTDATE,
    "registrationCertificateImage": "",
    "insuranceCardImage": "",
    "vehiclePermitImage": "",
    "registrationCerificateApproval": true,
    "insuranceApproval": true,
    "vehiclePermitApproval": true,
    "driverId": 0
  }

  const driverObject = {
    "driverId": 0,
    "driverName": "",
    "phoneNumber": "",
    "driverEmail": "",
    "driverGender": 0,
    "driverDOB": DEFAULTDATE,
    "driverLicenseNumber": "",
    "aadharNo": "",
    "panNo": "",
    "policeVarification": "",
    "available": true,
    "approveStatus": false,
    "isActive": true,
    "createdDate": getCurrentDateTime(),
    "modifyDate": getCurrentDateTime(),
    "isDeleted": false,
    "deletedReason": "",
    "approvedBy": 0,
    "approvedOn": DEFAULTDATE,
    "aadharImageFront": "",
    "aadharImageBack": "",
    "driverLicenseImage": "",
    "panImage": "",
    "policeVerificationImage": "",
    "driverImage": "",
    "adharApproval": true,
    "licenceApproval": true,
    "panApproval": true,
    "policeVerificationApproval": true,
    "carOwnerId": 0,
    "vehicleId1": 0,
    "vehicleId2": 0,
    "vehicleId3": 0,
    "otp": 0
  }
  const { startLoading, stopLoading } = useContext(LoadingContext)
  const [agencyAllDetails, setAgencyAllDetails] = useState({});

  useEffect(() => {
    console.log(editData)
    if (Object.keys(editData).length > 0) {
      console.log("edit data", editData)
      setAgencyAllDetails(editData);
    }

  }, [editData]);
  console.log(editData.approveStatus);
  
  const handleVehicleSubmit = async (vehicleData) => {
    console.log(vehicleData)
    if (vehicleData.vehicleId === 0) {
      vehicleData["carOwnerId"] = agencyAllDetails?.carOwnerDetails?.carOwnerId
    }
    startLoading()
    try {
      const response = vehicleData.vehicleId === 0 ? await callApi("post", `${process.env.REACT_APP_API_URL}api/Drivers/AddVehicle`, { ...vehicleData }, { ...ApiHeaders }) : await callApi("put", `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateVehicle/${vehicleData.vehicleId}`, { ...vehicleData }, {})

      console.log(response)
      if (response) {
        if (response?.data?.code === 200) {
          NotificationManager.success(response?.data?.message || "Vehicle updated successfully")
          fetchCarOwnerDetails()
        }
        else{
          stopLoading()
          NotificationManager.error(response?.data?.message || "Error while processing")
        }
      }
      else {
        NotificationManager.error(APINULLERROR)
        stopLoading()
      }
    }
    catch (err) {
      NotificationManager.error(APICALLFAIL)
      stopLoading()
    }
    finally {

    }

  }

  const handleDriverSubmit = async (driverData) => {
   
    if (driverData.driverId === 0) {
      driverData["carOwnerId"] = agencyAllDetails?.carOwnerDetails?.carOwnerId
    }
    startLoading()
    try {
      const response = driverData.driverId === 0 ? await callApi("post", `${process.env.REACT_APP_API_URL}api/Drivers/AddDriver`, { ...driverData }, { ...ApiHeaders }) : await callApi("put", `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateDriver/${driverData.driverId}`, { ...driverData }, {})

      console.log(response)
      if (response) {
        if (response?.data?.code === 200) {
          NotificationManager.success(response?.data?.message || "Driver updated successfully")
          fetchCarOwnerDetails()
        }
        else{
          stopLoading()
          NotificationManager.error(response?.data?.message || "Error while processing")
        }
      }
      else {
        NotificationManager.error(APINULLERROR)
        stopLoading()
      }
    }
    catch (err) {
      NotificationManager.error(APICALLFAIL)
      stopLoading()
    }
    finally {

    }

  }

  const fetchCarOwnerDetails = async () => {
    startLoading()
    try {
      const response = await callApi("get", `${process.env.REACT_APP_API_URL_ADMIN}Data/GetCarOwnerDetailsById/${agencyAllDetails?.carOwnerDetails.carOwnerId}`, {}, {})
      if (response) {
        if (response?.data?.code === 200) {
          setAgencyAllDetails({...response?.data?.data})
        }
        else {
          NotificationManager.error("Could not view agency details")
        }
      }
      else {
        NotificationManager.error(APINULLERROR)
      }
    }
    catch (err) {
      NotificationManager.error(APICALLFAIL)
    }
    finally {
      stopLoading()
    }
  }

  
  const handleAgencySubmit = async (agencyDetails) => {
    try {
      const response =
        agencyDetails.carOwnerId === 0
          ? await callApi(
              "post",
              `${process.env.REACT_APP_API_URL_ADMIN}Data/AddCarOwner`,
              { ...agencyDetails },
              {}
            )
          : await callApi(
              "put",
              `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateCarOwner/${agencyDetails.carOwnerId}`,
              { ...agencyDetails },
              {}
            );

      if (response) {
        if (response?.data?.code === 200) {
          //GET AGENCY DETAILS BY ID
          fetchCarOwnerDetails(response?.data?.data?.carOwnerId);
        } else {
          NotificationManager.error(response?.data?.message);
          stopLoading();
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

const handleApproveAgency = async (agencyDetails) => {
  debugger;
  startLoading();
  try {
    const response = await callApi(
      "put",
      `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateCarOwner/${agencyDetails.carOwnerId}`,
      {...agencyDetails},
      {}
    );
    if (response) {
      if (response?.data?.code === 200) {
        //GET AGENCY DETAILS BY ID
        fetchCarOwnerDetails(response?.data?.data?.carOwnerId);
      } else {
        NotificationManager.error("Could not view agency details");
      }
    } else {
      NotificationManager.error(APINULLERROR);
    }
  } catch (err) {
    NotificationManager.error(APICALLFAIL);
  } finally {
    stopLoading();
  }
};

  return (
    <>
      {Object.keys(agencyAllDetails).length > 0 ? (
        <div className="wrapper">
          <div className="main">
            <main className="content">
              <div className="container-fluid p-0">
                <h1 className="h3 mb-3">Agency </h1>

                <div className="row">
                  <AgencyDetailsCard
                    agencyObject={agencyAllDetails?.carOwnerDetails}
                    handleAgencySubmit={handleAgencySubmit} 
                    handleApproveAgency={handleApproveAgency}
                    op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                  ></AgencyDetailsCard>
                  <UploadDocuments
                    agencyDetails={agencyAllDetails?.carOwnerDetails}
                    fetchCarOwnerDetails={fetchCarOwnerDetails}
                    op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                  />
                </div>

                <AddWorkLocation
                  agencyObject={agencyAllDetails?.carOwnerDetails}
                  handleAgencySubmit={handleAgencySubmit}
                  op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                />


                <div className="row">
                  {[...Array(3)].map((data, index) => (
                    <VehicleDetailsCard cardNo={index + 1} vehicleObject={agencyAllDetails?.vehicleDetails?.[index] ? agencyAllDetails?.vehicleDetails?.[index] : vehicleInitialObject} handleVehicleSubmit={handleVehicleSubmit} op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}></VehicleDetailsCard>
                  ))}
                </div>

                <div className="row">
                  {[...Array(3)].map((data, index) => (
                    <DriverDetailsCard cardNo={index + 1} driverObject={agencyAllDetails?.driverDetails?.[index] ? agencyAllDetails?.driverDetails?.[index] : driverObject} handleDriverSubmit={handleDriverSubmit} op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}></DriverDetailsCard>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UpdateAgencyAllDetails;
