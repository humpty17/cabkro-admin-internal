import React, { useState } from "react";
import FormLabel from "../../../General/Label/FormLabel";
import TypeInput from "../../../General/Input/TypeInput";
import SubmitButton from "../../../General/Buttons/SubmitButton";

const AddWorkLocation = ({agencyDetails,handleInputChange,handleAgencySubmit}) => {
 

  const disableInputFields = agencyDetails?.carOwnerId === 0 ? true : false

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
                placeholderName={"search location"}
                valueName={agencyDetails.workLocation1}
                onChangeName={handleInputChange}
                isDisabled={disableInputFields}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Location 2"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Location 2</label> */}

              <TypeInput
                inputName={"workLocation2"}
                placeholderName={"search location"}
                valueName={agencyDetails.workLocation2}
                onChangeName={handleInputChange}
                isDisabled={disableInputFields}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Location 3"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Location 3</label> */}

              <TypeInput
                inputName={"workLocation3"}
                placeholderName={"search location"}
                valueName={agencyDetails.workLocation3}
                onChangeName={handleInputChange}
                isDisabled={disableInputFields}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-9 ms-sm-auto">
              <SubmitButton buttonName={"Submit"} isDisabled={disableInputFields} handleClick={handleAgencySubmit}></SubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkLocation;
