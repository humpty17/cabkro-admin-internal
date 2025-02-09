import React, { useContext, useEffect, useState } from 'react'
import { ACTION, APICALLFAIL, APINULLERROR, APPROVE, INT, SRNO, SRNOKEY, SRNOWIDTH, TEXT, UPDATEAGENCYALLDETAILS, WIDTH } from '../../General/ConstStates';
import { FiEdit } from 'react-icons/fi';
import { AiFillEye } from 'react-icons/ai';
import { LoadingContext } from '../../store/loading-context';
import { callApi } from '../../General/GeneralMethod';
import { NotificationManager } from 'react-notifications';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';
import { CurrentPageContext } from '../../store/pages-context';
import ExportButtton from '../../General/Buttons/ExportButtton';

const ApprovedDriver = ({setEditData}) => {
  const {currentPage} = useContext(CurrentPageContext)
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
      label: "Vehicle Number",
      dataKey: "vehicleNumber",
      type: INT,
      isShow: true,
      width: 220,
    },
    {
      label: "Fuel Type",
      dataKey: "vehicleFuelType",
      type: TEXT,
      isShow: true,
      width: 220,
    },

    {
      label: "Phone No",
      dataKey: "phoneNumber",
      type: INT,
      isShow: true,
      width: 220,
    },
    {
      label: "Email",
      dataKey: "email",
      type: TEXT,
      isShow: true,
      width: 220,
    },
    {
      label: "Model Name",
      dataKey: "vehicleModelName",
      type: TEXT,
      isShow: true,
      width: 220,
    },
    {
      label: "Company Name",
      dataKey: "vehicleCompanyName",
      type: TEXT,
      isShow: true,
      width: 220,
    },
    {
      label: "Seater Count",
      dataKey: "vehicleSeaterCount",
      type: INT,
      isShow: true,
      width: 220,
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      isShow: true,
      cellRenderer: ({ rowData, rowIndex }) => (
        <div>
          
          <AiFillEye
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleView(rowData)}
          />
        </div>
      ),
    },
  ];
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { handlePageClick } = useContext(CurrentPageContext);
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
          setEditData({});
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

  const handleView = async (rowData) => {
        startLoading();
        try {
          const response = await callApi(
            "get",
            `${process.env.REACT_APP_API_URL_ADMIN}Data/GetCarOwnerDetailsById/${rowData?.carOwnerId}`,
            {},
            {}
          );
          if (response) {
            if (response?.data?.code === 200) {
              setEditData({op: APPROVE,  ...response?.data?.data, pageName: currentPage });
              handlePageClick(UPDATEAGENCYALLDETAILS);
            } else {
              NotificationManager.error("Could not view agency details");
            }
          } else {
            NotificationManager.error(APINULLERROR);
          }
        } catch (err) {
          NotificationManager.error(APICALLFAIL);
        } finally {
          stopLoading();
        }
      };

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Approve Driver</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header ">
                    <div className="row">
                      <h2 className="col-5 font"></h2>
                      <div className="mb-3 text-end col-7">
                        {/* Export Excel Button */}
                        <ExportButtton
                          columns={columns}
                          fileName={"Export_Approved_Driver_List"}
                          data={approvedDriverListList}
                        ></ExportButtton>
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