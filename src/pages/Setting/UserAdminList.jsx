import React, { useContext, useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { NotificationManager } from 'react-notifications';
import ExportButtton from '../../General/Buttons/ExportButtton';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';
import { ACTION, ADDUSERFORM, APICALLFAIL, APINULLERROR, DATE, DELETEDATAERROR, INT, SRNO, SRNOKEY, SRNOWIDTH, TEXT, WIDTH } from '../../General/ConstStates';
import { callApi, formatDateDDMMYYYY, getCurrentDateTime } from '../../General/GeneralMethod';
import { LoadingContext } from '../../store/loading-context';
import { CurrentPageContext } from '../../store/pages-context';


const UserAdminList = ({setEditData, setIsEdit}) => {
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      type : INT,
      isShow : true,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "First Name",
      dataKey: "userFirstName",
      type : TEXT,
      isShow : true,
      width: 200,
    },
    {
      label: "Last Name",
      dataKey: "userLastName",
      type : TEXT,
      isShow : true,
      width: 200,
    },
    {
      label: "Phone No.",
      dataKey: "phoneNo",
      type : INT,
      isShow : true,
      width: 150,
    },
    {
      label: "Email",
      dataKey: "userEmail",
      type : TEXT,
      isShow : true,
      width: 250,
    },
    {
      label: "Date of Birth",
      dataKey: "dob",
      type : DATE,
      isShow : true,
      width: 150,
      cellRenderer: ({ rowData }) => formatDateDDMMYYYY(rowData["dob"]),
    },
    {
      label: "Gender",
      dataKey: "gender",
      width: 150,
      type : TEXT,
      isShow : true,
      cellRenderer: ({ rowData }) =>
        rowData["gender"] === 2 ? "Female" : "Male",
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      isShow : true,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              handlePageClick(ADDUSERFORM);
              setEditData(rowData);
            }}
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
   userFirstName: "",
   userLastName: "",
   phoneNo: "",
   Email: "",
   dob: "",
 };

 const InitialUserAdmin = {
   userId: 0,
   userFirstName: "",
   userLastName: "",
   phoneNo: "",
   userEmail: "",
   password: "",
   gender: 0,
   dob: getCurrentDateTime(),
   emergencyContactNo: "",
   homeLocation: "",
   workLocation: "",
   paymentMethod: "",
   status: true,
   createdDate: getCurrentDateTime(),
   modifyDate: getCurrentDateTime(),
   isDeleted: true,
   deletedReason: "",
   referCode: "",
   lastLoginDate: getCurrentDateTime(),
   isAdult: true,
   noOfRide: 0,
   isCouponCode: "",
   other1: 0,
   other2: "",
   userImage: "",
   acceptTermsCondition: true,
 };

  const {startLoading, stopLoading} = useContext(LoadingContext)
  const {currentPage, handlePageClick} =useContext(CurrentPageContext)
  const [user, setUser] = useState([]);
  const [searchFilters, setSearchFilters]= useState(filterState)
  const rowGetter = ({ index }) => user[index];
  

  const userList = async() =>{
    startLoading();
    try {
      const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}Auth/GetAdminUserList`,{},{});
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
    finally{
      stopLoading()
    }
  }

  useEffect(() =>{
    userList()
  },[])

 const handleUserAdminDelete = async(rowData) =>{
  const { userId } = rowData;
      startLoading();
      try {
        debugger
        const response = await callApi(
          "DELETE",
          `${process.env.REACT_APP_API_URL_ADMIN}Auth/DeleteAdminUser/${userId}`,
          {},
          {}
        );
        // console.log(response);
  
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response?.data?.code === 200) {
            NotificationManager.success(
              response?.data?.message || "User deleted successfully"
            );
            startLoading();
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

//  const handleUserEdit = async () => {
//    startLoading();
//    try {
//      const response = await callApi(
//        "post",
//        `${process.env.REACT_APP_API_URL_ADMIN}Auth/UpdateAdminUser`,
//        { ...user },
//        {}
//      );
     
//      stopLoading();
//      if (response !== null && response !== undefined) {
//        if (response?.data?.code === 200) {
//          NotificationManager.success(
//            response?.data?.message || "User admin updated successfully"
//          );
//          setIsEdit(false);
//          userList();
//          setAddAdmin(response.data.data)
//        } else {
//          NotificationManager.error(response?.data?.message || UPDATEDATAERROR);
//        }
//      } else {
//        NotificationManager.error(APINULLERROR);
//      }
//    } catch (error) {
//      stopLoading();
//      console.error(APICALLFAIL, error);
//      NotificationManager.response(APICALLFAIL, error);
//    }
//  };

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">User Admin List</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="mb-3 text-end">
                      <ExportButtton
                        columns={columns}
                        fileName={"User_Admin_List"}
                        data={user}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper">
                      <div className="row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={user}
                            tableSearchFilters={searchFilters}
                            columns={columns}
                            rowGetter={rowGetter}
                          />
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