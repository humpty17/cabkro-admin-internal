import { useContext, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import {
  ACTION,
  ADDAGENCY,
  APICALLFAIL,
  APINULLERROR,
  EDIT,
  SRNO,
  SRNOKEY,
  SRNOWIDTH,
  UPDATEAGENCYALLDETAILS,
  WIDTH,
} from "../../General/ConstStates";
import { callApi } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { CurrentPageContext } from "../../store/pages-context";

const VehicleList = ({ setEditData, editData }) => {
  
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "Vehicle Number",
      dataKey: "vehicleNumber",
      width: 220,
    },
    {
      label: "Vehicle Type",
      dataKey: "vehicleType",
      width: 220,
    },

    {
      label: "Phone No",
      dataKey: "phoneNumber",
      width: 220,
    },
    {
      label: "Email",
      dataKey: "email",
      width: 220,
    },
    {
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
      width: 220,
    },
    {
      label: "Model Name",
      dataKey: "vehicleModelName",
      width: 220,
    },
    {
      label: "Company Name",
      dataKey: "vehicleCompanyName",
      width: 220,
    },
    {
      label: "Seater Count",
      dataKey: "vehicleSeaterCount",
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
      cellRenderer: ({ rowData, rowIndex }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              setEditData({op:EDIT,...rowData});
              handlePageClick(ADDAGENCY);
            }}
          />
          <AiFillEye
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleView(rowData)}
          />
        </div>
      ),
    },
  ];

  const [VehicleList, setVehicleList] = useState([]);
  const [searchFilters, setSearchFilters] = useState("");
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { handlePageClick } = useContext(CurrentPageContext);

  const fetchVehicleList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllVehicleListAdmin/true/false`,
        {},
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          setVehicleList([...response?.data?.data]);
        } else {
          NotificationManager.error(response?.data?.message || APINULLERROR);
          setVehicleList([]);
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
    fetchVehicleList();
  }, []);

  const handleView = async (rowData) => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetVehicleForAdminById/${rowData.carOwnerId}`,
        {},
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          setEditData({op:EDIT, ...response?.data?.data });
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
            <h1 className="h3 mb-3">Vehicle List</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header ">
                    <div className="row">
                      <h2 className="col-5 font"></h2>
                      <div className="mb-3 text-end col-7">
                        {/* Export Excel Button */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={VehicleList}
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

export default VehicleList;
