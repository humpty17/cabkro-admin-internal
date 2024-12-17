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

const AddBookingPackage = () => {
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
      label: "Price",
      dataKey: "basePrice",
      width: 150,
    },
    {
      label: "VehicleType",
      dataKey: "vehicleType",
      width: 250,
    },
    {
      label: "VehicleFuelType",
      dataKey: "vehicleFuelType",
      width: 250,
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
    "pickupAddress": "",
    "destinationAddress": "",
    "pickupLatLong": 0,
    "destinationLatLong": 0,
    "timeDurationHours": 0,
    "dayCount": 0,
    "specificDay": 0,
    "specificDate": 0,
    "offerPrice": 0,
    "rentalHours": 0,
    "rentaldays": 0,
    "plusMember": 0,
    "gstRate": 0,
    "gstAmount": 0,
    "offerDescription": "",
    "breakFast": false,
    "lunch": false,
    "dinner": false,
    "extraService": "",
    // "createdDate": getCurrentDateTime(),
    // "modifyDate": getCurrentDateTime(),
    // "userId": 0,
    // "isActive": true,
    // "isDeleted": false,
    "other1": 0,
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
  const [bookingfilters, setBookingFilters] = useState(filterState)
  const [isShowPreview, setIsShowPreview] = useState(false)
  const [previewBookingData, setPreviewBookingData] = useState([])
  const rowGetter = ({ index }) => isShowPreview ? previewBookingData[index] : bookingData[index];
 // console.log(bookingData);

  const handleFilterChange = (dataKey, value) => {
    setBookingFilters((prevFilters) => ({
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
          console.log(bookingData)
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

  const setPreviewData = (data)=>{
    setIsShowPreview(true)
    setPreviewBookingData(data)
  }

  const handleCancelClick = ()=>{
    setIsShowPreview(false)
    setPreviewBookingData(false)
  }

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
          NotificationManager.error(response.data.message);
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
            <h1 className="h3 mb-3">Add Booking Packages</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
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
                  <div className="card-body">
                    <div className="row dt-row">
                      <div className="col-sm-12" style={{}}>
                        {/* <AutoSizer>
                          {({ height, width }) => (
                            <Table
                              width={850} // Total width of the table
                              height={300} // Total height of the table
                              headerHeight={70} // Height of the header row
                              rowHeight={50} // Height of each row
                              rowCount={
                                isShowPreview
                                  ? previewBookingData.length
                                  : bookingData.length
                              } // Total number of rows
                              rowGetter={rowGetter} // Function to retrieve data for a row
                              rowClassName={({ index }) =>
                                index % 2 === 0
                                  ? "virtualized-row"
                                  : "virtualized-row alternate"
                              }
                            >
                              <Column
                                label="packageName"
                                className="virtualized-header"
                                dataKey="packageName"
                                headerRenderer={(props) =>
                                  headerRenderer({
                                    ...props,
                                    bookingfilters,
                                    //handleFilterChange,
                                  })
                                }
                                width={300}
                              />
                              <Column
                                label="description"
                                className="virtualized-header"
                                dataKey="description"
                                headerRenderer={(props) =>
                                  headerRenderer({
                                    ...props,
                                    bookingfilters,
                                    // handleFilterChange,
                                  })
                                }
                                width={300}
                              />
                              <Column
                                label="basePrice"
                                className="virtualized-header"
                                dataKey="basePrice"
                                headerRenderer={(props) =>
                                  headerRenderer({
                                    ...props,
                                    bookingfilters,
                                    // handleFilterChange,
                                  })
                                }
                                width={150}
                              />
                              <Column
                                label="vehicleType"
                                className="virtualized-header"
                                dataKey="vehicleType"
                                headerRenderer={(props) =>
                                  headerRenderer({
                                    ...props,
                                    bookingfilters,
                                    // handleFilterChange,
                                  })
                                }
                                width={250}
                              />
                              <Column
                                label="vehicleFuelType"
                                className="virtualized-header"
                                dataKey="vehicleFuelType"
                                headerRenderer={(props) =>
                                  headerRenderer({
                                    ...props,
                                    bookingfilters,
                                    // handleFilterChange,
                                  })
                                }
                                width={250}
                              />
                            </Table>
                          )}
                        </AutoSizer> */}
                        <VirtualizedTable rowCountAdd={isShowPreview ? previewBookingData : bookingData} bookingfilters={bookingfilters} columns={columns} rowGetter={rowGetter}/>
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
