import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import { NotificationManager } from "react-notifications";
import { ACTION, APICALLFAIL, APINULLERROR, DELETEDATAERROR, FETCHDATAERROR, INT, SRNO, SRNOKEY, SRNOWIDTH, TEXT, UPDATEDATAERROR, WIDTH } from "../../General/ConstStates";
import { LoginContext } from "../../store/login-context";
import { LoadingContext } from "../../store/loading-context";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TypeInput from "../../General/Input/TypeInput";
import SubmitButton from "../../General/Buttons/SubmitButton";

function ContactUs() {
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      type : INT,
      isShow : true,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "Email",
      dataKey: "emailId",
      type: TEXT,
      isShow: true,
      width: 200,
    },
    {
      label: "Phone No",
      dataKey: "phoneNo",
      type: INT,
      isShow: true,
      width: 200,
    },
    {
      label: "Sender Name",
      dataKey: "senderName",
      type: TEXT,
      isShow: true,
      width: 200,
    },
    {
      label: "Subject",
      dataKey: "subject",
      type: TEXT,
      isShow: true,
      width: 100,
    },
    {
      label: "Message",
      dataKey: "message",
      type: TEXT,
      isShow: true,
      width: 200,
    },
    {
      label: "Reply Message",
      dataKey: "replyMessage",
      type: TEXT,
      isShow: true,
      width: 200,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      isShow: true,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              setIsEditMode(true);
              setModalData(rowData);
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteContact(rowData)}
          />
        </div>
      ),
    },
  ];

  const { user } = useContext(LoginContext);
  const initialState = {
    cU_id: 0,
    phoneNo: "",
    emailId: "",
    senderName: "",
    subject: "",
    message: "",
    createdDate: getCurrentDateTime(),
    replyDate: getCurrentDateTime(),
    replyMessage: "",
    replyBy: 0,
  };

  // const otherData = {
  //   createdDate: getCurrentDateTime(),
  //   modifyDate: getCurrentDateTime(),
  //   userId: user ? user.userId : 0,
  //   isActive: true,
  //   isDeleted: false,
  // };

  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [modalData, setModalData] = useState(initialState);
  const [contactData, setContactData] = useState([])
  const [searchFilters, setSearchFilters] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false)
  const rowGetter = ({ index }) => contactData[index];

    const ContactList = async () => {
      startLoading();
      try {
        const response = await callApi(
          "get",
          `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/GetAllContactUs`,
          {},
          {}
        );
  
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response?.data?.code === 200) {
            setContactData(response?.data?.data || []);
          } else {
            NotificationManager.error(response?.data?.message || FETCHDATAERROR);
          }
        } else {
          console.error("API returned an invalid response:", response);
          NotificationManager.error(APINULLERROR);
        }
      } catch (error) {
        stopLoading();
        console.error("API call failed:", error);
        NotificationManager.error(APICALLFAIL, error);
      }
    };
    useEffect(() => {
      ContactList();
    }, []);

  const handleEditContact = async () => {
        startLoading();
        try {
          debugger
            const response = await callApi(
              "put",
              `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/UpdateContactUs?id=${modalData.cU_id}`,
              {...modalData},
              {}
            );
            // console.log(response);
            
            stopLoading();
            if(response!==null && response!==undefined){
              if(response?.data?.code === 200){
                NotificationManager.success(response?.data?.message || "Contact updated successfully");
                ContactList();
                setModalData(initialState)
                setIsEditMode(false)
              }
              else{
                NotificationManager.error(response?.data?.message || UPDATEDATAERROR)
              }
            }
            else{
              NotificationManager.error(APINULLERROR)
            }
          
        } catch (error) {
          console.error(APICALLFAIL, error);
          NotificationManager.response(APICALLFAIL, error)
        }
      
    };

  const handleDeleteContact = async (rowData) => {
    const { cU_id } = rowData;

    startLoading();
    try {
      //debugger
      const response = await callApi(
        "DELETE",
        `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/DeleteContactUs?id=${cU_id}`,
        {},
        {}
      );
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "Contact deleted successfully"
          );
          ContactList();
          // setIsActive(false)
        } else {
          NotificationManager.error(response?.data?.message || DELETEDATAERROR);
        }
      } else {
        NotificationManager.error(APINULLERROR);
      }
    } catch (error) {
      stopLoading();
      console.error(APICALLFAIL, error);
      NotificationManager.error(APICALLFAIL, error);
    }
  };

  const handleInputChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.name] : e.target.value
    })
    console.log(e.target.value);
    
  };

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Contact Us</h1>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div
                      id="datatables-reponsive_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={contactData}
                            tableSearchFilters={searchFilters}
                            columns={columns}
                            rowGetter={rowGetter}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="subject" className="col-form-label">
                    Subject:
                  </label>
                  <TypeInput
                    id="subject"
                    inputName={"subject"}
                    valueName={modalData.subject}
                    onChangeName={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    className="form-control"
                    id="replyMessage"
                    name="replyMessage"
                    value={modalData.replyMessage}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <SubmitButton buttonName={isEditMode ? "Update" : "Submit"} handleClick={handleEditContact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
