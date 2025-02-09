import { useContext, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import ExportButtton from "../../General/Buttons/ExportButtton";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import {
  ACTION,
  ADDAGENCY,
  APICALLFAIL,
  APINULLERROR,
  EDIT,
  INT,
  SRNO,
  SRNOKEY,
  SRNOWIDTH,
  TEXT,
  UPDATEAGENCYALLDETAILS,
  WIDTH
} from "../../General/ConstStates";
import { callApi } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { CurrentPageContext } from "../../store/pages-context";

const DriverList = ({ setEditData, editData }) => {
  
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      type: INT,
      isShow: true,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "Vehicle Number",
      dataKey: "vehicleNumber",
      type: INT,
      isShow: true,
      width: 220,
    },
    {
      label: "Vehicle Type",
      dataKey: "vehicleType",
      type: TEXT,
      isShow: true,
      width: 220,
    },

    {
      label: "Phone No",
      dataKey: "phoneNumber",
      type: INT,
      isShow: true,
      width: 220,
    },
    {
      label: "Email",
      dataKey: "email",
      type: TEXT,
      isShow: true,
      width: 220,
    },
    {
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
      type: TEXT,
      isShow: true,
      width: 220,
    },
    {
      label: "Model Name",
      dataKey: "vehicleModelName",
      type: TEXT,
      isShow: true,
      width: 220,
    },
    {
      label: "Company Name",
      dataKey: "vehicleCompanyName",
      type: TEXT,
      isShow: true,
      width: 220,
    },
    {
      label: "Seater Count",
      dataKey: "vehicleSeaterCount",
      type: INT,
      isShow: true,
      width: 220,
    },

    // {
    //   label: "Adhar Front",
    //   dataKey: "aadharImageFront",
    //   width: 220,
    //   cellRenderer: ({ rowData, rowIndex }) =>
    //     rowData["aadharImageFront"] ? "Yes" : "No",
    // },
    // {
    //   label: "Adhar Back",
    //   dataKey: "aadharImageBack",
    //   width: 220,
    //   cellRenderer: ({ rowData, rowIndex }) =>
    //     rowData["aadharImageFront"] ? "Yes" : "No",
    // },
    // {
    //   label: "Pan Image",
    //   dataKey: "panImage",
    //   width: 220,
    //   cellRenderer: ({ rowData, rowIndex }) =>
    //     rowData["aadharImageFront"] ? "Yes" : "No",
    // },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      isShow: true,
      cellRenderer: ({ rowData, rowIndex }) => (
        <div>
          {/* <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              setEditData({op:EDIT,...rowData});
              handlePageClick(ADDAGENCY);
            }}
          /> */}
          <AiFillEye
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleView(rowData)}
          />
        </div>
      ),
    },
  ];

  const [driverList, setDriverList] = useState([]);
  const [searchFilters, setSearchFilters] = useState("");
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const {currentPage} = useContext(CurrentPageContext)
  const { handlePageClick } = useContext(CurrentPageContext);

  const fetchDriverList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllDriverListAdmin/true/true`,
        {},
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          setDriverList([...response?.data?.data]);
        } else {
          NotificationManager.error(response?.data?.message || APINULLERROR);
          setDriverList([]);
        }
      } else {
        NotificationManager.error(APINULLERROR);
      }
    } catch (err) {
      NotificationManager.error(APICALLFAIL);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchDriverList();
  }, []);

  const handleView = async (rowData) => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetDriverForAdminById/${rowData.carOwnerId}`,
        {},
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          setEditData({op:EDIT, ...response?.data?.data, pageName: currentPage });
          handlePageClick(UPDATEAGENCYALLDETAILS);
        } else {
          NotificationManager.error("Could not view agency details");
        }
      } else {
        NotificationManager.error(APINULLERROR);
      }
    } catch (err) {
      NotificationManager.error(APICALLFAIL);
    } finally {
      stopLoading();
    }
  };
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Driver List</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header ">
                    <div className="row">
                      <h2 className="col-5 font"></h2>
                      <div className="mb-3 text-end col-7">
                        {/* Export Excel Button */}
                        <ExportButtton
                          columns={columns}
                          fileName={"Export_Driver_List"}
                          data={driverList}
                        ></ExportButtton>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={driverList}
                            tableSearchFilters={searchFilters}
                            columns={columns}
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
    </div>
  );
};

export default DriverList;
