import React, { useContext, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import ExportButtton from "../../General/Buttons/ExportButtton";
import SubmitButton from "../../General/Buttons/SubmitButton";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import { callApi, formatDateDDMMYYYY, getCurrentDateTime } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import {
  ACTION,
  APICALLFAIL,
  APINULLERROR,
  DATE,
  DELETEDATAERROR,
  FETCHDATAERROR,
  INT,
  SAVEDATAERROR,
  SRNO,
  SRNOKEY,
  SRNOWIDTH,
  TEXT,
  UPDATEDATAERROR,
  WIDTH,
} from "../../General/ConstStates";
import NumberInput from "../../General/Input/NumberInput";
import TypeInput from "../../General/Input/TypeInput";
import { FaTrash } from "react-icons/fa";
import CancelExcelButton from "../../General/Buttons/CancelExcelButton";

const Coupons = () => {
  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      type : INT,
      isShow: true,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
    },
    {
      label: "Coupon Code",
      dataKey: "couponCode",
      type : INT,
      isShow: true,
      width: 300,
    },
    {
      label: "Discount Amount",
      dataKey: "discountAmount",
      type : TEXT,
      isShow: true,
      width: 300,
    },
    {
      label: "Discount Percent",
      dataKey: "discountPercent",
      type : INT,
      isShow: true,
      width: 300,
    },
    {
      label: "Applied Date",
      dataKey: "appliedDate",
      type: DATE,
      isShow: true,
      width: 300,
      cellRenderer: ({ rowData }) => formatDateDDMMYYYY(rowData["appliedDate"]),
    },
    // {
    //   label: "Is Valid",
    //   dataKey: "isValid",
    //   width: 100,
    // },
    {
      label: ACTION,
      dataKey: ACTION,
      width: WIDTH,
      isShow: true,
      cellRenderer: ({ rowData }) => (
        <div>
          <FiEdit
            className="me-3"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              setIsEditMode(true);
              setAddCouponData(rowData);
            }}
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleCouponDelete(rowData)}
          />
        </div>
      ),
    },
  ];

  // const couponState = {
  //   couponCode: "",
  //   discountAmount: 0,
  //   discountPercent: 0,
  //   appliedDate: "",
  //   isValid: true,
  // };

  const initialState = {
    appliedCouponID: 0,
    couponCode: "",
    discountAmount: 0,
    discountPercent: 0,
    appliedDate: getCurrentDateTime(),
    isValid: true,
    expirationDate: getCurrentDateTime(),
  };
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [searchFilters, setSearchFilters] = useState(initialState);
  const [couponListData, setCouponListData] = useState([]);
  const [addCouponData, setAddCouponData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false)

  const couponList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/GetAllCoupons`,
        {},
        {}
      );
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response.data.code === 200) {
          setCouponListData(response?.data?.data || []);
        } else {
          NotificationManager.error(response?.data?.message || FETCHDATAERROR);
        }
      } else {
        console.error(APINULLERROR, response);
        NotificationManager.error(APINULLERROR);
      }
    } catch (error) {
      stopLoading();
      console.error(APICALLFAIL, error);
      NotificationManager.error(APICALLFAIL, error);
    }
  };
  useEffect(() => {
    couponList();
  }, []);

  // const handleSaveCoupen = async () => {
  //   startLoading();
  //   try {
      
  //     stopLoading();
  //     if (response !== null && response !== undefined) {
  //       if (response?.data?.code === 200) {
  //         NotificationManager.success(
  //           response?.data?.message || "Coupon details saved successfully"
  //         );
          
  //       } else {
  //         NotificationManager.error(response?.data?.message || SAVEDATAERROR);
  //       }
  //     } else {
  //       NotificationManager.error(APINULLERROR);
  //     }
  //   } catch (err) {
  //     stopLoading();
  //     console.log(APICALLFAIL, err);
  //     NotificationManager.error(APICALLFAIL, err);
  //   }
  // };

  const handleCouponDelete = async (rowData) => {
    const { appliedCouponID } = rowData;

    startLoading();
    try {
      debugger;
      const response = await callApi(
        "put",
        `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/UpdateCoupon?id=${appliedCouponID}`,
        { ...rowData, isActive: false },
        {}
      );
      // console.log(response);

      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "Coupons deleted successfully"
          );
          couponList();
        } else {
          NotificationManager.error(response?.data?.message || DELETEDATAERROR);
        }
      } else {
        NotificationManager.error(APINULLERROR);
      }
    } catch (error) {
      stopLoading();
      console.error(APICALLFAIL, error);
      NotificationManager.error(APICALLFAIL, error);
    }
  };

  const handleEditCoupon = async () => {
    startLoading();
    try {
      debugger
      if (addCouponData.appliedCouponID > 0) {
        const response = await callApi(
          "put",
          `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/UpdateCoupon?id=${addCouponData.appliedCouponID}`,
          { ...addCouponData },
          {}
        );
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response?.data?.code === 200) {
            NotificationManager.success(
              response?.data?.message || "Coupon details saved successfully"
            );
            couponList();
            setAddCouponData(initialState);
            setIsEditMode(false);
          } else {
            NotificationManager.error(
              response?.data?.message || UPDATEDATAERROR
            );
          }
        } else {
          NotificationManager.error(APINULLERROR);
        }
      } else {
        const response = await callApi(
          "post",
          `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/AddCoupon`,
          { ...addCouponData },
          {}
        );
        stopLoading();
        if (response !== null || response !== undefined) {
          if (response?.data?.code === 200) {
            NotificationManager.success(
              response?.data?.message || "Coupon details saved successfully"
            );
            couponList();
            setAddCouponData(initialState);
            setIsEditMode(false);
          } else {
            NotificationManager.error(response?.data?.message || SAVEDATAERROR);
          }
        } else {
          NotificationManager.error(APINULLERROR);
        }
      }
    } catch (error) {
      stopLoading();
      console.error(APICALLFAIL, error);
      NotificationManager.response(APICALLFAIL, error);
    }
  };

  const handleInputChange = (e) => {
    setAddCouponData({
      ...addCouponData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelClick = () =>{
    setAddCouponData(initialState)
    setIsEditMode(false)
  }

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
                    <div>
                      <div className="row">
                        <div className="mb-3 col-md-3 ">
                          <label className="form-label" htmlFor="couponCode">
                            Coupon Code
                          </label>
                          <TypeInput
                            inputName={"couponCode"}
                            placeholderName={"Coupon Code"}
                            valueName={addCouponData.couponCode}
                            onChangeName={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-2">
                          <label
                            className="form-label"
                            htmlFor="discountAmount"
                          >
                            Dis. Amount
                          </label>
                          <NumberInput
                            id="discountAmount"
                            inputName={"discountAmount"}
                            placeholderName={"Discount Amount"}
                            valueName={addCouponData.discountAmount}
                            onChangeName={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-2">
                          <label
                            className="form-label"
                            htmlFor="discountPercent"
                          >
                            Dis. Percent
                          </label>
                          <NumberInput
                            id="portNo"
                            inputName={"discountPercent"}
                            placeholderName={"Discount Percent"}
                            valueName={addCouponData.discountPercent}
                            onChangeName={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-5 button">
                        {isEditMode === true ? (
                            <CancelExcelButton
                              handleCancelClick={handleCancelClick}
                            ></CancelExcelButton>
                          ) : null}
                        <SubmitButton buttonName={isEditMode ? "Update" : "Submit"} handleClick={handleEditCoupon} />
                          <ExportButtton
                            columns={columns}
                            fileName={"Coupons_List"}
                            data={couponListData}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      id="datatables-reponsive_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable
                            tableData={couponListData}
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

export default Coupons;
