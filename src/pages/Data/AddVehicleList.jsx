import React, { useContext, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import CancelExcelButton from "../../General/Buttons/CancelExcelButton";
import DownloadExcelButton from "../../General/Buttons/DownloadExcelButton";
import SubmitExcelButton from "../../General/Buttons/SubmitExcelButton";
import UploadExcelButton from "../../General/Buttons/UploadExcelButton";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import {
  ACTION,
  APICALLFAIL,
  APINULLERROR,
  DELETEDATAERROR,
  FETCHDATAERROR,
  SRNO,
  SRNOKEY,
  SRNOWIDTH,
} from "../../General/ConstStates";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { LoginContext } from "../../store/login-context";
import Swal from "sweetalert2";

const AddVehicleList = () => {
  // Table data state
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      cellRenderer: ({ rowIndex }) => rowIndex + 1
    },
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
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
      width: 150,
    },
    {
      label: "Seats",
      dataKey: "vehiclesSeats",
      width: 150,
    },
    {
      label: "Looking",
      dataKey: "vehicleLooking",
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
      width: 100,
      cellRenderer: ({ rowData, rowIndex }) => (
        <div>
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteAction(rowData, rowIndex)}
          />
        </div>
      ),
    },
  ];

  const { user } = useContext(LoginContext);
  const initialVehicle = {
    vehicleBrand: "",
    vehicleType: "",
    vehicleModelName: "",
    vehicleFuelType: "",
    vehiclesSeats: 0,
    vehicleLooking: "",
    vehicleColour: "",
  };

  const otherData = {
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    userId: user ? user.userId : 0,
    isActive: true,
    isDeleted: false,
    other1:0
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
      console.error("API call failed:", error);
      NotificationManager.error(APICALLFAIL, error);
    }
    finally{
      stopLoading();
    }
  };
  useEffect(() => {
    VehicleList();
  }, []);

  // Function to delete a row
  const handleDeleteAction = (rowData, rowIndex) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        if(isShowPreview){
          handleDeleteFromPreview(rowIndex)
        }
        else{
          handleDeleteVehicle(rowData)
        }
        
      }
    });
    
  };

  //DELETE VEHICLE FROM LIST
  const handleDeleteVehicle = async (rowData)=>{
    const { vid } = rowData;
    startLoading();
    try {
      //debugger
      const response = await callApi(
        "delete",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/DeleteVehicleList/${vid}`,
        { ...rowData, isActive: false },
        {}
      );
      // console.log(response);

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
      
      console.error(APICALLFAIL, error);
      NotificationManager.error(APICALLFAIL, error);
    }
    finally{
      stopLoading();
    }
  }

  //DELETE VEHICLE FROM PREVIEW
  const handleDeleteFromPreview = async (rowIndex)=>{
    const updatedData = [...previewBookingData];
    updatedData.splice(rowIndex, 1);
    setPreviewBookingData(updatedData);
  }

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
        console.error(APINULLERROR, response);
        NotificationManager.warning(APINULLERROR);
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
            <h1 className="h3 mb-3">Vehicle List</h1>

            <div className="card">
              {/* Card Header */}
              <div className="card-header">
                <div className="row">
                <h2 className="col-5">{isShowPreview ? "Preview" : ""}</h2>
                <div className="mb-3 text-end col-7">
                  {isShowPreview === false ? (
                    <UploadExcelButton
                      setPreviewData={setPreviewData}
                      otherData={otherData}
                      buttonName={"Upload Vehicle List"}
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
