import React, { useContext, useState } from "react";
import { FaRegEnvelope, FaLock, FaServer, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import EmailInput from "../../General/Input/EmailInput";
import PasswordInput from "../../General/Input/PasswordInput";
import TypeInput from "../../General/Input/TypeInput";
import NumberInput from "../../General/Input/NumberInput";
import SubmitButton from "../../General/Buttons/SubmitButton";
import { NotificationManager } from "react-notifications";
import { LoadingContext } from "../../store/loading-context";
import { callApi } from "../../General/GeneralMethod";
import { ApiHeader } from "../../General/ConstStates";
import ResetButton from "../../General/Buttons/ResetButton";
import { AdminContext } from "../../store/admin-context";

const SMTPDetails = () => {
  const initialState = {
    mailFrom : '',
    mailCC : '',
    mailFromPassword : '',
    ssl: true,
    server : '',
    portNo : 0
  }
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const {icon, type, handleToggleData} = useContext(AdminContext)
  const [smtpData, setSmtpData] = useState(initialState)

  const handleSmtpForm = async (event) => {
      event.preventDefault();
      startLoading();
      try {
        const response = await callApi("post",`${process.env.REACT_APP_API_URL_ADMIN}api/Extras/SaveSMTPDetails`, {...smtpData}, {});
        stopLoading();
        console.log(response);
  
        if (response && response.data) {
          stopLoading()  // Check for response and response.data
          if (response.data.code === 200) {
            handleReset()
           // console.log(response.data.data);
            setSmtpData(response.data.data)
            NotificationManager.success(response.data.message)
          } else {
            console.error("API Error:", response.data.code, response.data);
            NotificationManager.error(response.data.message)
          }
        } else {
          stopLoading()
          console.error("API returned an invalid response:", response);
          NotificationManager.warning(response.data.message)
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

  const handleChangeSmtp = (e) =>{
    setSmtpData({
      ...smtpData,
      [e.target.name] : e.target.value
    })
    console.log(e.target.value);
  }


  const handleReset = () =>{
    setSmtpData({...initialState})
  }
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">SMTP Details</h1>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSmtpForm}>
                      <div className="row">
                        <div className="mb-3 col-md-4">
                          <label className="form-label" htmlFor="mailFrom">
                            Mail From
                          </label>
                          <EmailInput
                            inputName={"mailFrom"}
                            placeholderName={"Enter email"}
                            valueName={smtpData.mailFrom}
                            onChangeName={handleChangeSmtp}
                            id="mailFrom"
                          />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label" htmlFor="mailCC">
                            Mail CC
                          </label>
                          <TypeInput
                            id="mailCC"
                            type={"password"}
                            inputName={"mailCC"}
                            placeholderName={"Enter CC emails"}
                            valueName={smtpData.mailCC}
                            onChangeName={handleChangeSmtp}
                          />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label
                            className="form-label"
                            htmlFor="mailFromPassword"
                          >
                            Mail From Password
                          </label>
                          <div className="col-sm-12 input-group_1">
                          <PasswordInput
                            id="mailFromPassword"
                            type={type}
                            inputName={"mailFromPassword"}
                            placeholderName={"Enter password"}
                            valueName={smtpData.mailFromPassword}
                            onChangeName={handleChangeSmtp}
                          />
                          <span
                              className="input-group-text"
                              onClick={handleToggleData}
                            >
                              {icon}
                            </span>
                            </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label" htmlFor="ssl">
                            SSL
                          </label>
                          <select
                            className="form-control"
                            id="ssl"
                            onChange={handleChangeSmtp}
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label" htmlFor="server">
                            Server
                          </label>
                          <TypeInput
                            id="server"
                            inputName={"server"}
                            placeholderName={"Enter server address"}
                            valueName={smtpData.server}
                            onChangeName={handleChangeSmtp}
                          />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label" htmlFor="portNo">
                            Port no
                          </label>
                          <NumberInput
                            id="portNo"
                            inputName={"portNo"}
                            placeholderName={"Enter port number"}
                            valueName={smtpData.portNo}
                            onChangeName={handleChangeSmtp}
                          />
                        </div>
                        <div className="mb-3 col-md-3 mt-4">
                          <SubmitButton />
                          <ResetButton onHandleClick={handleReset} />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SMTPDetails;
