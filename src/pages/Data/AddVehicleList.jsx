import React, { useState } from "react";
import { FiPlus, FiDownload, FiTrash2 } from "react-icons/fi";
import { FaFileExport } from "react-icons/fa";

const AddVehicleList = () => {
  // Table data state
  const [data, setData] = useState([
    { id: 1, name: "Airi Satou", position: "Accountant", office: "Tokyo", age: 33, startDate: "2018/11/28", salary: "$162,700" },
    { id: 2, name: "Angelica Ramos", position: "CEO", office: "London", age: 47, startDate: "2019/10/09", salary: "$1,200,000" },
    { id: 3, name: "Ashton Cox", position: "Junior Technical Author", office: "San Francisco", age: 66, startDate: "2019/01/12", salary: "$86,000" },
    { id: 4, name: "Bradley Greer", position: "Software Engineer", office: "London", age: 41, startDate: "2022/10/13", salary: "$132,000" },
    { id: 5, name: "Brenden Wagner", position: "Software Engineer", office: "San Francisco", age: 28, startDate: "2023/06/07", salary: "$206,850" },
    { id: 6, name: "Brielle Williamson", position: "Integration Specialist", office: "New York", age: 61, startDate: "2022/12/02", salary: "$372,000" },
    { id: 7, name: "Bruno Nash", position: "Software Engineer", office: "London", age: 38, startDate: "2023/05/03", salary: "$163,500" },
    { id: 8, name: "Caesar Vance", position: "Pre-Sales Support", office: "New York", age: 21, startDate: "2023/12/12", salary: "$106,450" },
    { id: 9, name: "Cara Stevens", position: "Sales Assistant", office: "New York", age: 46, startDate: "2023/12/06", salary: "$145,600" },
    { id: 10, name: "Cedric Kelly", position: "Senior Javascript Developer", office: "Edinburgh", age: 22, startDate: "2022/03/29", salary: "$433,060" },
  ]);

  // Function to delete a row
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div className="container mt-4">
      <h1 className="h3 mb-3">Add Vehicle List</h1>

      <div className="card">
        {/* Card Header */}
        <div className="card-header">
          <div className="text-end mb-3">
            <button className="btn btn-primary me-2">
              <FiPlus className="align-middle me-2" /> Upload Vehicle List
            </button>
            <button className="btn btn-secondary me-2">
              <FiDownload className="align-middle me-2" /> Download Sample
            </button>
            <button className="btn btn-success">
              <FaFileExport className="align-middle me-2" /> Export Data
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body">
          <div className="row mb-3">
            {/* Show Entries */}
            <div className="col-md-6">
              <label>
                Show{" "}
                <select className="form-select form-select-sm d-inline w-auto">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>{" "}
                entries
              </label>
            </div>

            {/* Search Input */}
            <div className="col-md-6 text-end">
              <label>
                Search:{" "}
                <input
                  type="search"
                  className="form-control form-control-sm d-inline w-auto"
                  placeholder="Search"
                />
              </label>
            </div>
          </div>

          {/* Table */}
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
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.position}</td>
                  <td>{row.office}</td>
                  <td>{row.age}</td>
                  <td>{row.startDate}</td>
                  <td>{row.salary}</td>
                  <td>
                    <FiTrash2
                      className="text-danger cursor-pointer"
                      onClick={() => handleDelete(row.id)}
                      title="Delete"
                    />
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

export default AddVehicleList;
