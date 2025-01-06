import { useContext, useState } from "react";
import TypeInput from "../../../General/Input/TypeInput";
import FormLabel from "../../../General/Label/FormLabel";
import NumberInput from "../../../General/Input/NumberInput";
import EmailInput from "../../../General/Input/EmailInput";
import PasswordInput from "../../../General/Input/PasswordInput";
import { LoadingContext } from "../../../store/loading-context";
import { callApi, getCurrentDateTime } from "../../../General/GeneralMethod";
import {
  APICALLFAIL,
  ApiHeaders,
  APINULLERROR,
  DEFAULTDATE,
} from "../../../General/ConstStates";
import { NotificationManager } from "react-notifications";
import SubmitButton from "../../../General/Buttons/SubmitButton";
import UploadDocuments from "./UploadDocuments";
import AddWorkLocation from "./AddWorkLocation";

const AgencyDetails = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const agencyObject = {
    userId: 0,
    userFirstName: "",
    userLastName: "",
    carOwnerAgencyName: "",
    phoneNo: "",
    userEmail: "",
    password: "",
    gender: 0,
    dob: DEFAULTDATE,
    emergencyContactNo: "",
    homeLocation: "",
    workLocation: "",
    workLocation1: "",
    workLocation2: "",
    workLocation3: "",
    workLocation1Latitude: 0,
    workLocation1Longitude: 0,
    workLocation2Latitude: 0,
    workLocation2Longitude: 0,
    workLocation3Latitude: 0,
    workLocation3Longitude: 0,
    paymentMethod: "",
    status: true,
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    isDeleted: true,
    deletedReason: "",
    referCode: "",
    lastLoginDate: DEFAULTDATE,
    isAdult: true,
    noOfRide: 0,
    isCouponCode: "",
    other1: 0,
    other2: "",
    panNo: "",
    userImage: "",
    userType: 1,
    acceptTermsCondition: 0,
  };

  const [agencyDetails, setAgencyDetails] = useState({ ...agencyObject });

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const handleInputChange = (e) => {
    if (e.target.name === "acceptTermsCondition") {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.checked });
    } else {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.value });
    }
  };
  const handleAgencySubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log(agencyDetails);
    startLoading();
    try {
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL}api/Auth/RegisterUser`,
        { ...agencyDetails },
        { ...ApiHeaders }
      );

      if (response) {
        if (response?.data?.code === 200) {
          setAgencyDetails({ ...response?.data?.data });
          NotificationManager.success(
            response?.data?.message || "Agency Details saved successfully"
          );
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

  const handleFileUpload = (event) => {
    // Handle file uploads (e.g., saving files, etc.)
    console.log(event.target.files);
  };
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add Agency</h1>

            <div className="row">
              <div className="col-6 col-xl-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Agency details</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleAgencySubmit}>
                      <div className="mb-3 row">
                        <FormLabel label={"Agency Name"}></FormLabel>
                        <TypeInput
                          inputName={"userFirstName"}
                          placeholderName={"Agency Name"}
                          valueName={agencyDetails.userFirstName}
                          onChangeName={handleInputChange}
                        ></TypeInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Owner Name"}></FormLabel>
                        <TypeInput
                          inputName={"carOwnerAgencyName"}
                          placeholderName={"Owner Name"}
                          valueName={agencyDetails.carOwnerAgencyName}
                          onChangeName={handleInputChange}
                        ></TypeInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Phone No."}></FormLabel>
                        <NumberInput
                          inputName={"phoneNo"}
                          placeholderName={"Phone No."}
                          valueName={agencyDetails.phoneNo}
                          onChangeName={handleInputChange}
                        ></NumberInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Email"}></FormLabel>
                        <EmailInput
                          inputName={"userEmail"}
                          placeholderName={"Email"}
                          valueName={agencyDetails.userEmail}
                          onChangeName={handleInputChange}
                        ></EmailInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Pan No"}></FormLabel>
                        <TypeInput
                          inputName={"panNo"}
                          placeholderName={"Pan No"}
                          valueName={agencyDetails.panNo}
                          onChangeName={handleInputChange}
                        ></TypeInput>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Password"}></FormLabel>
                        <PasswordInput
                          inputName={"password"}
                          placeholderName={"Password"}
                          valueName={agencyDetails.password}
                          onChangeName={handleInputChange}
                        ></PasswordInput>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          <input
                            type="checkbox"
                            name={"acceptTermsCondition"}
                            className="form-check-input"
                            checked={agencyDetails.acceptTermsCondition}
                            onChange={handleInputChange}
                          />
                          <span className="form-check-label">
                            I have read and agree with{" "}
                            <a href="#">terms & conditions</a>
                          </span>
                        </label>
                      </div>

                      <div className="mb-3 row">
                        <div className="col-sm-9 ms-sm-auto">
                          <SubmitButton
                            buttonName={"Submit"}
                            handleClick={handleAgencySubmit}
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
              <UploadDocuments handleFileUpload={handleFileUpload} />
            </div>

            <AddWorkLocation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgencyDetails;
