import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import {
  AGENCYLIST,
  APICALLFAIL,
  ApiHeaders,
  APINULLERROR,
  APPROVEDDRIVER,
  APPROVEDVEHICLE,
  DEFAULTDATE,
  EDIT,
} from "../../../General/ConstStates";
import { callApi, getCurrentDateTime } from "../../../General/GeneralMethod";
import { LoadingContext } from "../../../store/loading-context";
import { LoginContext } from "../../../store/login-context";
import { CurrentPageContext } from "../../../store/pages-context";
import AddWorkLocation from "./AddWorkLocation";
import AgencyDetailsCard from "./AgencyDetailsCard";
import DriverDetailsCard from "./DriverDetailsCard";
import UploadDocuments from "./UploadDocuments";
import VehicleDetailsCard from "./VehicleDetailsCard";
import BackButton from "../../../General/Buttons/BackButton";

const UpdateAgencyAllDetails = ({ editData, setEditData, pageName }) => {
  const {user} = useContext(LoginContext);
  const vehicleInitialObject = {
    vehicleId: 0,
    carOwnerId: 0,
    phoneNumber: "",
    email: "",
    vehicleNumber: "",
    vehicleType: "",
    vehicleFuelType: "",
    vehicleModelName: "",
    vehicleCompanyName: "",
    vehicleSeaterCount: 0,
    registrationCerificate: "",
    vehicleInsurance: "",
    vehicleInsuranceExpireDate: DEFAULTDATE,
    vehicleRegistrationExpireDate: DEFAULTDATE,
    vehiclePermit: "",
    available: true,
    approveStatus: true,
    isActive: true,
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    isDeleted: false,
    deletedReason: "",
    approvedBy: user?.userId,
    approvedOn: getCurrentDateTime(),
    registrationCertificateImage: "",
    insuranceCardImage: "",
    vehiclePermitImage: "",
    registrationCerificateApproval: true,
    insuranceApproval: true,
    vehiclePermitApproval: true,
    driverId: 0,
  };

  const driverObject = {
    driverId: 0,
    driverName: "",
    phoneNumber: "",
    driverEmail: "",
    driverGender: 0,
    driverDOB: DEFAULTDATE,
    driverLicenseNumber: "",
    aadharNo: "",
    panNo: "",
    policeVarification: "",
    available: true,
    approveStatus: true,
    isActive: true,
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    isDeleted: false,
    deletedReason: "",
    approvedBy: user?.userId,
    approvedOn: getCurrentDateTime(),
    aadharImageFront: "",
    aadharImageBack: "",
    driverLicenseImage: "",
    panImage: "",
    policeVerificationImage: "",
    driverImage: "",
    adharApproval: true,
    licenceApproval: true,
    panApproval: true,
    policeVerificationApproval: true,
    carOwnerId: 0,
    vehicleId1: 0,
    vehicleId2: 0,
    vehicleId3: 0,
    otp: 0,
  };
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { currcurrentPage, handlePageClick } = useContext(CurrentPageContext);
  const [agencyAllDetails, setAgencyAllDetails] = useState({});

  useEffect(() => {
    console.log(editData);
    if (Object.keys(editData).length > 0) {
      // console.log("edit data", editData);
      setAgencyAllDetails(editData);
    }
  }, [editData]);
  // console.log(editData.approveStatus);

  

  

  // const fetchCarOwnerDetails = async (successMessage) => {
  //   startLoading();
  //   try {
  //     const response = await callApi(
  //       "get",
  //       `${process.env.REACT_APP_API_URL_ADMIN}Data/GetCarOwnerDetailsById/${agencyAllDetails?.carOwnerDetails.carOwnerId}`,
  //       {},
  //       {}
  //     );
  //     if (response) {
  //       if (response?.data?.code === 200) {
  //         console.log(response?.data?.data)
  //         setAgencyAllDetails({ ...response?.data?.data });
  //         NotificationManager.success(successMessage)
  //       } else {
  //         NotificationManager.error("Could not view agency details");
  //       }
  //     } else {
  //       NotificationManager.error(APINULLERROR);
  //     }
  //   } catch (err) {
  //     NotificationManager.error(APICALLFAIL);
  //   } finally {
  //     stopLoading();
  //   }
  // };



  const handleApproveAgency = async (agencyDetails) => {
    startLoading();
    try {
      const response = await callApi(
        "put",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateCarOwner/${agencyDetails.carOwnerId}`,
        { ...agencyDetails, approveStatus: true, approvedOn: getCurrentDateTime(), approvedBy: user?.userId },
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          //GET AGENCY DETAILS BY ID
          NotificationManager.success("Agency approved successfully")
          handlePageClick(AGENCYLIST)
          // fetchCarOwnerDetails(response?.data?.data?.carOwnerId);
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

  const handleApproveDriver = async (agencyDetails) => {
    startLoading();
    try {
      const response = await callApi(
        "put",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateDriver/${agencyDetails?.driverId}`,
        { ...agencyDetails ,approveStatus: true, approvedOn: getCurrentDateTime(), approvedBy: user?.userId},
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          //GET AGENCY DETAILS BY ID
          NotificationManager.success("Driver approved successfully")
          // fetchCarOwnerDetails(response?.data?.data?.driverId);
          handlePageClick(APPROVEDDRIVER);
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

  const handleApproveVehicle = async (vehicleDetails) => {
    debugger
    startLoading();
    try {
      const response = await callApi(
        "put",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateVehicle/${vehicleDetails?.vehicleId}`,
        { ...vehicleDetails,approveStatus: true, approvedOn: getCurrentDateTime(), approvedBy: user?.userId  },
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          //GET AGENCY DETAILS BY ID
          NotificationManager.success("Vehicle approved successfully")
          //fetchCarOwnerDetails(response?.data?.data?.carOwnerId);
          handlePageClick(APPROVEDVEHICLE);
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

  const handleBackClick = () =>{
    // {currentPage  }  
      handlePageClick(editData?.pageName )
    }

  

  return (
    <>
      {Object.keys(agencyAllDetails).length > 0 ? (
        <div className="wrapper">
          <div className="main">
            <main className="content">
              <div className="container-fluid p-0">
                <h1 className="h3 mb-3">Agency Details</h1>
                {Object.keys(editData).length > 0 ? (
                  <BackButton handleBackClick={handleBackClick} />
                ) : null}
                <div className="row">
                  <AgencyDetailsCard
                    agencyObject={agencyAllDetails?.carOwnerDetails}
                    setAgencyAllDetails={setAgencyAllDetails}
                    handleApproveAgency={handleApproveAgency}
                    op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                    
                  ></AgencyDetailsCard>
                  <UploadDocuments
                    agencyDetails={agencyAllDetails?.carOwnerDetails}
                    setAgencyAllDetails={setAgencyAllDetails}
                    op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                  />
                </div>

                <AddWorkLocation
                  agencyObject={agencyAllDetails?.carOwnerDetails}
                  setAgencyAllDetails={setAgencyAllDetails}
                  op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                />

                <div className="row">
                  {[...Array(3)].map((data, index) => (
                    <VehicleDetailsCard
                      key={index}
                      cardNo={index + 1}
                      vehicleObject={
                        agencyAllDetails?.vehicleDetails?.[index]
                          ? agencyAllDetails?.vehicleDetails?.[index]
                          : vehicleInitialObject
                      }
                      carOwnerDetails={agencyAllDetails?.carOwnerDetails}
                      setAgencyAllDetails={setAgencyAllDetails}
                      handleApproveVehicle={handleApproveVehicle}
                      op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                 
                      
                    ></VehicleDetailsCard>
                  ))}
                </div>

                <div className="row">
                  {[...Array(3)].map((data, index) => (
                    <DriverDetailsCard
                    key={index}
                      cardNo={index + 1}
                      driverObject={
                        agencyAllDetails?.driverDetails?.[index]
                          ? agencyAllDetails?.driverDetails?.[index]
                          : driverObject
                      }
                      handleApproveDriver={handleApproveDriver}
                      carOwnerDetails={agencyAllDetails?.carOwnerDetails}
                      setAgencyAllDetails={setAgencyAllDetails}
                      op={agencyAllDetails?.op ? agencyAllDetails?.op : EDIT}
                    ></DriverDetailsCard>
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
