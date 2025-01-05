const FileInput = ({handleFileUpload,isDisabled}) =>{
    return <div className="col-sm-8">
    <input
      type="file"
      className="form-control"
      onChange={handleFileUpload}
      disabled={isDisabled}
       accept=".jpg, .jpeg, .png, .pdf"
    />
  </div>
}

export default FileInput