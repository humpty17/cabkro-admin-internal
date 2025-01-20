import { useEffect, useState } from "react";
import SubmitButton from "../../../General/Buttons/SubmitButton";
import FileInput from "../../../General/Input/FileInput";
import NumberInput from "../../../General/Input/NumberInput";
import TypeInput from "../../../General/Input/TypeInput";
import FormLabel from "../../../General/Label/FormLabel";
import { NotificationManager } from "react-notifications";
import { APPROVE, PHONENOREGEX } from "../../../General/ConstStates";

const DriverDetailsCard = ({cardNo, driverObject, handleDriverSubmit, handleChooseFile, handleApproveDriver,op}) => {
  const [driverDetails, setDriverDetails] = useState({...driverObject})

  const disableInputFields = driverDetails.driverId === 0 ? true : false

  useEffect(()=>{
    setDriverDetails({...driverObject})
  },[driverObject])
  const handleInputChange = (e)=>{
    if(e.target.name === "phoneNumber"){
      if(e.target.value.length > 10){
        return
      }
    }
    setDriverDetails({...driverDetails, [e.target.name]:e.target.value})
  }

  const validate = () =>{
    if(driverDetails.driverName === '' || driverDetails.phoneNumber===''){
      NotificationManager.warning("Enter mandatory fields")
      return false
    }
    if(!PHONENOREGEX.test(driverDetails.phoneNumber)){
      NotificationManager.warning("Invalid phone number")
      return false
    }
    
    return true
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!validate()) return
    handleDriverSubmit(driverDetails)
  }

  const handleApprove = (e) => {
    e.preventDefault()
    if(!validate()) return
    handleApproveDriver(driverDetails)
  }
  return (
    <div className="col-6 col-xl-6">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">{`Driver Details ${cardNo}`}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <FormLabel label={"Driver Name"}></FormLabel>
              <TypeInput
                inputName={"driverName"}
                placeholderName={"Driver Name"}
                valueName={driverDetails.driverName}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Driver Phone"}></FormLabel>
              <NumberInput
                inputName={"phoneNumber"}
                placeholderName={"Driver Phone"}
                valueName={driverDetails.phoneNumber}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></NumberInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Approv Status"}></FormLabel>
              <TypeInput
                inputName={"approveStatus"}
                placeholderName={"Driver Name"}
                valueName={driverDetails.approveStatus=== true ? "Approved" :  "Not Approved"}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
                
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Driving License"}></FormLabel>
              <FileInput handleFileUpload={(e)=>handleChooseFile(e, "DLImage")} isDisabled={disableInputFields}></FileInput>
            </div>
           
            <div className="mb-3 row">
              <FormLabel label={"Police verification"}></FormLabel>
              <FileInput handleFileUpload={(e)=>handleChooseFile(e, "PVImage")} isDisabled={disableInputFields}></FileInput>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-9 ms-sm-auto">
                {op === APPROVE ? (
                  <SubmitButton
                    buttonName={"Approve"}
                    handleClick={handleApprove}
                    isDisabled={driverDetails.driverId === 0 ? true : false}
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

export default DriverDetailsCard;
