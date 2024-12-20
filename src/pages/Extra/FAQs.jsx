import React, { useContext, useEffect, useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { LoadingContext } from '../../store/loading-context';
import { NotificationManager } from 'react-notifications';
import { callApi } from '../../General/GeneralMethod';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';
import SubmitButton from '../../General/Buttons/SubmitButton';
import ExportButtton from '../../General/Buttons/ExportButtton';
import EmailInput from "../../General/Input/EmailInput";

const FAQs = () => {
  const columns = [
    {
      label: "Question",
      dataKey: "question",
      width: 300,
    },
    {
      label: "Answer",
      dataKey: "answer",
      width: 300,
    },
    {
      label: "Category",
      dataKey: "category",
      width: 150,
    },
    {
      label: "Created Date",
      dataKey: "created_at",
      width: 200,
    },
    {
      label: "Update Date",
      dataKey: "updated_at",
      width: 200,
    },
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
             onClick={() => handleDeleteFaqs(rowData)}
          />
        </div>
      ),
    },
  ];
  const faqState = {
    question :"",
    answer : "",
    created_at : "",
    isActive : true
  }
  
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [faqList, setFaqList] = useState([])
  const [bookingfilters, setBookingFilters] = useState(faqState)
  const [isActive, setIsActive] = useState(true)
  const rowGetter = ({ index }) => faqList[index];
  
  console.log(faqList);

  const faqsList = async() =>{
      startLoading();
      try {
        const response = await callApi("get",`${process.env.REACT_APP_API_URL_ADMIN}api/Extras/GetAllFAQs`,{},{});
        stopLoading();
        if (response !== null && response !== undefined) {
          if (response.data.code === 200) {
          // console.log(faqList);
            setFaqList(response.data.data)
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

    const handleDeleteFaqs = async(rowData) =>{
      const { id } = rowData;
     // console.log(rowData);
      
      startLoading();
      try {
        //debugger
        const response = await callApi("put",`${process.env.REACT_APP_API_URL_ADMIN}api/Extras/UpdateFAQ?${id}`,{},{});
        console.log(response);
        
        stopLoading();
        if (response.data.code === 200) {
          setIsActive(false)
          } else {
            NotificationManager.error(response.data.message || "Failed to delete FAQ.");
          }
      } catch (error) {
        console.error("API call failed:", error);
      }
    }

    const handleEditFaq = async() =>{
      startLoading()
      try {
        const response = await callApi("put",`${process.env.REACT_APP_API_URL_ADMIN}api/Extras/SaveFAQ`,{},{});
        stopLoading()
      } catch (error) {
        
      }
    }

    const handleChangeFaqs = (e) =>{
      setFaqList({
        ...faqList,
        [e.target.name] : e.target.value
      })
      //console.log(e.target.value);
    }

  useEffect(() =>{
    faqsList()
  },[])
    
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
                    <form onSubmit={handleEditFaq}>
                      <div className="row">
                        <div className="mb-3 col-md-4">
                          <label className="form-label" htmlFor="inputEmail4">
                            Question
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                          />
                          <EmailInput
                                inputName={"question"}
                                placeholderName={"Question"}
                                valueName={faqList.question}
                                onChangeName={handleChangeFaqs}
                              />
                          
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label" htmlFor="inputPassword4">
                            Answer
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                          />
                        </div>
                        <div className="mb-3 col-md-4 mt-4">
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
                          <VirtualizedTable rowCountAdd={faqList} bookingfilters={bookingfilters} columns={columns} rowGetter={rowGetter} />
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
