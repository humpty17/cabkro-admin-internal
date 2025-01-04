import React from 'react'
import FormLabel from '../../../General/Label/FormLabel'
import SubmitButton from '../../../General/Buttons/SubmitButton'

const UploadDocuments = ({handleFileUpload}) => {
  return (
    <div className="col-6 col-xl-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Upload documents</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3 row">
                        <FormLabel label={"Aadhar card front"}></FormLabel>
                        <div className="col-sm-8">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileUpload}
                            
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <FormLabel label={"Aadhar card back"}></FormLabel>
                        {/* <label className="col-form-label col-sm-3 text-sm-end">Aadhar card back</label> */}
                        <div className="col-sm-8">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                      <FormLabel label={"Pan card"}></FormLabel>
                        {/* <label className="col-form-label col-sm-3 text-sm-end">Pan card</label> */}
                        <div className="col-sm-8">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col-sm-12 ms-sm-auto">
                          <SubmitButton buttonName={"Upload Aadhar front"}></SubmitButton>
                          <SubmitButton buttonName={"Upload Aadhar back"}></SubmitButton>
                          <SubmitButton buttonName={"Upload Pan"}></SubmitButton>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
  )
}

export default UploadDocuments