import SubmitButton from "../../../General/Buttons/SubmitButton";
import FileInput from "../../../General/Input/FileInput";
import NumberInput from "../../../General/Input/NumberInput";
import TypeInput from "../../../General/Input/TypeInput";
import FormLabel from "../../../General/Label/FormLabel";

const DriverDetailsCard = ({cardNo, driverDetails, handleDriverSubmit, handleInputChange, handleChooseFile}) => {

  const disableInputFields = driverDetails.driverId === 0 ? true : false
  return (
    <div className="col-6 col-xl-6">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">{`Driver Details ${cardNo}`}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleDriverSubmit}>
            <div className="mb-3 row">
              <FormLabel label={"Driver Name"}></FormLabel>
              <TypeInput
                inputName={"driverName"}
                placeholderName={"Driver Name"}
                valueName={driverDetails.driverName}
                onChangeName={handleInputChange}
                
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Driver Phone"}></FormLabel>
              <NumberInput
                inputName={"phoneNumber"}
                placeholderName={"Driver Phone"}
                valueName={driverDetails.phoneNumber}
                onChangeName={handleInputChange}
              ></NumberInput>
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
                <SubmitButton
                   buttonName={disableInputFields ? "Submit" : "Update"}
                  handleClick={handleDriverSubmit}
                  // isDisabled={agencyDetails.userId !== 0 ? true : false}
                ></SubmitButton>
                {/* <button type="submit" className="btn btn-primary"> */}
                {/* Submit */}
                {/* </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsCard;
