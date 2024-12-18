import React, { useContext, useEffect, useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { LoadingContext } from '../../store/loading-context';
import { NotificationManager } from 'react-notifications';
import { callApi } from '../../General/GeneralMethod';
import VirtualizedTable from '../../General/Common/VitualizedTable/VirtualizedTable';

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
      dataKey: "action",
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
  const faqState = {
    Question :"",
    Answer : "",
    CreatedDate : "",
    Action : ''

  }
  
  const {startLoading, stopLoading} = useContext(LoadingContext)
  const [faqList, setFaqList] = useState([])
  const [bookingfilters, setBookingFilters] = useState(faqState)
  const rowGetter = ({ index }) => faqList[index];

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
                    <form>
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
                          <button type="submit" className="btn btn-primary mx-1">
                            Submit
                          </button>
                          <button className="btn btn-success ">
                            <FaFileExport className="align-middle me-2" />
                            Export Data
                          </button>
                        </div>
                      </div>
                    </form>

                    <div
                      id="datatables-reponsive_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row dt-row">
                        <div className="col-sm-12">
                          {/* <table
                            id="datatables-reponsive"
                            className="table table-striped dataTable no-footer dtr-inline"
                            style={{ width: '100%' }}
                            aria-describedby="datatables-reponsive_info"
                          >
                            <thead className="table-dark">
                              <tr>
                                <th>Sr no.</th>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Created Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd">
                                <td>1</td>
                                <td>{faqList.question}</td>
                                <td>Tokyo</td>
                                <td>12-12-2024</td>
                                <td>
                                  <FiEdit className="align-middle me-3" />
                                  <FiTrash2 className="align-middle" />
                                </td>
                              </tr>
                              <tr className="even">
                                <td>2</td>
                                <td>Chief Executive Officer (CEO)</td>
                                <td>London</td>
                                <td>12-12-2024</td>
                                <td>
                                  <FiEdit className="align-middle me-3" />
                                  <FiTrash2 className="align-middle" />
                                </td>
                              </tr>
                            </tbody>
                          </table> */}
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
