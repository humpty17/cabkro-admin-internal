import { useEffect, useState } from "react";
import SubmitButton from "../../../General/Buttons/SubmitButton";
import FileInput from "../../../General/Input/FileInput";
import NumberInput from "../../../General/Input/NumberInput";
import TypeInput from "../../../General/Input/TypeInput";
import FormLabel from "../../../General/Label/FormLabel";
import { NotificationManager } from "react-notifications";
import { APPROVE } from "../../../General/ConstStates";

const VehicleDetailsCard = ({cardNo, vehicleObject, handleVehicleSubmit, handleChooseFile, handleApproveVehicle, op}) => {
  const disableInputFields = vehicleObject.vehicleId === 0 ? true : false

  const [vehicleDetails, setVehicleDetails] = useState({...vehicleObject})

  useEffect(()=>{
    setVehicleDetails({...vehicleObject})
  },[vehicleObject])
  const handleInputChange = (e)=>{
    setVehicleDetails({...vehicleDetails, [e.target.name]:e.target.value})
  }

  const validate = ()=>{
    if(vehicleDetails.vehicleModelName==''|| vehicleDetails.vehicleType===''|| vehicleDetails.vehicleNumber===''|| vehicleDetails.vehicleFuelType===''|| vehicleDetails.vehicleSeaterCount===''|| vehicleDetails.vehicleSeaterCount === 0){
      NotificationManager.warning("Enter mandatory fields")
      return false
    }
    return true
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!validate()) return
    handleVehicleSubmit(vehicleDetails)
  }

  const handleApprove = (e) => {
    debugger
    e.preventDefault()
    if(!validate()) return
    
    handleApproveVehicle({...vehicleDetails, approveStatus: true})
  }
  return (
    <div className="col-6 col-xl-6">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">{`Vehicle Details ${cardNo}`}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <FormLabel label={"Vehicle Name"}></FormLabel>
              <TypeInput
                inputName={"vehicleModelName"}
                placeholderName={"Vehicle Name"}
                valueName={vehicleDetails.vehicleModelName}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Vehicle Type"}></FormLabel>
              <TypeInput
                inputName={"vehicleType"}
                placeholderName={"Vehicle Type"}
                valueName={vehicleDetails.vehicleType}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Vehicle No."}></FormLabel>
              <TypeInput
                inputName={"vehicleNumber"}
                placeholderName={"Vehicle No."}
                valueName={vehicleDetails.vehicleNumber}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Fuel Type"}></FormLabel>
              <TypeInput
                inputName={"vehicleFuelType"}
                placeholderName={"Fuel Type"}
                valueName={vehicleDetails.vehicleFuelType}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"No of Seat"}></FormLabel>
              <NumberInput
                inputName={"vehicleSeaterCount"}
                placeholderName={"No of Seat"}
                valueName={vehicleDetails.vehicleSeaterCount}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></NumberInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Approve Status"}></FormLabel>
              <TypeInput
                inputName={"approveStatus"}
                placeholderName={"Approve Status"}
                valueName={
                  vehicleDetails.approveStatus === true
                    ? "Approved"
                    : "Not Approved"
                }
                onChangeName={handleInputChange}
                isDisabled={vehicleDetails.approveStatus === true ? true : false}
              ></TypeInput>
            </div>

            <div className="mb-3 row">
              <FormLabel label={"Reg. Certi."}></FormLabel>
              <FileInput
                handleFileUpload={(e) => handleChooseFile(e, "RCImage", "", vehicleDetails?.vehicleId)}
                isDisabled={disableInputFields}
              ></FileInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Insurance"}></FormLabel>
              <FileInput
                handleFileUpload={(e) => handleChooseFile(e, "InsuranceImage", "", vehicleDetails?.vehicleId)}
                isDisabled={disableInputFields}
              ></FileInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Permit"}></FormLabel>
              <FileInput
                handleFileUpload={(e) => handleChooseFile(e, "VehiclePermit", "", vehicleDetails?.vehicleId)}
                isDisabled={disableInputFields}
              ></FileInput>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-9 ms-sm-auto">
                {op === APPROVE ? (
                  <SubmitButton
                    buttonName={"Approve"}
                    handleClick={handleApprove}
                    isDisabled={vehicleDetails.vehicleId !== 0 && vehicleDetails.approveStatus === true ? true : false}
                  />
                ) : (
                  <SubmitButton
                    buttonName={disableInputFields ? "Submit" : "Update"}
                    handleClick={handleSubmit}
                    // isDisabled={agencyDetails.userId !== 0 ? true : false}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsCard;
