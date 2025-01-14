import React, { useContext } from "react";
import FileInput from "../../../General/Input/FileInput";
import FormLabel from "../../../General/Label/FormLabel";
import axios from "axios";
import { LoadingContext } from "../../../store/loading-context";
import { NotificationManager } from "react-notifications";
import { APICALLFAIL, APINULLERROR } from "../../../General/ConstStates";

const UploadDocuments = ({ agencyDetails, fetchCarOwnerDetails }) => {
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const disableInputFields = agencyDetails?.carOwnerId === 0 ? true : false
  
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
          //setAgencyAllDetails({ ...agencyAllDetails, [type]: response?.data?.data });
          // NotificationManager.success(
          //   response?.data?.message || "File uploaded successfully"
          // );
          fetchCarOwnerDetails(agencyDetails.carOwnerId)
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

  return (
    <div className="col-6 col-xl-6">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Upload documents</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3 row">
              <FormLabel label={"Aadhar card front"}></FormLabel>
              <FileInput handleFileUpload={(e)=>handleChooseFile(e, "AdharFrontImage")} isDisabled={disableInputFields}></FileInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Aadhar card back"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Aadhar card back</label> */}
              <FileInput handleFileUpload={(e)=>handleChooseFile(e,"AdharBackImage")} isDisabled={disableInputFields}></FileInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Pan card"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Pan card</label> */}
              <FileInput handleFileUpload={(e)=>handleChooseFile(e,"PanImage")} isDisabled={disableInputFields}></FileInput>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-12 ms-sm-auto">
                {/* <SubmitButton buttonName={"Upload Aadhar front"} isDisabled={disableInputFields}></SubmitButton>
                <SubmitButton buttonName={"Upload Aadhar back"} isDisabled={disableInputFields}></SubmitButton>
                <SubmitButton buttonName={"Upload Pan"} isDisabled={disableInputFields}></SubmitButton> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
