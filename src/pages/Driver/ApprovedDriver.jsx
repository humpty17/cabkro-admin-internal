import React, { useContext, useEffect, useState } from 'react'
import { ACTION, APICALLFAIL, APINULLERROR, SRNO, SRNOKEY, SRNOWIDTH, WIDTH } from '../../General/ConstStates';
import { FiEdit } from 'react-icons/fi';
import { AiFillEye } from 'react-icons/ai';
import { LoadingContext } from '../../store/loading-context';
import { callApi } from '../../General/GeneralMethod';
import { NotificationManager } from 'react-notifications';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';

const ApprovedDriver = () => {
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "Vehicle Number",
      dataKey: "vehicleNumber",
      width: 220,
    },
    {
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
      width: 220,
    },

    {
      label: "Phone No",
      dataKey: "phoneNumber",
      width: 220,
    },
    {
      label: "Email",
      dataKey: "email",
      width: 220,
    },
    {
      label: "Model Name",
      dataKey: "vehicleModelName",
      width: 220,
    },
    {
      label: "Company Name",
      dataKey: "vehicleCompanyName",
      width: 220,
    },
    {
      label: "Seater Count",
      dataKey: "vehicleSeaterCount",
      width: 220,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      cellRenderer: ({ rowData, rowIndex }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              // handleEdit(rowData);
              // setEditData(rowData);
              // handlePageClick(ADDAGENCY);
              // handleRedirect(ADDUSERFORM);
              // handleUserEdit();
            }}
          />
          <AiFillEye
            style={{ cursor: "pointer", color: "red" }}
            // onClick={() => handleDeleteAction(rowData, rowIndex)}
          />
        </div>
      ),
    },
  ];
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [approvedDriverListList, setApprovedDriverList] = useState([]);
  const [searchFilters, setSearchFilters] = useState("");

  const fetchApprovedDriverList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllDriverListAdmin/false/true`,
        {},
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          setApprovedDriverList([...response?.data?.data]);
        } else {
          NotificationManager.error(response?.data?.message || APINULLERROR);
          setApprovedDriverList([]);
        }
      } else {
        NotificationManager.error(APINULLERROR);
      }
    } catch (err) {
      console.log(err);
      NotificationManager.error(APICALLFAIL);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchApprovedDriverList();
  }, []);

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Approved Driver List</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header ">
                    <div className="row">
                      <h2 className="col-5 font"></h2>
                      <div className="mb-3 text-end col-7">
                        {/* Export Excel Button */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={approvedDriverListList}
                            tableSearchFilters={searchFilters}
                            columns={columns}
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

export default ApprovedDriver