import React, { useContext, useEffect, useState } from 'react';
import { FaFileExport } from "react-icons/fa";
import { NotificationManager } from 'react-notifications';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';
import { callApi } from '../../General/GeneralMethod';
import { LoadingContext } from '../../store/loading-context';
import ExportButtton from '../../General/Buttons/ExportButtton';
import { ACTION, APICALLFAIL, APINULLERROR, DELETEDATAERROR } from '../../General/ConstStates';
import { FiEdit, FiTrash2 } from 'react-icons/fi';


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
    {
      label: ACTION,
      dataKey: ACTION,
      width: 150,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            // onClick={() => {
            //   setIsEditMode(true);
            //   setAddFaq(rowData);
            // }}
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
             onClick={() => handleUserAdminDelete(rowData)}
          />
        </div>
      ),
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

 const handleUserAdminDelete = async(rowData) =>{
  const { userId } = rowData;
      startLoading();
      try {
        //debugger
        const response = await callApi(
          "delete",
          `${process.env.REACT_APP_API_URL_ADMIN}Data/GetVehicleListById/${userId}`,
          { },
          {}
        );
        // console.log(response);
  
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response?.data?.code === 200) {
            NotificationManager.success(
              response?.data?.message || "user admin deleted successfully"
            );
            userList();
          } else {
            NotificationManager.error(response?.data?.message || DELETEDATAERROR);
          }
        } else {
          NotificationManager.error(APINULLERROR);
        }
      } catch (error) {
        stopLoading();
        console.error(APICALLFAIL, error);
        NotificationManager.error(APICALLFAIL, error);
      }
 }

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
                      <ExportButtton columns={columns} fileName={"User_Admin_List"} data={user}/>
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