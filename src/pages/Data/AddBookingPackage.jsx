import React, { useContext, useEffect, useState } from 'react';
import { FiPlus, FiDownload, FiTrash2 } from 'react-icons/fi'; // Feather Icons
import { LoadingContext } from '../../store/loading-context';
import { NotificationManager } from 'react-notifications';
import { callApi } from '../../General/GeneralMethod';
import { Column, Table, AutoSizer} from "react-virtualized";

const AddBookingPackage = () => {
  const tableData = [
    {
      name: "Airi Satou",
      position: "Accountant",
      office: "Tokyo",
      age: 33,
      startDate: "2018/11/28",
      salary: "$162,700",
    },
    {
      name: "Angelica Ramos",
      position: "Chief Executive Officer (CEO)",
      office: "London",
      age: 47,
      startDate: "2019/10/09",
      salary: "$1,200,000",
    },
    {
      name: "Ashton Cox",
      position: "Junior Technical Author",
      office: "San Francisco",
      age: 66,
      startDate: "2019/01/12",
      salary: "$86,000",
    },
    {
      name: "Bradley Greer",
      position: "Software Engineer",
      office: "London",
      age: 41,
      startDate: "2022/10/13",
      salary: "$132,000",
    },
    {
      name: "Brenden Wagner",
      position: "Software Engineer",
      office: "San Francisco",
      age: 28,
      startDate: "2023/06/07",
      salary: "$206,850",
    },
    {
      name: "Brielle Williamson",
      position: "Integration Specialist",
      office: "New York",
      age: 61,
      startDate: "2022/12/02",
      salary: "$372,000",
    },
    {
      name: "Bruno Nash",
      position: "Software Engineer",
      office: "London",
      age: 38,
      startDate: "2023/05/03",
      salary: "$163,500",
    },
    {
      name: "Caesar Vance",
      position: "Pre-Sales Support",
      office: "New York",
      age: 21,
      startDate: "2023/12/12",
      salary: "$106,450",
    },
    {
      name: "Cara Stevens",
      position: "Sales Assistant",
      office: "New York",
      age: 46,
      startDate: "2023/12/06",
      salary: "$145,600",
    },
    {
      name: "Cedric Kelly",
      position: "Senior Javascript Developer",
      office: "Edinburgh",
      age: 22,
      startDate: "2022/03/29",
      salary: "$433,060",
    },
  ];

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

  const headerRenderer = ({ dataKey, label }) => (
    <div>
      <div>{label}</div>
      <input
        type="text"
        placeholder={`Search ${label}`}
        value={bookingfilters[dataKey]}
        //onChange={(e) => handleFilterChange(dataKey, e.target.value)}
        style={{ width: "70%", padding: "4px", marginTop: "1px" }}
      />
    </div>
  );

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
                      <button className="btn btn-secondary">
                        <FiDownload className="align-middle me-2" />
                        Download sample
                      </button>
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
                        {/* <table className="table table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Office</th>
                              <th>Age</th>
                              <th>Start Date</th>
                              <th>Salary</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, index) => (
                              <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.position}</td>
                                <td>{row.office}</td>
                                <td>{row.age}</td>
                                <td>{row.startDate}</td>
                                <td>{row.salary}</td>
                                <td>
                                  <FiTrash2 className="align-middle" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table> */}
                        <AutoSizer>
                          {({ height, width }) => (
                          <Table
                            width={1000} // Total width of the table
                            height={300} // Total height of the table
                            headerHeight={70} // Height of the header row
                            rowHeight={50} // Height of each row
                            rowCount={bookingData.length} // Total number of rows
                            rowGetter={rowGetter} // Function to retrieve data for a row
                            className="table table-striped"
                          >
                            {/* <Column label="userId" dataKey="userId" width={100} /> */}
                            <Column label="packageName"  dataKey="packageName" headerRenderer={headerRenderer} width={300} />
                            <Column label="description" dataKey="description" headerRenderer={headerRenderer} width={300} />
                            <Column label="basePrice" dataKey="basePrice" headerRenderer={headerRenderer} width={150} />
                            <Column label="vehicleType" dataKey="vehicleType" headerRenderer={headerRenderer} width={250} />
                            <Column label="vehicleFuelType" dataKey="vehicleFuelType" headerRenderer={headerRenderer} width={250} />
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
