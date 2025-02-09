import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../store/loading-context";
import { ACTION, APICALLFAIL, APINULLERROR, APPROVE, INT, SRNO, SRNOKEY, SRNOWIDTH, TEXT, UPDATEAGENCYALLDETAILS, WIDTH } from "../../General/ConstStates";
import { FiEdit } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { NotificationManager } from "react-notifications";
import { callApi } from "../../General/GeneralMethod";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import { CurrentPageContext } from "../../store/pages-context";
import { type } from "@testing-library/user-event/dist/type";
import ExportButtton from "../../General/Buttons/ExportButtton";

const ApprovedAgency = ({setEditData}) => {
  const {currentPage} = useContext(CurrentPageContext)
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      type : INT,
      isShow : true,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "Car Owner Name",
      dataKey: "carOwnerName",
      width: 220,
      type : TEXT,
      isShow : true
    },
    {
      label: "Car Owner Agency Name",
      dataKey: "carOwnerAgencyName",
      width: 220,
      type : TEXT,
      isShow : true
    },

    {
      label: "Phone No",
      dataKey: "phoneNumber",
      width: 220,
      type : INT,
      isShow : true,
    },
    {
      label: "Email",
      dataKey: "email",
      width: 220,
      type : TEXT,
      isShow : true,
    },
    {
      label: "PAN No",
      dataKey: "panNo",
      width: 220,
      type: INT,
      isShow : true
    },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      isShow : true,
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
  const [approvedAgencyList, setApprovedAgencyList] = useState([]);
  const [searchFilters, setSearchFilters] = useState("");

  const fetchApprovedAgencyList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllOwnersListAdmin/false/false`,
        {},
        {}
      );
      if (response) {
        if (response?.data?.code === 200) {
          setApprovedAgencyList([...response?.data?.data]);
        } else {
          NotificationManager.error(response?.data?.message || APINULLERROR);
          setApprovedAgencyList([]);
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
    fetchApprovedAgencyList();
  }, []);

   const handleView = async (rowData) => {
      startLoading();
      try {
        const response = await callApi(
          "get",
          `${process.env.REACT_APP_API_URL_ADMIN}Data/GetCarOwnerDetailsById/${rowData.carOwnerId}`,
          {},
          {}
        );
        if (response) {
          if (response?.data?.code === 200) {
            setEditData({op: APPROVE,  ...response?.data?.data,pageName: currentPage });
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
            <h1 className="h3 mb-3">Approve Agency</h1>
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
                            fileName={"Export_Approved_Agency_List"}
                            data={approvedAgencyList}
                          ></ExportButtton>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={approvedAgencyList}
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

export default ApprovedAgency;
