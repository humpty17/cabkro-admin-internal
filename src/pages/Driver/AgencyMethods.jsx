import { NotificationManager } from "react-notifications";
import { ADDAGENCY, APICALLFAIL, ApiHeaders, APINULLERROR } from "../../General/ConstStates";
import { callApi } from "../../General/GeneralMethod";
import axios from "axios";

export const fetchCarOwnerDetails = async(carOwnerId, setAgencyAllDetails, startLoading, stopLoading,currentPage)=>{
    startLoading()
    try{
      const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Data/GetCarOwnerDetailsById/${carOwnerId}`, {},{})
      if(response){
        if(response?.data?.code === 200){
          if(currentPage === ADDAGENCY){
            setAgencyAllDetails({ ...response?.data?.data?.carOwnerDetails });
          }
          else{
            setAgencyAllDetails({ ...response?.data?.data });
          }
          // NotificationManager.success(
          //    "Agency Details saved successfully"
          // );
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

export const SaveAgencyDetails = async (agencyDetails, startLoading, stopLoading, setAgencyAllDetails,currentPage) => {
    startLoading()
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
          //setAgencyAllDetails({ ...response?.data?.data });
       

           fetchCarOwnerDetails(response?.data?.data?.carOwnerId, setAgencyAllDetails, startLoading, stopLoading,currentPage)
           NotificationManager.success(
            "Agency Details saved successfully"
         );
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
       stopLoading()
    }
  


 
};

export const SubmitChooseFile = async(event, type, phoneNumber, carOwnerId, Id ,startLoading, stopLoading, setAgencyAllDetails,currentPage, IdName) =>{
  event.preventDefault();
      startLoading();
      const file = event.target.files[0];
      const fileFormData = new FormData();
      fileFormData.append("file", file);
      fileFormData.append("FileName", type);
      fileFormData.append("PhoneNo", phoneNumber);
      fileFormData.append(IdName, Id);
  
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
          console.log(response.data.code === 200);
          if (response?.data?.code === 200) {
            fetchCarOwnerDetails(carOwnerId, setAgencyAllDetails, startLoading, stopLoading,currentPage);
            NotificationManager.success(
              "Agency Details saved successfully"
           );
          } else {
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
}


export const SaveVehicleDetails = async (vehicleData, carOwnerId, startLoading, stopLoading, setAgencyAllDetails, currentPage) => {
    console.log(vehicleData);
    
    startLoading();
    try {
      const response =
        vehicleData.vehicleId === 0
          ? await callApi(
              "post",
              `${process.env.REACT_APP_API_URL}api/Drivers/AddVehicle`,
              { ...vehicleData },
              { ...ApiHeaders }
            )
          : await callApi(
              "put",
              `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateVehicle/${vehicleData.vehicleId}`,
              { ...vehicleData },
              {}
            );

      console.log(response);
      if (response) {
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "Vehicle updated successfully"
          );
          fetchCarOwnerDetails(carOwnerId, setAgencyAllDetails, startLoading, stopLoading,currentPage);
        } else {
          stopLoading();
          NotificationManager.error(
            response?.data?.message || "Error while processing"
          );
        }
      } else {
        NotificationManager.error(APINULLERROR);
        stopLoading();
      }
    } catch (err) {
      NotificationManager.error(APICALLFAIL);
      stopLoading();
    } finally {
    }
  };

  export const SaveDriverDetails = async (driverData,carOwnerId, startLoading, stopLoading, setAgencyAllDetails, currentPage) => {
    debugger
    startLoading();
    try {
      const response =
        driverData.driverId === 0
          ? await callApi(
              "post",
              `${process.env.REACT_APP_API_URL}api/Drivers/AddDriverAdmin`,
              { ...driverData },
              { ...ApiHeaders }
            )
          : await callApi(
              "put",
              `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateDriver/${driverData.driverId}`,
              { ...driverData },
              {}
            );

      console.log(response);
      if (response) {
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "Driver updated successfully"
          );
          fetchCarOwnerDetails(carOwnerId, setAgencyAllDetails, startLoading, stopLoading,currentPage);
        } else {
          stopLoading();
          NotificationManager.error(
            response?.data?.message || "Error while processing"
          );
        }
      } else {
        NotificationManager.error(APINULLERROR);
        stopLoading();
      }
    } catch (err) {
      NotificationManager.error(APICALLFAIL);
      stopLoading();
    } finally {
    }
  };