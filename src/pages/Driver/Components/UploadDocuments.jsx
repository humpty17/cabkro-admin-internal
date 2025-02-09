import React, { useContext } from "react";
import DownloadImage from "../../../General/Buttons/DownloadImage";
import {
  APPROVE
} from "../../../General/ConstStates";
import FileInput from "../../../General/Input/FileInput";
import FormLabel from "../../../General/Label/FormLabel";
import { LoadingContext } from "../../../store/loading-context";
import { SubmitChooseFile } from "../AgencyMethods";
import { CurrentPageContext } from "../../../store/pages-context";

const UploadDocuments = ({ agencyDetails, setAgencyAllDetails, op }) => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const {currentPage} = useContext(CurrentPageContext)
  const disableInputFields = agencyDetails?.carOwnerId === 0 ? true : false;


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
              <FileInput
                handleFileUpload={(e) => SubmitChooseFile(e, "AdharFrontImage",agencyDetails.phoneNumber, agencyDetails.carOwnerId, agencyDetails.carOwnerId,startLoading, stopLoading, setAgencyAllDetails,currentPage, "CarOwnerId")}
                isDisabled={disableInputFields || op === APPROVE ? true : false}
                image={agencyDetails?.aadharImageFront ? agencyDetails?.aadharImageFront : null}
              ></FileInput>
              {agencyDetails?.aadharImageFront  ? (
                 <DownloadImage
                 imageUrl={agencyDetails?.aadharImageFront}
                //  handleDownload={handleDownload}
               />
              ) : (
               null
              )}
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Aadhar card back"}></FormLabel>
              <FileInput
                handleFileUpload={(e) => SubmitChooseFile(e, "AdharBackImage", agencyDetails.phoneNumber, agencyDetails.carOwnerId, agencyDetails.carOwnerId,startLoading, stopLoading, setAgencyAllDetails,currentPage, "CarOwnerId")}
                isDisabled={disableInputFields || op === APPROVE ? true : false}
                image={agencyDetails?.aadharImageBack ? agencyDetails?.aadharImageBack : null}
              ></FileInput>
              {agencyDetails?.aadharImageBack  ? (
                <DownloadImage
                imageUrl={agencyDetails?.aadharImageBack}
                // handleDownload={handleDownload}
              />
              ) : (
                null
              )}
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Pan card"}></FormLabel>
              <FileInput
                handleFileUpload={(e) => SubmitChooseFile(e, "PanImage",agencyDetails.phoneNumber, agencyDetails.carOwnerId,agencyDetails.carOwnerId, startLoading, stopLoading, setAgencyAllDetails,currentPage, "CarOwnerId")}
                isDisabled={disableInputFields || op === APPROVE ? true : false}
                image={agencyDetails?.panImage ? agencyDetails?.panImage : null}
              ></FileInput>
              {agencyDetails?.panImage  ? (
                 <DownloadImage
                 imageUrl={agencyDetails?.panImage}
                //  handleDownload={handleDownload}
               />
              ) : (
              null
              )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
