import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const CustomerList = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleExport = () => {
    alert("Data exported successfully!");
  };

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
      position: "CEO",
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

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="h3 mb-3">Customer List</h1>
      <div className="card">
        <div className="card-header d-flex justify-content-end">
          <button className="btn btn-success" onClick={handleExport}>
            <i className="me-2"></i> Export Data
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label>
                Show
                <select
                  value={entries}
                  onChange={(e) => setEntries(e.target.value)}
                  className="form-select form-select-sm mx-2 d-inline-block w-auto"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </label>
            </div>
            <div className="col-md-6 text-end">
              <label>
                Search:
                <input
                  type="search"
                  className="form-control form-control-sm d-inline-block w-auto ms-2"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to search"
                />
              </label>
            </div>
          </div>
          <table className="table table-striped">
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
