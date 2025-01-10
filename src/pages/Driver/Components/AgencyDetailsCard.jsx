import SubmitButton from "../../../General/Buttons/SubmitButton";
import EmailInput from "../../../General/Input/EmailInput";
import NumberInput from "../../../General/Input/NumberInput";
import PasswordInput from "../../../General/Input/PasswordInput";
import TypeInput from "../../../General/Input/TypeInput";
import FormLabel from "../../../General/Label/FormLabel";

const AgencyDetailsCard = ({agencyDetails, handleInputChange,handleAgencySubmit}) => {
  return (
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
              inputName={"carOwnerAgencyName"}
              placeholderName={"Agency Name"}
              valueName={agencyDetails.carOwnerAgencyName}
              onChangeName={handleInputChange}
            ></TypeInput>
          </div>
          <div className="mb-3 row">
            <FormLabel label={"Owner Name"}></FormLabel>
            <TypeInput
              inputName={"carOwnerName"}
              placeholderName={"Owner Name"}
              valueName={agencyDetails.carOwnerName}
              onChangeName={handleInputChange}
            ></TypeInput>
          </div>
          <div className="mb-3 row">
            <FormLabel label={"Phone No."}></FormLabel>
            <NumberInput
              inputName={"phoneNumber"}
              placeholderName={"Phone No."}
              valueName={agencyDetails.phoneNumber}
              onChangeName={handleInputChange}
            ></NumberInput>
          </div>
          <div className="mb-3 row">
            <FormLabel label={"Email"}></FormLabel>
            <EmailInput
              inputName={"email"}
              placeholderName={"Email"}
              valueName={agencyDetails.email}
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
                checked={agencyDetails.acceptTermsCondition === 1 ? true : false}
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
  );
};

export default AgencyDetailsCard;
