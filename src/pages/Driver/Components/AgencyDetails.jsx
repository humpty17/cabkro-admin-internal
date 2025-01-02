import { useContext, useState } from "react";
import TypeInput from "../../../General/Input/TypeInput";
import FormLabel from "../../../General/Label/FormLabel";
import NumberInput from "../../../General/Input/NumberInput";
import EmailInput from "../../../General/Input/EmailInput";
import PasswordInput from "../../../General/Input/PasswordInput";
import { LoadingContext } from "../../../store/loading-context";
import { callApi, getCurrentDateTime } from "../../../General/GeneralMethod";
import { APICALLFAIL, ApiHeaders, APINULLERROR, DEFAULTDATE } from "../../../General/ConstStates";
import { NotificationManager } from "react-notifications";
import SubmitButton from "../../../General/Buttons/SubmitButton";

const AgencyDetails = () =>{

    const {startLoading, stopLoading} = useContext(LoadingContext)

    const agencyObject = {
        "userId": 0,
        "userFirstName": "",
        "userLastName": "",
        "carOwnerAgencyName": "",
        "phoneNo": "",
        "userEmail": "",
        "password": "",
        "gender": 0,
        "dob": DEFAULTDATE,
        "emergencyContactNo": "",
        "homeLocation": "",
        "workLocation": "",
        "workLocation1": "",
        "workLocation2": "",
        "workLocation3": "",
        "workLocation1Latitude": 0,
        "workLocation1Longitude": 0,
        "workLocation2Latitude": 0,
        "workLocation2Longitude": 0,
        "workLocation3Latitude": 0,
        "workLocation3Longitude": 0,
        "paymentMethod": "",
        "status": true,
        "createdDate": getCurrentDateTime(),
        "modifyDate": getCurrentDateTime(),
        "isDeleted": true,
        "deletedReason": "",
        "referCode": "",
        "lastLoginDate": DEFAULTDATE,
        "isAdult": true,
        "noOfRide": 0,
        "isCouponCode": "",
        "other1": 0,
        "other2": "",
        "panNo": "",
        "userImage": "",
        "userType": 1,
        "acceptTermsCondition": 0
      }

      const [agencyDetails, setAgencyDetails] = useState({...agencyObject})
    
      const [isTermsChecked, setIsTermsChecked] = useState(false);
      const [location1, setLocation1] = useState('');
      const [location2, setLocation2] = useState('');
      const [location3, setLocation3] = useState('');
    const handleInputChange = (e) =>{
        if(e.target.name === "acceptTermsCondition"){
            setAgencyDetails({...agencyDetails, [e.target.name]: e.target.checked})
            
        }else{

            setAgencyDetails({...agencyDetails, [e.target.name]: e.target.value})
        }
    }
    const handleAgencySubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic
        console.log(agencyDetails)
        startLoading()
        try{
            const response = await callApi("post", `${process.env.REACT_APP_API_URL}api/Auth/RegisterUser`,{...agencyDetails}, {...ApiHeaders})

            if(response){
                if(response?.data?.code === 200){
                    setAgencyDetails({...response?.data?.data})
                    NotificationManager.success(response?.data?.message || "Agency Details saved successfully")
                }
            }
            else{
                NotificationManager.error(response?.data?.message || APINULLERROR)
            }
        }
        catch(err){
            NotificationManager.error(APICALLFAIL)
        }
        finally{
            stopLoading()
        }
      };

  const handleFileUpload = (event) => {
    // Handle file uploads (e.g., saving files, etc.)
    console.log(event.target.files);
  };
    return(
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
                        <TypeInput inputName={"userFirstName"} placeholderName={"Agency Name"} valueName={agencyDetails.userFirstName} onChangeName={handleInputChange}></TypeInput>
                        
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Owner Name"}></FormLabel>
                        <TypeInput inputName={"carOwnerAgencyName"} placeholderName={"Owner Name"} valueName={agencyDetails.carOwnerAgencyName} onChangeName={handleInputChange}></TypeInput>
                        
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Phone No."}></FormLabel>
                        <NumberInput inputName={"phoneNo"} placeholderName={"Phone No."} valueName={agencyDetails.phoneNo} onChangeName={handleInputChange}></NumberInput>
                        
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Email"}></FormLabel>
                        <EmailInput inputName={"userEmail"} placeholderName={"Email"} valueName={agencyDetails.userEmail} onChangeName={handleInputChange}></EmailInput>
                        
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Pan No"}></FormLabel>
                        <TypeInput inputName={"panNo"} placeholderName={"Pan No"} valueName={agencyDetails.panNo} onChangeName={handleInputChange}></TypeInput>
                        
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Password"}></FormLabel>
                        <PasswordInput inputName={"password"} placeholderName={"Password"} valueName={agencyDetails.password} onChangeName={handleInputChange}></PasswordInput>
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
                            I have read and agree with <a href="#">terms & conditions</a>
                          </span>
                        </label>
                      </div>

                      <div className="mb-3 row">
                        <div className="col-sm-9 ms-sm-auto">
                            <SubmitButton buttonName={"Submit"} handleClick={handleAgencySubmit}></SubmitButton>
                          {/* <button type="submit" className="btn btn-primary"> */}
                            {/* Submit */}
                          {/* </button> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-6 col-xl-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Upload documents</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3 row">
                        <FormLabel label={"Aadhar card front"}></FormLabel>
                        <div className="col-sm-8">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileUpload}
                            
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Aadhar card back"}></FormLabel>
                        {/* <label className="col-form-label col-sm-3 text-sm-end">Aadhar card back</label> */}
                        <div className="col-sm-8">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                      <FormLabel label={"Pan card"}></FormLabel>
                        {/* <label className="col-form-label col-sm-3 text-sm-end">Pan card</label> */}
                        <div className="col-sm-8">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col-sm-12 ms-sm-auto">
                          <button type="submit" className="btn btn-primary">
                            Upload Aadhar front
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Upload Aadhar back
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Upload pan
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

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
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search location"
                          value={location1}
                          onChange={(e) => setLocation1(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                    <FormLabel label={"Location 2"}></FormLabel>
                      {/* <label className="col-form-label col-sm-3 text-sm-end">Location 2</label> */}
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search location"
                          value={location2}
                          onChange={(e) => setLocation2(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                    <FormLabel label={"Location 3"}></FormLabel>
                      {/* <label className="col-form-label col-sm-3 text-sm-end">Location 3</label> */}
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search location"
                          value={location3}
                          onChange={(e) => setLocation3(e.target.value)}
                        />
                      </div>
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
          </div>
        </main>
      </div>
    </div>
    )
    
}

export default AgencyDetails;