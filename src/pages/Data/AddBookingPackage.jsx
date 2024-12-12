import React, { useContext, useEffect, useState } from 'react';
import { FiPlus, FiDownload, FiTrash2 } from 'react-icons/fi'; // Feather Icons
import { LoadingContext } from '../../store/loading-context';
import { NotificationManager } from 'react-notifications';
import { callApi } from '../../General/GeneralMethod';
import { Column, Table, AutoSizer} from "react-virtualized";
import { headerRenderer } from '../../General/Common/VitualizedTable/SearchHeaderRenderer';
import DownloadExcelButton from '../../General/Buttons/DownloadExcelButton';

const AddBookingPackage = () => {

  const filterState = {
    packageName : '',
    description : '',
    basePrice : '',
    vehicleType : '',
    vehicleFuelType : ''
  }

  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [bookingData, setBookingData] = useState([])
  const [bookingfilters, setBookingFilters] = useState(filterState)
  const rowGetter = ({ index }) => bookingData[index];
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
      const response = await callApi("get",`Data/GetBookingPackages`,{},{});
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
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

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Add Booking Packages</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="mb-3 text-end">
                      <button className="btn btn-primary">
                        <FiPlus className="align-middle me-2" />
                        Upload Package List
                      </button>
                      <DownloadExcelButton columns={bookingData}/>
                      <button className="btn btn-success">Submit Data</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <h2>Preview</h2>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <div className="dataTables_filter">
                          <label>
                            Search:
                            <input
                              type="search"
                              className="form-control form-control-sm"
                              placeholder=""
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row dt-row">
                      <div className="col-sm-12">
                        <AutoSizer>
                          {({ height, width }) => (
                            <Table
                              width={1000} // Total width of the table
                              height={300} // Total height of the table
                              headerHeight={70} // Height of the header row
                              rowHeight={50} // Height of each row
                              rowCount={bookingData.length} // Total number of rows
                              rowGetter={rowGetter} // Function to retrieve data for a row
                              rowClassName={({ index }) =>
                                index % 2 === 0
                                  ? "virtualized-row"
                                  : "virtualized-row alternate"
                              }
                            >
                              {/* <Column label="userId" dataKey="userId" width={100} /> */}
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
                        </AutoSizer>
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
