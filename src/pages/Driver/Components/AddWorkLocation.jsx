import React, { useState } from "react";
import FormLabel from "../../../General/Label/FormLabel";
import TypeInput from "../../../General/Input/TypeInput";

const AddWorkLocation = ({agencyDetails}) => {
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [location3, setLocation3] = useState("");

  const disableInputFields = agencyDetails?.userId === 0 ? true : false

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
                inputName={""}
                placeholderName={"search location"}
                valueName={location1}
                onChangeName={(e) => setLocation1(e.target.value)}
                isDisabled={disableInputFields}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Location 2"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Location 2</label> */}

              <TypeInput
                inputName={""}
                placeholderName={"search location"}
                valueName={location2}
                onChangeName={(e) => setLocation2(e.target.value)}
                isDisabled={disableInputFields}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Location 3"}></FormLabel>
              {/* <label className="col-form-label col-sm-3 text-sm-end">Location 3</label> */}

              <TypeInput
                inputName={""}
                placeholderName={"search location"}
                valueName={location3}
                onChangeName={(e) => setLocation2(e.target.value)}
                isDisabled={disableInputFields}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-9 ms-sm-auto">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkLocation;
