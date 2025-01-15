import React, { useContext, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi'; // Feather Icons
import { NotificationManager } from 'react-notifications';
import Swal from 'sweetalert2';
import CancelExcelButton from '../../General/Buttons/CancelExcelButton';
import DownloadExcelButton from '../../General/Buttons/DownloadExcelButton';
import SubmitExcelButton from '../../General/Buttons/SubmitExcelButton';
import UploadExcelButton from '../../General/Buttons/UploadExcelButton';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';
import { ACTION, APICALLFAIL, APINULLERROR, DELETEDATAERROR, SRNO, SRNOKEY, SRNOWIDTH, UPDATEDATAERROR, WIDTH } from '../../General/ConstStates';
import { callApi, getCurrentDateTime } from '../../General/GeneralMethod';
import { LoadingContext } from '../../store/loading-context';
import { LoginContext } from '../../store/login-context';
import ExportButtton from '../../General/Buttons/ExportButtton';

const AddBookingPackage = () => {
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
      label: "Discount Amount",
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
      label: "Adv Percentage",
      dataKey: "advancePercentage",
      width: 200,
    },
    {
      label: "Toll Tax Type",
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
      label: "Night Charges Type",
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
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "packageID",
      dataKey: "packageID",
      width: 200,
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
      label: "ratePerKM",
      dataKey: "ratePerKM",
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
      label: "extraService",
      dataKey: "extraService",
      width: 200,
    },
    {
      label: "other2",
      dataKey: "other2",
      width: 200,
    },
    {
      label: "totalAmount",
      dataKey: "totalAmount",
      width: 200,
    },
    {
      label: "luggageAllowed",
      dataKey: "luggageAllowed",
      width: 200,
    },
    {
      label: "advancePercentage",
      dataKey: "advancePercentage",
      width: 200,
    },
    {
      label: "tollTaxType",
      dataKey: "tollTaxType",
      width: 200,
    },
    {
      label: "tollTaxAmount",
      dataKey: "tollTaxAmount",
      width: 200,
    },
    {
      label: "petAnimal",
      dataKey: "petAnimal",
      width: 200,
    },
    {
      label: "petAnimalAmount",
      dataKey: "petAnimalAmount",
      width: 200,
    },
    {
      label: "extraLuggage",
      dataKey: "extraLuggage",
      width: 200,
    },
    {
      label: "extraLuggageAmount",
      dataKey: "extraLuggageAmount",
      width: 200,
    },
    {
      label: "driverChargesType",
      dataKey: "driverChargesType",
      width: 200,
    },
    {
      label: "driverChargesAmount",
      dataKey: "driverChargesAmount",
      width: 200,
    },
    {
      label: "nightChargesType",
      dataKey: "nightChargesType",
      width: 200,
    },
    {
      label: "nightChargesAmount",
      dataKey: "nightChargesAmount",
      width: 200,
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

  const bookingList = async() =>{
    startLoading();
    try {
      const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Data/GetBookingPackages`,{},{});
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          setBookingData([...response?.data?.data] || [])
        } else {
          NotificationManager.error(response.data.message);
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
  }

  useEffect(() =>{
    bookingList()
  },[])

  // Function to delete a row
    const handleDeleteAction = (rowData, rowIndex) => {
      debugger;
      console.log(rowIndex);
      
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (isShowPreview) {
            handleDeleteFromPreview(rowIndex);
          } else {
            handleDeleteBookingPackage(rowData);
          }
        }
      });
    };

  //DELETE VEHICLE FROM LIST
    const handleDeleteBookingPackage = async (rowData)=>{
      const { packageID } = rowData;
      startLoading();
      try {
        debugger
        const response = await callApi(
          "delete",
          `${process.env.REACT_APP_API_URL_ADMIN}Data/UpdateBookingPackages/${packageID}`,
          { ...rowData, isActive: false },
          {}
        );
        // console.log(response);
  
        if (response !== null && response !== undefined) {
          if (response?.data?.code === 200) {
            NotificationManager.success(
              response?.data?.message || "Booking package deleted successfully"
            );
            bookingList();
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
      debugger
      const updatedData = [...previewBookingData];
      updatedData.splice(rowIndex, 1);
      setPreviewBookingData(updatedData);
    }

  const submitExcelData = async ()=>{
    if(previewBookingData.length === 0){
      NotificationManager.warning("No data available for upload.")
      return
    }
    startLoading()
    try{
      const response = await callApi("post",`${process.env.REACT_APP_API_URL_ADMIN}Data/AddBookingPackages`,previewBookingData,{});
      
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
         NotificationManager.success(response?.data?.message || "Data updated successfully")
         handleReset()
        } else {
           NotificationManager.error(response?.data?.message || UPDATEDATAERROR);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(APINULLERROR);
      }
    }
    catch(err){
      NotificationManager.error(APICALLFAIL)
    }
    finally{
      stopLoading();
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
                    <h2 className="col-3">{isShowPreview ? "Preview" : ""}</h2>
                    <div className="mb-3 text-end col-9">
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
                      {isShowPreview === false ?<ExportButtton columns={excelColumns}
                        fileName={"Booking_Packages_List"}
                        data={bookingData}></ExportButtton> : null}
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
