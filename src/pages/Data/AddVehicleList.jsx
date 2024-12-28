import React, { useContext, useEffect, useState } from "react";
import { FiPlus, FiDownload, FiTrash2, FiEdit } from "react-icons/fi";
import { FaFileExport, FaTrash } from "react-icons/fa";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { NotificationManager } from "react-notifications";
import {
  ACTION,
  APICALLFAIL,
  APINULLERROR,
  DELETEDATAERROR,
  FETCHDATAERROR,
} from "../../General/ConstStates";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import UploadExcelButton from "../../General/Buttons/UploadExcelButton";
import DownloadExcelButton from "../../General/Buttons/DownloadExcelButton";
import ExportButtton from "../../General/Buttons/ExportButtton";
import SubmitExcelButton from "../../General/Buttons/SubmitExcelButton";
import CancelExcelButton from "../../General/Buttons/CancelExcelButton";
import { LoginContext } from "../../store/login-context";

const AddVehicleList = () => {
  // Table data state
  const columns = [
    {
      label: "Brand",
      dataKey: "vehicleBrand",
      width: 150,
    },
    {
      label: "Type",
      dataKey: "vehicleType",
      width: 150,
    },
    {
      label: "Model Name",
      dataKey: "vehicleModelName",
      width: 150,
    },
    {
      label: "Seats",
      dataKey: "vehiclesSeats",
      width: 100,
    },
    {
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
      width: 150,
    },
    {
      label: "Colour",
      dataKey: "vehicleColour",
      width: 150,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: 150,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteVehicle(rowData)}
          />
        </div>
      ),
    },
  ];

  const { user } = useContext(LoginContext);
  const initialVehicle = {
    vid: 0,
    vehicleBrand: "",
    vehicleType: "",
    vehicleModelName: "",
    vehicleFuelType: "",
    vehiclesSeats: 0,
    other1: 0,
    vehicleLooking: "",
    vehicleColour: "",
  };

  const otherData = {
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    userId: user ? user.userId : 0,
    isActive: true,
    isDeleted: false,
  };

  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [AddVehicleData, setAddVehicleData] = useState([]);
  const [searchFilters, setSearchFilters] = useState(initialVehicle);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [previewBookingData, setPreviewBookingData] = useState([]);

  const VehicleList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllVehicleList`,
        {},
        {}
      );

      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          setAddVehicleData(response?.data?.data || []);
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
    VehicleList();
  }, []);

  // Function to delete a row
  const handleDeleteVehicle = async (rowData) => {
    const { vid } = rowData;
    startLoading();
    try {
      //debugger
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetVehicleListById/${vid}`,
        { ...rowData, isActive: false },
        {}
      );
      // console.log(response);

      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "Vehicle deleted successfully"
          );
          VehicleList();
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

  const submitExcelData = async () => {
    if (previewBookingData.length === 0) {
      NotificationManager.warning("No data available for upload.");
      return;
    }
    startLoading();
    try {
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/AddVehicleList`,
        previewBookingData,
        {}
      );
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          NotificationManager.success(response.data.message);
          handleReset();
        } else {
          NotificationManager.error(response.data.message);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(response.data.message);
      }
    } catch (err) {
      stopLoading();
    }
  };

  const setPreviewData = (data) => {
    setIsShowPreview(true);
    setPreviewBookingData(data);
  };

  const handleCancelClick = () => {
    setIsShowPreview(false);
    setPreviewBookingData(false);
  };

  const handleReset = () => {
    setIsShowPreview(false);
    setPreviewBookingData([]);
    VehicleList();
  };

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add Vehicle List</h1>

            <div className="card">
              {/* Card Header */}
              <div className="card-header row">
                <h2 className="col-5">{isShowPreview ? "Preview" : ""}</h2>
                <div className="mb-3 text-end col-7">
                  {isShowPreview === false ? (
                    <UploadExcelButton
                      setPreviewData={setPreviewData}
                      otherData={otherData}
                    />
                  ) : null}
                  {isShowPreview === false ? (
                    <DownloadExcelButton
                      columns={Object.keys(initialVehicle)}
                      fileName={"Add_Vehicle_Sample"}
                    />
                  ) : null}
                  {isShowPreview === true ? (
                    <SubmitExcelButton
                      handleSubmitClick={submitExcelData}
                    ></SubmitExcelButton>
                  ) : null}
                  {isShowPreview === true ? (
                    <CancelExcelButton
                      handleCancelClick={handleCancelClick}
                    ></CancelExcelButton>
                  ) : null}
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                {/* Table */}
                <VirtualizedTable
                  tableData={
                    isShowPreview ? previewBookingData : AddVehicleData
                  }
                  tableSearchFilters={searchFilters}
                  columns={columns}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddVehicleList;
