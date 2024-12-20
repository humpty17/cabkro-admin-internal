import React, { useContext, useEffect, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import SubmitButton from "../../General/Buttons/SubmitButton";
import ExportButtton from "../../General/Buttons/ExportButtton";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import { NotificationManager } from "react-notifications";
import { callApi } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";

const Coupons = () => {
  const columns = [
    {
      label: "Coupon Code",
      dataKey: "couponCode",
      width: 200,
    },
    {
      label: "Discount Amount",
      dataKey: "discountAmount",
      width: 150,
    },
    {
      label: "Discount Percent",
      dataKey: "discountPercent",
      width: 150,
    },
    {
      label: "Applied Date",
      dataKey: "appliedDate",
      width: 200,
    },
    // {
    //   label: "Is Valid",
    //   dataKey: "isValid",
    //   width: 100,
    // },
    {
      label: "Action",
      dataKey: "id",
      width: 150,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            // onClick={() => handleEdit(rowData)}
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            // onClick={() => handleDelete(rowData)}
          />
        </div>
      ),
    },
  ];

  const couponState = {
    couponCode:'',
    discountAmount:0,
    discountPercent:0,
    appliedDate:'',
    isValid: true
  }
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [bookingfilters, setBookingFilters] = useState(couponState)
  const [couponListData, setCouponListData] = useState([])
  const rowGetter = ({ index }) => couponListData[index];

  const couponList = async() =>{
      startLoading();
      try {
        const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}api/Extras/GetAllCoupons`,{},{});
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response.data.code === 200) {
          // console.log(faqList);
            setCouponListData(response.data.data)
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
    }


    useEffect(() =>{
      couponList()
    },[])
  
  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Coupons Codes</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="mb-3 col-md-2">
                          <label className="form-label" htmlFor="couponCode">
                            Coupon Code
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="couponCode"
                          />
                        </div>
                        <div className="mb-3 col-md-2">
                          <label className="form-label" htmlFor="discountAmount">
                            Dis. Amount
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="discountAmount"
                          />
                        </div>
                        <div className="mb-3 col-md-2">
                          <label
                            className="form-label"
                            htmlFor="discountPercent"
                          >
                            Dis. Percent
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="discountPercent"
                          />
                        </div>
                        <div className="mb-3 col-md-5 mt-4">
                          <SubmitButton/>
                          <ExportButtton/>
                        </div>
                      </div>
                    </form>
                    <div
                      id="datatables-reponsive_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable rowCountAdd={couponListData} bookingfilters={bookingfilters} columns={columns} rowGetter={rowGetter} />
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

export default Coupons;
