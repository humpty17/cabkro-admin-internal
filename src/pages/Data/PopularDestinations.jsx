import "bootstrap/dist/css/bootstrap.css";
import React, { useContext, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import "react-virtualized/styles.css";
import Swal from "sweetalert2";
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
  SRNO,
  SRNOKEY,
  SRNOWIDTH,
  UPDATEDATAERROR,
  WIDTH,
} from "../../General/ConstStates";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { LoginContext } from "../../store/login-context";
import ExportButtton from "../../General/Buttons/ExportButtton";

const PopularDestinations = () => {
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
      
    },
    {
      label: "Name",
      dataKey: "packageName",
      width: 200,
    },
    {
      label: "Description",
      dataKey: "description",
      width: 200,
    },
    {
      label: "Pickup City",
      dataKey: "pickupCity",
      width: 200,
    },
    {
      label: "Destination City",
      dataKey: "destinationCity",
      width: 200,
    },
    {
      label: "Min Distance",
      dataKey: "minDistance",
      width: 200,
    },
    {
      label: "Max Distance",
      dataKey: "maxDistance",
      width: 200,
    },
    {
      label: "Base Price",
      dataKey: "basePrice",
      width: 200,
    },
    {
      label: "Discount Rate",
      dataKey: "discountRate",
      width: 200,
    },
    {
      label: "Discount Amt",
      dataKey: "discountAmount",
      width: 200,
    },
    {
      label: "Vehicle Type",
      dataKey: "vehicleType",
      width: 200,
    },
    {
      label: "Vehicle Fuel Type",
      dataKey: "vehicleFuelType",
      width: 200,
    },
    {
      label: "Vehicle Model Name",
      dataKey: "vehicleModelName",
      width: 200,
    },
    {
      label: "Vehicle Seater Count",
      dataKey: "vehicleSeaterCount",
      width: 200,
    },
    {
      label: "PickUp Address",
      dataKey: "pickupAddress",
      width: 200,
    },
    {
      label: "Destination Address",
      dataKey: "destinationAddress",
      width: 200,
    },
    {
      label: "Time Duration Hrs",
      dataKey: "timeDurationHours",
      width: 200,
    },
    {
      label: "Day Count",
      dataKey: "dayCount",
      width: 200,
    },
    {
      label: "Offer Price",
      dataKey: "offerPrice",
      width: 200,
    },
    {
      label: "Rental Days",
      dataKey: "rentaldays",
      width: 200,
    },
    {
      label: "Plus Member",
      dataKey: "plusMember",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["plusMember"] ?  "Yes" : "No"
    },
    {
      label: "GST Rate",
      dataKey: "gstRate",
      width: 200,
    },
    {
      label: "GST Amt",
      dataKey: "gstAmount",
      width: 200,
    },
    {
      label: "Offer Description",
      dataKey: "offerDescription",
      width: 200,
    },
    {
      label: "BreakFast",
      dataKey: "breakFast",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["breakFast"] ?  "Yes" : "No"
    },
    {
      label: "Lunch",
      dataKey: "lunch",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["lunch"] ?  "Yes" : "No"
    },
    {
      label: "Dinner",
      dataKey: "dinner",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["dinner"] ?  "Yes" : "No"
    },
    {
      label: "Extra Service",
      dataKey: "extraService",
      width: 200,
    },
    {
      label: "Other 2",
      dataKey: "other2",
      width: 200,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
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

  const excelColumns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      cellRenderer: ({ rowIndex }) => rowIndex + 1
    },
    {
      label: "packageID",
      dataKey: "packageID",
      width: 100,
      cellRenderer: ({ rowIndex }) => rowIndex + 1
    },
    {
      label: "packageName",
      dataKey: "packageName",
      width: 200,
    },
    {
      label: "description",
      dataKey: "description",
      width: 200,
    },
    {
      label: "pickupCity",
      dataKey: "pickupCity",
      width: 200,
    },
    {
      label: "destinationCity",
      dataKey: "destinationCity",
      width: 200,
    },
    {
      label: "minDistance",
      dataKey: "minDistance",
      width: 200,
    },
    {
      label: "maxDistance",
      dataKey: "maxDistance",
      width: 200,
    },
    {
      label: "basePrice",
      dataKey: "basePrice",
      width: 200,
    },
    {
      label: "discountRate",
      dataKey: "discountRate",
      width: 200,
    },
    {
      label: "discountAmount",
      dataKey: "discountAmount",
      width: 200,
    },
    {
      label: "vehicleType",
      dataKey: "vehicleType",
      width: 200,
    },
    {
      label: "vehicleFuelType",
      dataKey: "vehicleFuelType",
      width: 200,
    },
    {
      label: "vehicleModelName",
      dataKey: "vehicleModelName",
      width: 200,
    },
    {
      label: "vehicleSeaterCount",
      dataKey: "vehicleSeaterCount",
      width: 200,
    },
    {
      label: "pickupAddress",
      dataKey: "pickupAddress",
      width: 200,
    },
    {
      label: "destinationAddress",
      dataKey: "destinationAddress",
      width: 200,
    },
    {
      label: "timeDurationHours",
      dataKey: "timeDurationHours",
      width: 200,
    },
    {
      label: "dayCount",
      dataKey: "dayCount",
      width: 200,
    },
    {
      label: "offerPrice",
      dataKey: "offerPrice",
      width: 200,
    },
    {
      label: "rentaldays",
      dataKey: "rentaldays",
      width: 200,
    },
    {
      label: "plusMember",
      dataKey: "plusMember",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["plusMember"] ?  "Yes" : "No"
    },
    {
      label: "gstRate",
      dataKey: "gstRate",
      width: 200,
    },
    {
      label: "gstAmount",
      dataKey: "gstAmount",
      width: 200,
    },
    {
      label: "offerDescription",
      dataKey: "offerDescription",
      width: 200,
    },
    {
      label: "breakFast",
      dataKey: "breakFast",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["breakFast"] ?  "Yes" : "No"
    },
    {
      label: "lunch",
      dataKey: "lunch",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["lunch"] ?  "Yes" : "No"
    },
    {
      label: "dinner",
      dataKey: "dinner",
      width: 200,
      cellRenderer: ({ rowData }) => rowData["dinner"] ?  "Yes" : "No"
    },
    {
      label: "extraService",
      dataKey: "extraService",
      width: 200,
    },
    {
      label: "other2",
      dataKey: "other2",
      width: 200,
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
    // pickupLatLong: 0,
    // destinationLatLong: 0,
    timeDurationHours: 0,
    dayCount: 0,
    // specificDay: 0,
    // specificDate: 0,
    offerPrice: 0,
    // rentalHours: 0,
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
    // other1: 0,
    other2: "",
  };

  const otherData = {
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
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          setGetDestination([...response?.data?.data] || []);
        } else {
          NotificationManager.error(response?.data?.message || "No records found");
        }
      } else {
        NotificationManager.warning(APINULLERROR);
      }
    } catch (error) {
      console.error("API call failed:", error);
      NotificationManager.error(APICALLFAIL)
    }
    finally{
      stopLoading()
    }
  };

  useEffect(() => {
    getPopularDestination();
  }, []);

  const submitExcelData = async () => {
    debugger
    if (previewBookingData.length === 0) {
      NotificationManager.warning("No data available for upload.");
      return;
    }
    startLoading();
    previewBookingData.forEach((data,index)=>{
      data.breakFast.toLowerCase() === "true" ? data.breakFast = true : data.breakFast = false
      data.lunch.toLowerCase() === "true" ? data.lunch = true : data.lunch = false
      data.dinner.toLowerCase() === "true" ? data.dinner = true : data.dinner = false 
    })
    try {
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/AddOrUpdatePopularDestinations`,
        [...previewBookingData],
        {}
      );
      //console.log(response);
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          NotificationManager.success(response?.data?.message || "Destination uploaded successfully");
          handleReset();
        } else {
          NotificationManager.error(response?.data?.message || UPDATEDATAERROR);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(APINULLERROR);
      }
    } catch (err) {
      // stopLoading();
      console.log(err)
      NotificationManager.warning(APICALLFAIL);
    }
    finally{
      stopLoading()
    }
  };

  // Function to delete a row
  const handleDeleteAction = (rowData, rowIndex) => {
      debugger
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
          handleDeletePreviewDestination(rowIndex)
        }
        else{
          handleDeleteDestination(rowData)
        }
      }
    });
  };

  //DELETE VEHICLE FROM PREVIEW
  const handleDeletePreviewDestination = (rowIndex) =>{
    const updatedData = [...previewBookingData];
      updatedData.splice(rowIndex, 1);
      setPreviewBookingData(updatedData);
  }

  //DELETE VEHICLE FROM LIST
  const handleDeleteDestination = async (rowData) => {
      const { packageID } = rowData;
      startLoading();
      try {
        const response = await callApi(
          "DELETE",
          `${process.env.REACT_APP_API_URL_ADMIN}Data/DeletePopularDestination/${packageID}`,
          {},
          {}
        );
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
        console.error(APICALLFAIL, error);
        NotificationManager.error(APICALLFAIL);
      }
      finally{
        stopLoading()
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
                    <h2 className="col-3 font">{isShowPreview ? "Preview" : ""}</h2>
                    <div className="mb-3 text-end col-9">
                      {isShowPreview === false ? (
                        <UploadExcelButton
                          setPreviewData={setPreviewData}
                          otherData={otherData}
                          buttonName={"Upload Popular Destinations"}
                        />
                      ) : null}
                      {isShowPreview === false ? (
                        <DownloadExcelButton
                          columns={Object.keys(popularDataExcelHeader)}
                          fileName={"Popular_Destinations_Sample"}
                        />
                      ) : null}
                      {isShowPreview === false ? <ExportButtton
                        columns={excelColumns}
                        fileName={"Popular_Destinations_List"}
                        data={getDestination}
                      /> : null}
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
