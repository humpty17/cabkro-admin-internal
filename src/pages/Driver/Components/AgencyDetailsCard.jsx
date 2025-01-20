import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../../General/Buttons/SubmitButton";
import EmailInput from "../../../General/Input/EmailInput";
import NumberInput from "../../../General/Input/NumberInput";
import PasswordInput from "../../../General/Input/PasswordInput";
import TypeInput from "../../../General/Input/TypeInput";
import FormLabel from "../../../General/Label/FormLabel";
import { NotificationManager } from "react-notifications";
import { APICALLFAIL, APINULLERROR, APPROVE, EMAILREGEX, PHONENOREGEX } from "../../../General/ConstStates";
import { LoadingContext } from "../../../store/loading-context";
import { callApi } from "../../../General/GeneralMethod";

const AgencyDetailsCard = ({agencyObject,handleAgencySubmit, op, handleApproveAgency}) => {

  const [agencyDetails, setAgencyDetails] = useState({...agencyObject})
  const { startLoading, stopLoading } = useContext(LoadingContext);
 // console.log(agencyObject,agencyDetails)

  useEffect(()=>{
    setAgencyDetails({...agencyObject})
  },[agencyObject])

  useEffect(()=>{
    console.log("op changed", op)
  },[op])
  const handleInputChange = (e) => {
    if(e.target.name === "phoneNumber"){
      if(e.target.value.length > 10){
        return
      }
    }
    if (e.target.name === "acceptTermsCondition") {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.checked ? 1 : 0 });
    } else {
      setAgencyDetails({ ...agencyDetails, [e.target.name]: e.target.value });
    }
  };

  const validateAgencyDetails = () => {
      if (agencyDetails.carOwnerName === '' || agencyDetails.carOwnerAgencyName === '' || agencyDetails.phoneNumber === '' || agencyDetails.email === '' || agencyDetails.panNo === '' || agencyDetails.password === '' ) {
        NotificationManager.warning('Enter required fields')
        return false
      }
      else if (!PHONENOREGEX.test(agencyDetails.phoneNumber)) {
        NotificationManager.warning("Your phone number is not valid!")
        return false
      }
      if (!EMAILREGEX.test(agencyDetails.email)) {
        NotificationManager.warning("Your email is not valid!")
        return false
      }
      return true
    }

      

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!validateAgencyDetails()) return

    handleAgencySubmit(agencyDetails)
  }

  const handleApprove = (e) => {
    e.preventDefault()
    if(!validateAgencyDetails()) return
    handleApproveAgency(agencyDetails)
  }
  return (
    <div className="col-6 col-xl-6">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Agency details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <FormLabel label={"Agency Name"}></FormLabel>
              <TypeInput
                inputName={"carOwnerAgencyName"}
                placeholderName={"Agency Name"}
                valueName={agencyDetails?.carOwnerAgencyName}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true: false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Owner Name"}></FormLabel>
              <TypeInput
                inputName={"carOwnerName"}
                placeholderName={"Owner Name"}
                valueName={agencyDetails.carOwnerName}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true: false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Phone No."}></FormLabel>
              <NumberInput
                inputName={"phoneNumber"}
                placeholderName={"Phone No."}
                valueName={agencyDetails.phoneNumber}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true: false}
              ></NumberInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Email"}></FormLabel>
              <EmailInput
                inputName={"email"}
                placeholderName={"Email"}
                valueName={agencyDetails.email}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></EmailInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Pan No"}></FormLabel>
              <TypeInput
                inputName={"panNo"}
                placeholderName={"Pan No"}
                valueName={agencyDetails.panNo}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true: false}
              ></TypeInput>
            </div>
            <div className="mb-3 row">
              <FormLabel label={"Password"}></FormLabel>
              <PasswordInput
                inputName={"password"}
                placeholderName={"Password"}
                valueName={agencyDetails.password}
                onChangeName={handleInputChange}
                isDisabled={op === APPROVE ? true : false}
              ></PasswordInput>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <input
                  type="checkbox"
                  name={"acceptTermsCondition"}
                  className="form-check-input"
                  checked={
                    agencyDetails.acceptTermsCondition === 1 ? true : false
                  }
                  onChange={handleInputChange}
                  isDisabled={op === APPROVE ? true : false}
                />
                <span className="form-check-label">
                  I have read and agree with <a href="#">terms & conditions</a>
                </span>
              </label>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-9 ms-sm-auto">
                {op === APPROVE ? (
                  <SubmitButton
                    buttonName={"Approve"}
                    handleClick={handleApprove}
                  ></SubmitButton>
                ) : (
                  <SubmitButton
                    buttonName={"Submit"}
                    handleClick={handleSubmit}
                  ></SubmitButton>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgencyDetailsCard;
