import React, { useContext, useEffect, useState } from 'react';
import { FiPlus, FiDownload, FiTrash2 } from 'react-icons/fi'; // Feather Icons
import { LoadingContext } from '../../store/loading-context';
import { NotificationManager } from 'react-notifications';
import { callApi, getCurrentDateTime } from '../../General/GeneralMethod';
import { Column, Table, AutoSizer} from "react-virtualized";
import { headerRenderer } from '../../General/Common/VitualizedTable/SearchHeaderRenderer';
import DownloadExcelButton from '../../General/Buttons/DownloadExcelButton';
import UploadExcelButton from '../../General/Buttons/UploadExcelButton';
import { LoginContext } from '../../store/login-context';
import CancelExcelButton from '../../General/Buttons/CancelExcelButton';
import SubmitExcelButton from '../../General/Buttons/SubmitExcelButton';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';
import { ACTION, UPDATEDATAERROR, WIDTH } from '../../General/ConstStates';
import { FaTrash } from 'react-icons/fa';

const AddBookingPackage = () => {
  const columns = [
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
      label: "Price",
      dataKey: "basePrice",
      width: 200,
    },
    {
      label: "Type",
      dataKey: "vehicleType",
      width: 200,
    },
    {
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
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
      label: "Rate/Km",
      dataKey: "ratePerKM",
      width: 200,
    },
    {
      label: "Price",
      dataKey: "basePrice",
      width: 200,
    },
    {
      label: "Rate",
      dataKey: "discountRate",
      width: 200,
    },
    {
      label: "Amount",
      dataKey: "discountAmount",
      width: 200,
    },
    {
      label: "Type",
      dataKey: "vehicleType",
      width: 200,
    },
    {
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
      width: 200,
    },
    {
      label: "Model Name",
      dataKey: "vehicleModelName",
      width: 200,
    },
    {
      label: "Seater Count",
      dataKey: "vehicleSeaterCount",
      width: 200,
    },
    {
      label: "GST Rate",
      dataKey: "gstRate",
      width: 200,
    },
    {
      label: "GST Amount",
      dataKey: "gstAmount",
      width: 200,
    },
    {
      label: "Offer Description",
      dataKey: "offerDescription",
      width: 200,
    },
    {
      label: "Service",
      dataKey: "extraService",
      width: 200,
    },
    {
      label: "Other",
      dataKey: "other2",
      width: 200,
    },
    {
      label: "Total Amount",
      dataKey: "totalAmount",
      width: 200,
    },
    {
      label: "Luggage Allowed",
      dataKey: "luggageAllowed",
      width: 200,
    },
    {
      label: "Percentage",
      dataKey: "advancePercentage",
      width: 200,
    },
    {
      label: "Toll Tax",
      dataKey: "tollTaxType",
      width: 200,
    },
    {
      label: "Toll Tax Amount",
      dataKey: "tollTaxAmount",
      width: 200,
    },
    {
      label: "Pet Animal",
      dataKey: "petAnimal",
      width: 200,
    },
    {
      label: "Pet Animal Amount",
      dataKey: "petAnimalAmount",
      width: 200,
    },
    {
      label: "Extra Luggage",
      dataKey: "extraLuggage",
      width: 200,
    },
    {
      label: "Extra Luggage Amount",
      dataKey: "extraLuggageAmount",
      width: 200,
    },
    {
      label: "Driver Charges Type",
      dataKey: "driverChargesType",
      width: 200,
    },
    {
      label: "Driver Charges Amount",
      dataKey: "driverChargesAmount",
      width: 200,
    },
    {
      label: "Night Charges",
      dataKey: "nightChargesType",
      width: 200,
    },
    {
      label: "Night Charges  Amount",
      dataKey: "nightChargesAmount",
      width: 200,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            // onClick={() => handleDelete(rowData)}
          />
        </div>
      ),
    },
  ];
  
  const {user} = useContext(LoginContext)
  const filterState = {
    packageName : '',
    description : '',
    basePrice : '',
    vehicleType : '',
    vehicleFuelType : ''
  }

  const bookingDataExcelHeaader = {
    "packageName": "",
    "description": "",
    "minDistance": 0,
    "maxDistance": 0.0,
    "ratePerKM": 0.0,
    "basePrice": 0,
    "discountRate": 0,
    "discountAmount": 0,
    "vehicleType": "",
    "vehicleFuelType": "",
    "vehicleModelName": "",
    "vehicleSeaterCount": 0,
    // "pickupAd  dress": "",
    // "destinationAddress": "",
    // "pickupLatLong": 0,
    // "destinationLatLong": 0,
    // "timeDurationHours": 0,
    // "dayCount": 0,
    // "specificDay": 0,
    // "specificDate": 0,
    // "offerPrice": 0,
    // "rentalHours": 0,
    // "rentaldays": 0,
    // "plusMember": 0,
    "gstRate": 0,
    "gstAmount": 0,
    "offerDescription": "",
    // "breakFast": false,
    // "lunch": false,
    // "dinner": false,
    "extraService": "",
    // "createdDate": getCurrentDateTime(),
    // "modifyDate": getCurrentDateTime(),
    // "userId": 0,
    // "isActive": true,
    // "isDeleted": false,
    // "other1": 0,
    "other2": "",
    "totalAmount": 0,
    "luggageAllowed": "",
    "advancePercentage": 0,
    "tollTaxType": "",
    "tollTaxAmount": 0,
    "petAnimal": "",
    "petAnimalAmount": 0,
    "extraLuggage": "",
    "extraLuggageAmount": 0,
    "driverChargesType": "",
    "driverChargesAmount": 0,
    "nightChargesType": "",
    "nightChargesAmount": 0
  }
  
  const otherData = {
    "createdDate": getCurrentDateTime(),
    "modifyDate": getCurrentDateTime(),
    "userId": user ? user.userId : 0,
    "isActive": true,
    "isDeleted": false,
  }

  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [bookingData, setBookingData] = useState([])
  const [searchFilters, setSearchFilters] = useState(filterState)
  const [isShowPreview, setIsShowPreview] = useState(false)
  const [previewBookingData, setPreviewBookingData] = useState([])
  const rowGetter = ({ index }) => isShowPreview ? previewBookingData[index] : bookingData[index];
 // console.log(bookingData);

  const handleFilterChange = (dataKey, value) => {
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [dataKey]: value,
    }));
  };

  const bookingList = async() =>{
    startLoading();
    try {
      const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Data/GetBookingPackages`,{},{});
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          //console.log(bookingData)
          setBookingData(response.data.data)
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
  }

  useEffect(() =>{
    bookingList()
  },[])

  

  const submitExcelData = async ()=>{
    if(previewBookingData.length === 0){
      NotificationManager.warning("No data available for upload.")
      return
    }
    startLoading()
    try{
      const response = await callApi("post",`${process.env.REACT_APP_API_URL_ADMIN}Data/AddBookingPackages`,previewBookingData,{});
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
         NotificationManager.success(response.data.message)
         handleReset()
        } else {
           NotificationManager.error(response?.data?.message || UPDATEDATAERROR);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(response.data.message);
      }
    }
    catch(err){
      stopLoading()
    }
  }

  const setPreviewData = (data)=>{
    setIsShowPreview(true)
    setPreviewBookingData(data)
  }

  const handleCancelClick = ()=>{
    setIsShowPreview(false)
    setPreviewBookingData(false)
  }

  const handleReset = ()=>{
    setIsShowPreview(false)
    setPreviewBookingData([])
    bookingList()
  }
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Booking Packages</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                  <div className='row'>
                    <h2 className="col-5">{isShowPreview ? "Preview" : ""}</h2>
                    <div className="mb-3 text-end col-7">
                      {isShowPreview === false ? (
                        <UploadExcelButton
                          setPreviewData={setPreviewData}
                          otherData={otherData}
                          buttonName={"Upload Booking Packages"}
                        />
                      ) : null}
                      {isShowPreview === false ? (
                        <DownloadExcelButton
                          columns={Object.keys(bookingDataExcelHeaader)}
                          fileName={"Booking_Package_Sample"}
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
                    <div className="row dt-row">
                      <div className="col-sm-12">
                        <VirtualizedTable tableData={isShowPreview ? previewBookingData : bookingData} tableSearchFilters={searchFilters} columns={columns} rowGetter={rowGetter}/>
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

export default AddBookingPackage;
