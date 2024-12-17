import React from "react";
import { FaFileExport } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

const BookingPackageList = () => {
  const tableData = [
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

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Booking Packages</h1>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="mb-3 text-end">
                      <button className="btn btn-success">
                        <FaFileExport className="me-2" /> Export Data
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <label>
                          Show{" "}
                          <select className="form-select form-select-sm">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>{" "}
                          entries
                        </label>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <label>
                          Search:
                          <input
                            type="search"
                            className="form-control form-control-sm ms-2"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-sm-12">
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
                            {tableData.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.position}</td>
                                <td>{item.office}</td>
                                <td>{item.age}</td>
                                <td>{item.startDate}</td>
                                <td>{item.salary}</td>
                                <td>
                                  <FiTrash2 style={{ cursor: "pointer" }} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default BookingPackageList;
