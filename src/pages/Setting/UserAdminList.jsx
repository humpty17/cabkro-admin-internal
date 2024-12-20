import React, { useContext, useEffect, useState } from 'react';
import { FaFileExport } from "react-icons/fa";
import { NotificationManager } from 'react-notifications';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';
import { callApi } from '../../General/GeneralMethod';
import { LoadingContext } from '../../store/loading-context';


const UserAdminList = () => {
  const columns = [
    {
      label: "First Name",
      dataKey: "userFirstName",
      width: 200,
      
    },
    {
      label: "Last Name",
      dataKey: "userLastName",
      width: 200,
      
    },
    {
      label: "Phone No.",
      dataKey: "phoneNo",
      width: 150,
      
    },
    {
      label: "Email",
      dataKey: "userEmail",
      width: 250,
      
    },
    {
      label: "Date of Birth",
      dataKey: "dob",
      width: 150,
      
    },
  ];

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
  const [searchFilters, setSearchFilters]= useState(filterState)
  const rowGetter = ({ index }) => user[index];
  
  

  // Update filters and apply them
  // const handleFilterChange = (dataKey, value) => {
  //   setBookingFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [dataKey]: value,
  //   }));
  // };


  const userList = async() =>{
    startLoading();
    try {
      const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Auth/GetAdminUserList`,{},{});
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          console.log(user);
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
                        <FaFileExport className="align-middle me-2" /> Export
                        Data
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper">
                      <div className="row">
                        <div className="col-sm-12">
                          <VirtualizedTable tableData={user} tableSearchFilters={searchFilters} columns={columns} rowGetter={rowGetter}/>
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