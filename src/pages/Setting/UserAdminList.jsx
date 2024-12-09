import React, { useContext, useEffect, useState } from 'react'
import { FaFileExport, FaEdit, FaTrashAlt } from "react-icons/fa";
import { LoadingContext } from '../../store/loading-context';
import { callApi } from '../../General/GeneralMethod';
import { NotificationManager } from 'react-notifications';
import { Column, Table, AutoSizer} from "react-virtualized";

const UserAdminList = () => {
 const filterState = {
  userFirstName : '',
  userLastName : '',
  phoneNo : '',
  Email : '',
  dob : ''
  }

  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [user, setUser] = useState('');
  const [filters, setFilters] = useState(filterState)
  const rowGetter = ({ index }) => user[index];

  // Update filters and apply them
  const handleFilterChange = (column, value) => {
    const newFilters = { ...filters, [column]: value };
    setFilters(newFilters);

    // Apply filters to the data
    const newData = user.filter((row) =>
      Object.keys(newFilters).every((key) => {
        if (!newFilters[key]) return true; // No filter applied for this column
        return row[key].toString().toLowerCase().includes(newFilters[key].toLowerCase());
      })
    );

    setUser(newData);
  };

   // Render header with search inputs
   const headerRenderer = ({ dataKey, label }) => (
    <div>
      <div>{label}</div>
      <input
        type="text"
        placeholder={`Search ${label}`}
        value={filters[dataKey]}
        //onChange={(e) => handleFilterChange(dataKey, e.target.value)}
        style={{ width: "70%", padding: "4px", marginTop: "1px" }}
      />
    </div>
  );

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
            <h1 className="h3 mb-3">UserAdminList</h1>
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
                          <AutoSizer>
                          {({ height, width }) => (
                          <Table
                            width={1000} // Total width of the table
                            height={300} // Total height of the table
                            headerHeight={70} // Height of the header row
                            rowHeight={50} // Height of each row
                            rowCount={user.length} // Total number of rows
                            rowGetter={rowGetter} // Function to retrieve data for a row
                            className="table table-striped"
                          >
                            {/* <Column label="userId" dataKey="userId" width={100} /> */}
                            <Column label="userFirstName"  dataKey="userFirstName" headerRenderer={headerRenderer} width={300} />
                            <Column label="userLastName" dataKey="userLastName" headerRenderer={headerRenderer} width={300} />
                            <Column label="Phone No." dataKey="phoneNo" headerRenderer={headerRenderer} width={150} />
                            <Column label="Email" dataKey="userEmail" headerRenderer={headerRenderer} width={250} />
                            <Column label="dob" dataKey="dob" headerRenderer={headerRenderer} width={250} />
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAdminList