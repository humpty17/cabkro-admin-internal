import React, { useContext, useEffect, useState } from "react";
import FormLabel from "../../../General/Label/FormLabel";
import TypeInput from "../../../General/Input/TypeInput";
import SubmitButton from "../../../General/Buttons/SubmitButton";
import { APPROVE } from "../../../General/ConstStates";
import { SaveAgencyDetails } from "../AgencyMethods";
import { LoadingContext } from "../../../store/loading-context";
import { CurrentPageContext } from "../../../store/pages-context";

const AddWorkLocation = ({agencyObject,setAgencyAllDetails,op}) => {
  const {startLoading , stopLoading} = useContext(LoadingContext)
  const {currentPage} = useContext(CurrentPageContext)
  const disableInputFields = agencyObject?.carOwnerId === 0 ? true : false

  const [agencyDetails, setAgencyDetails] = useState({...agencyObject})

  useEffect(()=>{
      setAgencyDetails({...agencyObject})
    },[agencyObject])

  const handleInputChange = (e) => {
    setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(agencyDetails)
    SaveAgencyDetails(agencyDetails, startLoading , stopLoading,setAgencyAllDetails,currentPage)
  }

  return (
    <div className="row">
      <div className="col-6 col-xl-6">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Add work Location</h5>
          </div>
          <div className="card-body">
            <div className="mb-3 row">
              <FormLabel label={"Location 1"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Location 1</label> */}

              <TypeInput
                inputName={"workLocation1"}
                placeholderName={"Search Location"}
                valueName={agencyDetails.workLocation1}
                onChangeName={handleInputChange}
                isDisabled={disableInputFields || op===APPROVE ? true : false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Location 2"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Location 2</label> */}

              <TypeInput
                inputName={"workLocation2"}
                placeholderName={"Search Location"}
                valueName={agencyDetails.workLocation2}
                onChangeName={handleInputChange}
                isDisabled={disableInputFields  || op===APPROVE ? true : false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Location 3"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Location 3</label> */}

              <TypeInput
                inputName={"workLocation3"}
                placeholderName={"Search Location"}
                valueName={agencyDetails.workLocation3}
                onChangeName={handleInputChange}
                isDisabled={disableInputFields  || op===APPROVE ? true : false} 
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-9 ms-sm-auto">
              { op===APPROVE ? null :<SubmitButton buttonName={disableInputFields ? "Submit" : "Update"} isDisabled={disableInputFields} handleClick={handleSubmit}></SubmitButton>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkLocation;
