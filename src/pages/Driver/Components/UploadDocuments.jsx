import React from "react";
import FormLabel from "../../../General/Label/FormLabel";
import SubmitButton from "../../../General/Buttons/SubmitButton";
import FileInput from "../../../General/Input/FileInput";

const UploadDocuments = ({ agencyDetails, handleChooseFile }) => {

  const disableInputFields = agencyDetails?.carOwnerId === 0 ? true : false
  
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
                <SubmitButton buttonName={"Upload Aadhar front"} isDisabled={disableInputFields}></SubmitButton>
                <SubmitButton buttonName={"Upload Aadhar back"} isDisabled={disableInputFields}></SubmitButton>
                <SubmitButton buttonName={"Upload Pan"} isDisabled={disableInputFields}></SubmitButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
