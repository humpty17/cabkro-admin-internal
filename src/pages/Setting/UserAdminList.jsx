import React, { useContext, useEffect, useState } from 'react'
import { FaFileExport, FaEdit, FaTrashAlt } from "react-icons/fa";
import { LoadingContext } from '../../store/loading-context';
import { callApi } from '../../General/GeneralMethod';
import { NotificationManager } from 'react-notifications';
import { Column, Table } from "react-virtualized";

const UserAdminList = () => {
  const customers = [
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

  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [user, setUser] = useState('');
  const rowGetter = ({ index }) => user[index];
  console.log(user);
  

  const userList = async() =>{
    startLoading();
    try {
      const response = await callApi("get",`Auth/GetAdminUserList`,{},{});
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          setUser(response.data.data)
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
    userList()
  },[])

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Customer List</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="mb-3 text-end">
                      <button className="btn btn-success">
                        <FaFileExport className="align-middle me-2" /> Export Data
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper">
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <label>
                            Show{" "}
                            <select
                              name="entries"
                              className="form-select form-select-sm"
                            >
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>{" "}
                            entries
                          </label>
                        </div>
                        <div className="col-sm-12 col-md-6 text-end">
                          <label>
                            Search:{" "}
                            <input
                              type="search"
                              className="form-control form-control-sm"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="row">
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
                              {customers.map((customer, index) => (
                                <tr key={index}>
                                  <td>{customer.name}</td>
                                  <td>{customer.position}</td>
                                  <td>{customer.office}</td>
                                  <td>{customer.age}</td>
                                  <td>{customer.startDate}</td>
                                  <td>{customer.salary}</td>
                                  <td>
                                    <FaEdit className="align-middle me-3" />
                                    <FaTrashAlt className="align-middle" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table> */}
                          <Table
                            width={1000} // Total width of the table
                            height={300} // Total height of the table
                            headerHeight={40} // Height of the header row
                            rowHeight={50} // Height of each row
                            rowCount={user.length} // Total number of rows
                            rowGetter={rowGetter} // Function to retrieve data for a row
                            className="table table-striped"
                          >
                            {/* <Column label="userId" dataKey="userId" width={100} /> */}
                            <Column label="userFirstName"  dataKey="userFirstName" width={300} />
                            <Column label="userLastName" dataKey="userLastName" width={300} />
                            <Column label="Phone No." dataKey="phoneNo" width={150} />
                            <Column label="Email" dataKey="userEmail" width={250} />
                            <Column label="dob" dataKey="dob" width={250} />
                          </Table>
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

export default UserAdminList