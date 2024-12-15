import React, { useContext, useEffect, useState } from 'react'
import { FaFileExport, FaEdit, FaTrashAlt } from "react-icons/fa";
import { LoadingContext } from '../../store/loading-context';
import { callApi } from '../../General/GeneralMethod';
import { NotificationManager } from 'react-notifications';
import { Column, Table, AutoSizer} from "react-virtualized";
import { headerRenderer } from '../../General/Common/VitualizedTable/SearchHeaderRenderer';

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
  const [bookingfilters, setBookingFilters] = useState(filterState)
  const rowGetter = ({ index }) => user[index];

  // Update filters and apply them
  const handleFilterChange = (dataKey, value) => {
    setBookingFilters((prevFilters) => ({
      ...prevFilters,
      [dataKey]: value,
    }));
  };


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
                <div className="card table-height">
                  <div className="card-header">
                    <div className="mb-3 text-end">
                      <button className="btn btn-success">
                        <FaFileExport className="align-middle me-2" /> Export
                        Data
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper">
                      <div className="row">
                        <div className="col-sm-12">
                          <AutoSizer>
                            {({ height, width }) => (
                              <Table
                              width={850} // Total width of the table
                              height={300}  // Total height of the table
                                headerHeight={70} // Height of the header row
                                rowHeight={50} // Height of each row
                                rowCount={user.length} // Total number of rows
                                rowGetter={rowGetter} // Function to retrieve data for a row
                                rowClassName={({ index }) =>
                                  index % 2 === 0
                                    ? "virtualized-row"
                                    : "virtualized-row alternate"
                                }
                              >
                                {/* <Column label="userId" dataKey="userId" width={100} /> */}
                                <Column
                                  label="userFirstName"
                                  dataKey="userFirstName"
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
                                  label="userLastName"
                                  dataKey="userLastName"
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
                                  label="Phone No."
                                  dataKey="phoneNo"
                                  headerRenderer={(props) =>
                                    headerRenderer({
                                      ...props,
                                      bookingfilters,
                                      //handleFilterChange,
                                    })
                                  }
                                  width={150}
                                />
                                <Column
                                  label="Email"
                                  dataKey="userEmail"
                                  headerRenderer={(props) =>
                                    headerRenderer({
                                      ...props,
                                      bookingfilters,
                                      //handleFilterChange,
                                    })
                                  }
                                  width={250}
                                />
                                <Column
                                  label="dob"
                                  dataKey="dob"
                                  headerRenderer={(props) =>
                                    headerRenderer({
                                      ...props,
                                      bookingfilters,
                                      //handleFilterChange,
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAdminList