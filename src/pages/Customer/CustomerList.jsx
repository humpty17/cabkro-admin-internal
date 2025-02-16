import React, { useContext, useEffect, useState } from "react";
import { FiEdit, FiEdit2, FiTrash2 } from "react-icons/fi";
import { callApi, formatDateDDMMYYYY, getCurrentDateTime } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { ACTION, ADDCUSTOMER, APICALLFAIL, APINULLERROR, DELETEDATAERROR, FETCHDATAERROR, INT, SRNO, SRNOKEY, SRNOWIDTH, TEXT, WIDTH } from "../../General/ConstStates";
import { NotificationManager } from "react-notifications";
import ExportButtton from "../../General/Buttons/ExportButtton";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import Swal from "sweetalert2";
import { CurrentPageContext } from "../../store/pages-context";

const CustomerList = ({ editData, setEditData }) => {
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      type: INT,
      isShow: true,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "First Name",
      dataKey: "userFirstName",
      width: 200,
      type: TEXT,
      isShow: true,
    },
    {
      label: "Last Name",
      dataKey: "userLastName",
      width: 200,
      type: TEXT,
      isShow: true,
    },
    {
      label: "Phone Number",
      dataKey: "phoneNo",
      width: 200,
      type: TEXT, // Phone numbers are generally stored as text to preserve formatting
      isShow: true,
    },
    {
      label: "Email",
      dataKey: "userEmail",
      width: 200,
      type: TEXT,
      isShow: true,
    },
    {
      label: "Gender",
      dataKey: "gender",
      width: 150,
      type: INT, // Assuming gender is stored as an integer (e.g., 1 for Male, 2 for Female)
      isShow: true,
      cellRenderer: ({ rowData }) =>
        rowData["gender"] === 2 ? "Female" : "Male",
    },
    {
      label: "Date of Birth",
      dataKey: "dob",
      width: 200,
      type: TEXT, // Dates are generally treated as text for display purposes
      isShow: true,
      cellRenderer: ({ rowData }) => formatDateDDMMYYYY(rowData["dob"]),
    },
    {
      label: "Location",
      dataKey: "homeLocation",
      width: 200,
      type: TEXT,
      isShow: true,
    },
    {
      label: "Work Location",
      dataKey: "workLocation",
      width: 200,
      type: TEXT,
      isShow: true,
    },
    {
      label: "Payment Method",
      dataKey: "paymentMethod",
      width: 200,
      type: TEXT,
      isShow: true,
    },
    {
      label: "Code",
      dataKey: "referCode",
      width: 200,
      type: TEXT,
      isShow: true,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH, // Actions are treated as text for identification purposes
      isShow: true,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              handlePageClick(ADDCUSTOMER);
              setEditData(rowData);
            }}
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteAction(rowData)}
          />
        </div>
      ),
    },
  ];
  

  const InitialCustomer = {
    userId: 0,
    userFirstName: "",
    userLastName: "",
    phoneNo: "",
    userEmail: "",
    password: "",
    gender: 1,
    dob: getCurrentDateTime(),
    emergencyContactNo: "",
    homeLocation: "",
    workLocation: "",
    paymentMethod: "",
    status: true,
    createdDate: getCurrentDateTime(),
    modifyDate: getCurrentDateTime(),
    isDeleted: false,
    deletedReason: null,
    referCode: "",
    lastLoginDate: getCurrentDateTime(),
    isAdult: true,
    noOfRide: 0,
    isCouponCode: null,
    other1: null,
    other2: null,
    userImage: "",
    acceptTermsCondition: true,
  };

  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { handlePageClick } = useContext(CurrentPageContext)
  const [customerData, setCustomerData] = useState([]);
  const [filteredCustomerData, setFilteredCustomerData] = useState([])
  const [searchFilters, setSearchFilters] = useState([])

  const customerListData = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllCustomerDetails`,
        {},
        {}
      );

      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          setCustomerData(response?.data?.data || []);
          setFilteredCustomerData(response?.data?.data || [])
        } else {
          NotificationManager.error(response?.data?.message || FETCHDATAERROR);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.error(APINULLERROR);
      }
    } catch (error) {
      stopLoading();
      console.error("API call failed:", error);
      NotificationManager.error(APICALLFAIL, error);
    }
  };
  useEffect(() => {
    customerListData();
  }, []);

  // Function to delete a row
  const handleDeleteAction = (rowData, rowIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleDeleteContact(rowData);
      }
    });
  };

  const handleDeleteContact = async (rowData) => {
    // debugger
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL}api/Auth/DeleteUser?UserId=${rowData.userId}`,
        {},
        {}
      );
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "Customer deleted successfully"
          );
          startLoading();
          customerListData();
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

  const handleFilterChange = (value, dataKey) =>{
      debugger
      const obj = {...searchFilters}
      if(value === "")
      {
        delete obj[dataKey]
      }
      else{
        obj[dataKey] = value
      }
      setSearchFilters({...obj})
      
    }
  
    useEffect(()=>{
      if(Object.keys(searchFilters).length === 0){
        setFilteredCustomerData(customerData)
      }
      else{
        const filtered = customerData.filter((data) => {
          debugger
          return Object.keys(searchFilters).every((key) => {
            if (!searchFilters[key]) return true; // Skip if condition value is empty/null
            return data[key].toString().toLowerCase().includes(searchFilters[key].toLowerCase());
          });
        });
        
        setFilteredCustomerData(filtered);
  
        // setFilteredDestinations(getDestination.filter((data,index)=> data[dataKey].toLowerCase().includes(value.toLowerCase())))
      }
    },[searchFilters])

  return (
    <div className="container mt-4">
      <h1 className="h3 mb-3">Customer List</h1>
      <div className="card">
        <div className="card-header d-flex justify-content-end">
          <ExportButtton
            columns={columns}
            fileName={"Export_Customer_List"}
            data={customerData}
          />
        </div>
        <div className="card-body">
          <div className="col-sm-12">
            <VirtualizedTable
              tableData={filteredCustomerData}
              tableSearchFilters={searchFilters}
              columns={columns}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
