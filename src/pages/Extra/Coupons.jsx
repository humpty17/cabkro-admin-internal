import React, { useContext, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import ExportButtton from "../../General/Buttons/ExportButtton";
import SubmitButton from "../../General/Buttons/SubmitButton";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import { callApi, getCurrentDateTime } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { ACTION, APICALLFAIL, APINULLERROR, FETCHDATAERROR, SAVEDATAERROR } from "../../General/ConstStates";
import NumberInput from "../../General/Input/NumberInput";
import TypeInput from "../../General/Input/TypeInput";

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
      label: ACTION,
      dataKey: ACTION,
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

  const initialState = {
    "appliedCouponID": 0,
    "couponCode": "",
    "discountAmount": 0,
    "discountPercent": 0,
    "appliedDate": getCurrentDateTime(),
    "isValid": true,
    "expirationDate": getCurrentDateTime()
  }
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [searchFilters, setSearchFilters] = useState(couponState)
  const [couponListData, setCouponListData] = useState([])
  const [addCouponData, setAddCouponData] = useState(initialState)

  const couponList = async() =>{
      startLoading();
      try {
        const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}api/Extras/GetAllCoupons`,{},{});
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response.data.code === 200) {
            setCouponListData(response?.data?.data || [])
          } else {
            NotificationManager.error(response?.data?.message || FETCHDATAERROR);
          }
        } else {
          console.error(APINULLERROR, response);
          NotificationManager.error(APINULLERROR);
        }
      } catch (error) {
        stopLoading()
        console.error(APICALLFAIL, error);
        NotificationManager.error(APICALLFAIL, error)
      } 
    }


    useEffect(() =>{
      couponList()
    },[])

    const handleInputChange = (e)=>{
      setAddCouponData({
        ...addCouponData, [e.target.name]:e.target.value
      })
    }
  
    const handleSaveCoupen = async() =>{
      startLoading()
      try{
        const response = await callApi("post",`${process.env.REACT_APP_API_URL_ADMIN}api/Extras/AddCoupon`,{...addCouponData},{})
        stopLoading()
        if(response!==null && response!==undefined){
          if(response?.data?.code === 200){
            NotificationManager.success(response?.data?.message || "Coupon details saved successfully")
            setAddCouponData(initialState)
            couponList()
          }
          else{
            NotificationManager.error(response?.data?.message || SAVEDATAERROR)
          }
        }
        else{
          NotificationManager.error(APINULLERROR)
        }
      }
      catch(err){
        stopLoading()
        console.log(APICALLFAIL, err)
        NotificationManager.error(APICALLFAIL, err)
      }
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
                        <div className="mb-3 col-md-2">
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
                          <label className="form-label" htmlFor="discountAmount">
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
                        <div className="mb-3 col-md-5 mt-4">
                          <SubmitButton buttonName={"Submit"} handleClick={handleSaveCoupen}/>
                          <ExportButtton/>
                        </div>
                      </div>
                    </div>
                    <div
                      id="datatables-reponsive_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          <VirtualizedTable tableData={couponListData} tableSearchFilters={searchFilters} columns={columns} />
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
