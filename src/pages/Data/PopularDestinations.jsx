import React, { useContext, useEffect, useState } from "react";
import { FaFileExport, FaTrash } from "react-icons/fa";
import { FiPlus, FiDownload, FiTrash2 } from "react-icons/fi";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import { LoadingContext } from "../../store/loading-context";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import { NotificationManager } from "react-notifications";
import "bootstrap/dist/css/bootstrap.css";
import { headerRenderer } from "../../General/Common/VitualizedTable/SearchHeaderRenderer";
import UploadExcelButton from "../../General/Buttons/UploadExcelButton";
import DownloadExcelButton from "../../General/Buttons/DownloadExcelButton";
import SubmitExcelButton from "../../General/Buttons/SubmitExcelButton";
import CancelExcelButton from "../../General/Buttons/CancelExcelButton";
import { LoginContext } from "../../store/login-context";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import {
  ACTION,
  APICALLFAIL,
  APINULLERROR,
  DELETEDATAERROR,
} from "../../General/ConstStates";

const PopularDestinations = () => {
  const columns = [
    {
      label: "PackageName",
      dataKey: "packageName",
      width: 300,
    },
    {
      label: "Description",
      dataKey: "description",
      width: 300,
    },
    {
      label: "pickupCity",
      dataKey: "pickupCity",
      width: 150,
    },
    {
      label: "destinationCity",
      dataKey: "destinationCity",
      width: 250,
    },
    {
      label: "vehicleType",
      dataKey: "vehicleType",
      width: 250,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: 150,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteDestination(rowData)}
          />
        </div>
      ),
    },
  ];
  const { user } = useContext(LoginContext);
  const popularDataExcelHeader = {
    packageName: "",
    description: "",
    pickupCity: "",
    destinationCity: "",
    minDistance: 0,
    maxDistance: 0,
    basePrice: 0,
    discountRate: 0,
    discountAmount: 0,
    vehicleType: "",
    vehicleFuelType: "",
    vehicleModelName: "",
    vehicleSeaterCount: 0,
    pickupAddress: "",
    destinationAddress: "",
    pickupLatLong: 0,
    destinationLatLong: 0,
    timeDurationHours: 0,
    dayCount: 0,
    specificDay: 0,
    specificDate: 0,
    offerPrice: 0,
    rentalHours: 0,
    rentaldays: 0,
    plusMember: 0,
    gstRate: 0,
    gstAmount: 0,
    offerDescription: "",
    breakFast: true,
    lunch: true,
    dinner: true,
    extraService: "",
    // "createdDate": "2024-12-24T12:56:26.270Z",
    // "modifyDate": "2024-12-24T12:56:26.270Z",
    // "userId": 0,
    // "isActive": true,
    // "isDeleted": true,
    other1: 0,
    other2: "",
  };

  const otherData = {
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    userId: user ? user.userId : 0,
    isActive: true,
    isDeleted: false,
  };

  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [getDestination, setGetDestination] = useState([]);
  const [searchFilters, setSearchFilters] = useState("");
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [previewBookingData, setPreviewBookingData] = useState([]);
  const rowGetter = ({ index }) =>
    isShowPreview ? previewBookingData[index] : getDestination[index];

  const getPopularDestination = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllPopularDestinations`,
        {},
        {}
      );
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          setGetDestination(response.data.data);
          console.log(response);
        } else {
          NotificationManager.error(response.data.message);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(response.data.message);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    getPopularDestination();
  }, []);

  const submitExcelData = async () => {
    if (previewBookingData.length === 0) {
      NotificationManager.warning("No data available for upload.");
      return;
    }
    startLoading();
    try {
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/AddOrUpdatePopularDestinations`,
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

  const handleDeleteDestination = async (rowData) => {
    const { packageID } = rowData;

    startLoading();
    try {
      //debugger
      const response = await callApi(
        "DELETE",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/DeletePopularDestination/${packageID}`,
        {},
        {}
      );
      // console.log(response);

      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "Destination deleted successfully"
          );
          getPopularDestination();
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
    getPopularDestination();
  };

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Popular Destinations</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header ">
                    <div className="row">
                    <h2 className="col-5 font">{isShowPreview ? "Preview" : ""}</h2>
                    <div className="mb-3 text-end col-7">
                      {isShowPreview === false ? (
                        <UploadExcelButton
                          setPreviewData={setPreviewData}
                          otherData={otherData}
                        />
                      ) : null}
                      {isShowPreview === false ? (
                        <DownloadExcelButton
                          columns={Object.keys(popularDataExcelHeader)}
                          fileName={"Destination_Package_Sample"}
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
                  <div className="card-body">
                    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={
                              isShowPreview
                                ? previewBookingData
                                : getDestination
                            }
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
    </div>
  );
};

export default PopularDestinations;
