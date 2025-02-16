import React, { useContext, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import ExportButtton from "../../General/Buttons/ExportButtton";
import SubmitButton from "../../General/Buttons/SubmitButton";
import VirtualizedTable from "../../General/Common/VitualizedTable/VirtualizedTable";
import { ACTION, APICALLFAIL, APINULLERROR, DATE, DELETEDATAERROR, FETCHDATAERROR, INT, SAVEDATAERROR, SRNO, SRNOKEY, SRNOWIDTH, TEXT, UPDATEDATAERROR, WIDTH } from "../../General/ConstStates";
import {
  callApi,
  formatDateDDMMYYYY,
  getCurrentDateTime
} from "../../General/GeneralMethod";
import TypeInput from "../../General/Input/TypeInput";
import { LoadingContext } from "../../store/loading-context";
import CancelExcelButton from "../../General/Buttons/CancelExcelButton";

const FAQs = () => {

  const { startLoading, stopLoading } = useContext(LoadingContext);

  const columns = [
    {
      label: SRNO,
      dataKey: SRNOKEY,
      width: SRNOWIDTH,
      cellRenderer: ({ rowIndex }) => rowIndex + 1,
      type: INT,
      isShow: true
    },
    {
      label: "Question",
      dataKey: "question",
      width: 400,
      type:TEXT,
      isShow: true
    },
    {
      label: "Answer",
      dataKey: "answer",
      width: 400,
      type:TEXT,
      isShow: true
    },
    {
      label: "Category",
      dataKey: "category",
      width: 150,
      type:TEXT,
      isShow: true
    },
    {
      label: "Created Date",
      dataKey: "created_at",
      width: 200,
      cellRenderer: ({ rowData }) => formatDateDDMMYYYY(rowData["created_at"]),
      type: DATE,
      isShow: true
    },
    // {
    //   label: "Update Date",
    //   dataKey: "updated_at",
    //   width: 200,
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
            onClick={() => {setIsEditMode(true);setAddFaq(rowData)}}
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteFaqs(rowData)}
          />
        </div>
      ),
    },
  ];

  const initialFaq = {
    id: 0,
    question: "",
    answer: "",
    category: "",
    created_at: getCurrentDateTime(),
    updated_at: getCurrentDateTime(),
    isActive: true,
    other1: 0,
    other2: 0,
    other3: "",
    other4: "",
    other5: "",
  };

  const [addFaq, setAddFaq] = useState(initialFaq);
  const [faqList, setFaqList] = useState([]);
  const [filteredList, setFilteredList] = useState([])
  const [searchFilters, setSearchFilters] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  

  const faqsList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/GetAllFAQs`,
        {},
        {}
      );
      stopLoading();
      if (response !== null && response !== undefined) {
        if (response?.data?.code === 200) {
          setFaqList(response?.data?.data || []);
          setFilteredList(response?.data?.data || [])
        } else {
          NotificationManager.error(response?.data?.message || FETCHDATAERROR);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.error(APINULLERROR);
      }
    } catch (error) {
      stopLoading();
      console.error("API call failed:", error);
      NotificationManager.error(APICALLFAIL, error);
    }
  };

  const handleInputChange = (e) => {
    setAddFaq({
      ...addFaq,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteFaqs = async (rowData) => {
    const { id } = rowData;

    startLoading();
    try {
      //debugger
      const response = await callApi(
        "put",
        `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/UpdateFAQ?id=${id}`,
        { ...rowData, isActive: false },
        {}
      );
      // console.log(response);

      stopLoading();
      if(response!==null && response!==undefined){
        if (response?.data?.code === 200) {
          NotificationManager.success(
            response?.data?.message || "FAQ deleted successfully"
          );
          faqsList()
          // setIsActive(false)
        } else {
          NotificationManager.error(
            response?.data?.message || DELETEDATAERROR
          );
        }
      }
      else{
        NotificationManager.error(APINULLERROR)
      }
      
    } catch (error) {
      stopLoading();
      console.error(APICALLFAIL, error);
      NotificationManager.error(APICALLFAIL,error)
    }
  };

  const handleEditFaq = async () => {
      startLoading();
      try {
        if (addFaq.id > 0) {
          const response = await callApi(
            "put",
            `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/UpdateFAQ?id=${addFaq.id}`,
            {...addFaq},
            {}
          );
          stopLoading();
          if(response!==null && response!==undefined){
            if(response?.data?.code === 200){
              NotificationManager.success(response?.data?.message || "FAQ updated successfully");
              faqsList();
              setAddFaq(initialFaq)
              setIsEditMode(false)
            }
            else{
              NotificationManager.error(response?.data?.message || UPDATEDATAERROR)
            }
          }
          else{
            NotificationManager.error(APINULLERROR)
          }
        }
        else{
          const response = await callApi(
            "post",
            `${process.env.REACT_APP_API_URL_ADMIN}api/Extras/SaveFAQ?`,
            { ...addFaq },
            {}
          );    
          stopLoading();
          if(response!==null || response!==undefined){
            if(response?.data?.code === 200){
              NotificationManager.success(response?.data?.message || "FAQs saved successfully")
              faqsList();
              setAddFaq(initialFaq);
              setIsEditMode(false)
            }
            else{
              NotificationManager.error(response?.data?.message || SAVEDATAERROR)
            }
          }
          else{
            NotificationManager.error(APINULLERROR)
          }
        }
        
      } catch (error) {
        stopLoading();
        console.error(APICALLFAIL, error);
        NotificationManager.response(APICALLFAIL, error)
      }
    
  };

  const handleCancelClick = () =>{
    setAddFaq(initialFaq)
    setIsEditMode(false)
  }

  useEffect(() => {
    faqsList();
  }, []);

   const handleFilterChange = (value, dataKey) =>{
      debugger
      const obj = {...searchFilters}
      if(value === "")
      {
        delete obj[dataKey]
      }
      else{
        obj[dataKey] = value
      }
      setSearchFilters({...obj})
      
    }
  
    useEffect(()=>{
      // console.log(searchFilters)
      if(Object.keys(searchFilters).length === 0){
        setFilteredList(faqList)
      }
      else{
        const filtered = faqList.filter((data) => {
          debugger
          return Object.keys(searchFilters).every((key) => {
            if (!searchFilters[key]) return true; // Skip if condition value is empty/null
            return data[key].toString().toLowerCase().includes(searchFilters[key].toLowerCase());
          });
        });
        
        setFilteredList(filtered);
  
        // setFilteredDestinations(getDestination.filter((data,index)=> data[dataKey].toLowerCase().includes(value.toLowerCase())))
      }
    },[searchFilters])
  

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Faqs</h1>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="mb-3 col-md-3">
                          <label className="form-label" htmlFor="inputEmail4">
                            Question
                          </label>
                          {/* <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                          /> */}
                          <TypeInput
                            inputName={"question"}
                            placeholderName={"Question"}
                            valueName={addFaq.question}
                            onChangeName={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-3">
                          <label
                            className="form-label"
                            htmlFor="inputPassword4"
                          >
                            Answer
                          </label>
                          <TypeInput
                            inputName={"answer"}
                            placeholderName={"Answer"}
                            valueName={addFaq.answer}
                            onChangeName={handleInputChange}
                          ></TypeInput>
                        </div>
                        <div className="mb-3 col-md-2">
                          <label
                            className="form-label"
                            htmlFor="inputPassword4"
                          >
                            Category
                          </label>
                          <TypeInput
                            inputName={"category"}
                            placeholderName={"category"}
                            valueName={addFaq.category}
                            onChangeName={handleInputChange}
                          ></TypeInput>
                        </div>
                        <div className="mb-3 col-md-4 button">
                          {isEditMode === true ? (
                            <CancelExcelButton
                              handleCancelClick={handleCancelClick}
                            ></CancelExcelButton>
                          ) : null}

                          <SubmitButton
                            buttonName={isEditMode ? "Update" : "Submit"}
                            handleClick={handleEditFaq}
                          />
                          <ExportButtton
                            columns={columns}
                            fileName={"FAQs_List"}
                            data={faqList}
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
                            tableData={filteredList}
                            // tableSearchFilters={searchFilters}
                            columns={columns}
                            handleFilterChange={handleFilterChange}
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

export default FAQs;
