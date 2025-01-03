import React, { useContext, useEffect, useState } from "react";
import { FiEdit, FiEdit2, FiTrash2 } from "react-icons/fi";
import { callApi } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { ACTION, APICALLFAIL, APINULLERROR, FETCHDATAERROR, WIDTH } from "../../General/ConstStates";
import { NotificationManager } from "react-notifications";
import ExportButtton from "../../General/Buttons/ExportButtton";

const CustomerList = () => {
  const columns = [
    {
      label: "Name",
      dataKey: "name",
      width: 200,
    },
    {
      label: "Position",
      dataKey: "position",
      width: 200,
    },
    {
      label: "Office",
      dataKey: "office",
      width: 200,
    },
    {
      label: "Age",
      dataKey: "age",
      width: 100,
    },
    {
      label: "Start Date",
      dataKey: "startDate",
      width: 150,
    },
    {
      label: "Salary",
      dataKey: "salary",
      width: 200,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            // onClick={() => handleEditContact(rowData)}
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            // onClick={() => handleDeleteContact(rowData)}
          />
        </div>
      ),
    },
  ];
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [customerData, setCustomerData] = useState([])

  const handleExport = () => {
    alert("Data exported successfully!");
  };

  // const customers = [
  //   {
  //     name: "Airi Satou",
  //     position: "Accountant",
  //     office: "Tokyo",
  //     age: 33,
  //     startDate: "2018/11/28",
  //     salary: "$162,700",
  //   },
  //   {
  //     name: "Angelica Ramos",
  //     position: "CEO",
  //     office: "London",
  //     age: 47,
  //     startDate: "2019/10/09",
  //     salary: "$1,200,000",
  //   },
  //   {
  //     name: "Ashton Cox",
  //     position: "Junior Technical Author",
  //     office: "San Francisco",
  //     age: 66,
  //     startDate: "2019/01/12",
  //     salary: "$86,000",
  //   },
  //   {
  //     name: "Bradley Greer",
  //     position: "Software Engineer",
  //     office: "London",
  //     age: 41,
  //     startDate: "2022/10/13",
  //     salary: "$132,000",
  //   },
  //   {
  //     name: "Brenden Wagner",
  //     position: "Software Engineer",
  //     office: "San Francisco",
  //     age: 28,
  //     startDate: "2023/06/07",
  //     salary: "$206,850",
  //   },
  //   {
  //     name: "Brielle Williamson",
  //     position: "Integration Specialist",
  //     office: "New York",
  //     age: 61,
  //     startDate: "2022/12/02",
  //     salary: "$372,000",
  //   },
  //   {
  //     name: "Bruno Nash",
  //     position: "Software Engineer",
  //     office: "London",
  //     age: 38,
  //     startDate: "2023/05/03",
  //     salary: "$163,500",
  //   },
  //   {
  //     name: "Caesar Vance",
  //     position: "Pre-Sales Support",
  //     office: "New York",
  //     age: 21,
  //     startDate: "2023/12/12",
  //     salary: "$106,450",
  //   },
  //   {
  //     name: "Cara Stevens",
  //     position: "Sales Assistant",
  //     office: "New York",
  //     age: 46,
  //     startDate: "2023/12/06",
  //     salary: "$145,600",
  //   },
  //   {
  //     name: "Cedric Kelly",
  //     position: "Senior Javascript Developer",
  //     office: "Edinburgh",
  //     age: 22,
  //     startDate: "2022/03/29",
  //     salary: "$433,060",
  //   },
  // ];

  const customerListData = async () => {
        startLoading();
        try {
          const response = await callApi(
            "get",
            `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/GetAllContactUs`,
            {},
            {}
          );
    
          stopLoading();
          if (response !== null && response !== undefined) {
            if (response?.data?.code === 200) {
              setCustomerData(response?.data?.data || []);
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

  return (
    <div className="container mt-4">
      <h1 className="h3 mb-3">Customer List</h1>
      <div className="card">
        <div className="card-header d-flex justify-content-end">
          <ExportButtton/>
        </div>
        <div className="card-body">
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
              {filteredCustomers.slice(0, entries).map((customer, index) => (
                <tr key={index}>
                  <td>{customer.name}</td>
                  <td>{customer.position}</td>
                  <td>{customer.office}</td>
                  <td>{customer.age}</td>
                  <td>{customer.startDate}</td>
                  <td>{customer.salary}</td>
                  <td>
                    <FiEdit2 className="me-3 text-primary cursor-pointer" />
                    <FiTrash2 className="text-danger cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
