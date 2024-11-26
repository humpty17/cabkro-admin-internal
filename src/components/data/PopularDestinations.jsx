import React from "react";
import { FaFileExport, FaTrash } from "react-icons/fa";
import { FiPlus, FiDownload } from "react-icons/fi";

const PopularDestinations = () => {
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Popular Destinations</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="mb-3 text-end">
                      <button className="btn btn-primary">
                        <FiPlus className="align-middle me-2" />
                        Upload Popular Destinations
                      </button>
                      <button className="btn btn-secondary">
                        <FiDownload className="align-middle me-2" />
                        Download Sample
                      </button>
                      <button className="btn btn-success">
                        <FaFileExport className="align-middle me-2" />
                        Export Data
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="dataTables_length">
                            <label>
                              Show
                              <select
                                name="entries"
                                aria-controls="datatables"
                                className="form-select form-select-sm"
                              >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>{" "}
                              entries
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="dataTables_filter">
                            <label>
                              Search:
                              <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder=""
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <table
                            className="table table-striped dataTable no-footer dtr-inline"
                            style={{ width: "100%" }}
                          >
                            <thead className="table-dark">
                              <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
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
                                  position: "Chief Executive Officer (CEO)",
                                  office: "London",
                                  age: 47,
                                  startDate: "2019/10/09",
                                  salary: "$1,200,000",
                                },
                                // Add additional data here
                              ].map((item, index) => (
                                <tr key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.position}</td>
                                  <td>{item.office}</td>
                                  <td>{item.age}</td>
                                  <td>{item.startDate}</td>
                                  <td>{item.salary}</td>
                                  <td>
                                    <FaTrash className="align-middle text-danger" />
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default PopularDestinations;
