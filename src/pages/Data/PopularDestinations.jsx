import React, { useContext, useEffect, useState } from "react";
import { FaFileExport, FaTrash } from "react-icons/fa";
import { FiPlus, FiDownload } from "react-icons/fi";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import { LoadingContext } from "../../store/loading-context";
import { callApi } from "../../General/GeneralMethod";
import { NotificationManager } from "react-notifications";

const data =[
  { "id": 1, "name": "John Doe", "age": 25, "email": "john.doe1@example.com" },
  { "id": 2, "name": "Jane Smith", "age": 30, "email": "jane.smith2@example.com" },
  { "id": 3, "name": "Alice Brown", "age": 28, "email": "alice.brown3@example.com" },
  { "id": 4, "name": "Bob White", "age": 35, "email": "bob.white4@example.com" },
  { "id": 5, "name": "Tom Gray", "age": 27, "email": "tom.gray5@example.com" },
  { "id": 6, "name": "Emma Green", "age": 29, "email": "emma.green6@example.com" },
  { "id": 7, "name": "Lucas Blue", "age": 31, "email": "lucas.blue7@example.com" },
  { "id": 8, "name": "Sophia Black", "age": 26, "email": "sophia.black8@example.com" },
  { "id": 9, "name": "Ethan Brown", "age": 34, "email": "ethan.brown9@example.com" },
  { "id": 10, "name": "Olivia White", "age": 32, "email": "olivia.white10@example.com" },
  { "id": 11, "name": "Mia Gray", "age": 24, "email": "mia.gray11@example.com" },
  { "id": 12, "name": "Noah Green", "age": 33, "email": "noah.green12@example.com" },
  { "id": 13, "name": "Liam Black", "age": 27, "email": "liam.black13@example.com" },
  { "id": 14, "name": "Ava Blue", "age": 29, "email": "ava.blue14@example.com" },
  { "id": 15, "name": "Ella Smith", "age": 31, "email": "ella.smith15@example.com" },
  { "id": 16, "name": "Mason White", "age": 28, "email": "mason.white16@example.com" },
  { "id": 17, "name": "Harper Gray", "age": 26, "email": "harper.gray17@example.com" },
  { "id": 18, "name": "Elijah Brown", "age": 32, "email": "elijah.brown18@example.com" },
  { "id": 19, "name": "Charlotte Green", "age": 25, "email": "charlotte.green19@example.com" },
  { "id": 20, "name": "Benjamin Blue", "age": 34, "email": "benjamin.blue20@example.com" },
  { "id": 21, "name": "Isabella Black", "age": 30, "email": "isabella.black21@example.com" },
  { "id": 22, "name": "James White", "age": 33, "email": "james.white22@example.com" },
  { "id": 23, "name": "Emily Gray", "age": 28, "email": "emily.gray23@example.com" },
  { "id": 24, "name": "Henry Brown", "age": 26, "email": "henry.brown24@example.com" },
  { "id": 25, "name": "Amelia Green", "age": 32, "email": "amelia.green25@example.com" },
  { "id": 26, "name": "Jack Blue", "age": 31, "email": "jack.blue26@example.com" },
  { "id": 27, "name": "Sophia Black", "age": 29, "email": "sophia.black27@example.com" },
  { "id": 28, "name": "Oliver White", "age": 24, "email": "oliver.white28@example.com" },
  { "id": 29, "name": "Grace Gray", "age": 27, "email": "grace.gray29@example.com" },
  { "id": 30, "name": "Logan Brown", "age": 25, "email": "logan.brown30@example.com" },
  { "id": 31, "name": "Layla Green", "age": 30, "email": "layla.green31@example.com" },
  { "id": 32, "name": "Jacob Blue", "age": 33, "email": "jacob.blue32@example.com" },
  { "id": 33, "name": "Avery Black", "age": 31, "email": "avery.black33@example.com" },
  { "id": 34, "name": "Alexander White", "age": 28, "email": "alexander.white34@example.com" },
  { "id": 35, "name": "Victoria Gray", "age": 26, "email": "victoria.gray35@example.com" },
  { "id": 36, "name": "William Brown", "age": 29, "email": "william.brown36@example.com" },
  { "id": 37, "name": "Hannah Green", "age": 32, "email": "hannah.green37@example.com" },
  { "id": 38, "name": "Daniel Blue", "age": 27, "email": "daniel.blue38@example.com" },
  { "id": 39, "name": "Lily Black", "age": 34, "email": "lily.black39@example.com" },
  { "id": 40, "name": "Michael White", "age": 25, "email": "michael.white40@example.com" },
  { "id": 41, "name": "Zoe Gray", "age": 30, "email": "zoe.gray41@example.com" },
  { "id": 42, "name": "Nathan Brown", "age": 28, "email": "nathan.brown42@example.com" },
  { "id": 43, "name": "Ella Green", "age": 33, "email": "ella.green43@example.com" },
  { "id": 44, "name": "Caleb Blue", "age": 31, "email": "caleb.blue44@example.com" },
  { "id": 45, "name": "Abigail Black", "age": 27, "email": "abigail.black45@example.com" },
  { "id": 46, "name": "Matthew White", "age": 29, "email": "matthew.white46@example.com" },
  { "id": 47, "name": "Scarlett Gray", "age": 24, "email": "scarlett.gray47@example.com" },
  { "id": 48, "name": "Eleanor Brown", "age": 35, "email": "eleanor.brown48@example.com" },
  { "id": 49, "name": "Owen Green", "age": 26, "email": "owen.green49@example.com" },
  { "id": 50, "name": "Chloe Blue", "age": 34, "email": "chloe.blue50@example.com" }
];

const PopularDestinations = () => {
  const rowGetter = ({ index }) => data[index];
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [getDestination, setGetDestination] = useState(null)
  console.log(getDestination);
  
  const getPopularDestination = async () => {
    startLoading();
    try {
      const response = await callApi("get",`Data/GetAllPopularDestinations`,{},{});
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          setGetDestination(response.data.data)
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
  };

  useEffect(() =>{
    getPopularDestination()
  },[])

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
                          {/* <table
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
                          </table> */}
                          <Table
                            width={800} // Total width of the table
                            height={300} // Total height of the table
                            headerHeight={40} // Height of the header row
                            rowHeight={50} // Height of each row
                            rowCount={data.length} // Total number of rows
                            rowGetter={rowGetter} // Function to retrieve data for a row
                            className="table table-striped dataTable no-footer dtr-inline"
                          >
                            <Column
                              label="ID"
                              dataKey="id"
                              width={100} // Width of the column
                            />
                            <Column label="Name" dataKey="name" width={300} />
                            <Column label="Age" dataKey="age" width={150} />
                            <Column label="Email" dataKey="email" width={250} />
                          </Table>
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
