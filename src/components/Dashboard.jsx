import React from "react";
import {
  FiTruck,
  FiUsers,
  FiDollarSign,
  FiShoppingCart,
} from "react-icons/fi";

const Dashboard = () => {
  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">
          <strong>Analytics</strong> Dashboard
        </h1>

        <div className="row">
          <div className="col-xl-6 col-xxl-5 d-flex">
            <div className="w-100">
              <div className="row">
                {/* Card: Sales */}
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">Sales</h5>
                        </div>
                        <div className="col-auto">
                          <div className="stat text-primary">
                            <FiTruck size={24} />
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">2,382</h1>
                      <div className="mb-0">
                        <span className="text-danger">
                          -3.65%
                        </span>{" "}
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card: Visitors */}
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">Visitors</h5>
                        </div>
                        <div className="col-auto">
                          <div className="stat text-primary">
                            <FiUsers size={24} />
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">14,212</h1>
                      <div className="mb-0">
                        <span className="text-success">
                          +5.25%
                        </span>{" "}
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Cards */}
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">Earnings</h5>
                        </div>
                        <div className="col-auto">
                          <div className="stat text-primary">
                            <FiDollarSign size={24} />
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">$21,300</h1>
                      <div className="mb-0">
                        <span className="text-success">
                          +6.65%
                        </span>{" "}
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mt-0">
                          <h5 className="card-title">Orders</h5>
                        </div>
                        <div className="col-auto">
                          <div className="stat text-primary">
                            <FiShoppingCart size={24} />
                          </div>
                        </div>
                      </div>
                      <h1 className="mt-1 mb-3">64</h1>
                      <div className="mb-0">
                        <span className="text-danger">
                          -2.25%
                        </span>{" "}
                        <span className="text-muted">Since last week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="col-xl-6 col-xxl-7">
            <div className="card flex-fill w-100">
              <div className="card-header">
                <h5 className="card-title mb-0">Recent Movement</h5>
              </div>
              <div className="card-body py-3">
                {/* Use Chart.js or similar library here */}
                <div className="chart chart-sm">
                  {/* Placeholder for Chart */}
                  <div>Chart Placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections: Projects, Sales, etc. */}
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="card flex-fill">
              <div className="card-header">
                <h5 className="card-title mb-0">Latest Projects</h5>
              </div>
              <table className="table table-hover my-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="d-none d-xl-table-cell">Start Date</th>
                    <th className="d-none d-xl-table-cell">End Date</th>
                    <th>Status</th>
                    <th className="d-none d-md-table-cell">Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Project Rows */}
                  <tr>
                    <td>Project Apollo</td>
                    <td className="d-none d-xl-table-cell">01/01/2023</td>
                    <td className="d-none d-xl-table-cell">31/06/2023</td>
                    <td>
                      <span className="badge bg-success">Done</span>
                    </td>
                    <td className="d-none d-md-table-cell">Vanessa Tucker</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
