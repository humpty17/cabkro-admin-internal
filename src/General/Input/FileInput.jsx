const FileInput = ({handleFileUpload,isDisabled, image}) =>{
    return (
      <div className={image ? "col-sm-7" : "col-sm-8"}>
        <input
          type="file"
          className="form-control"
          onChange={handleFileUpload}
          disabled={isDisabled}
          accept=".jpg, .jpeg, .png, .pdf"
        />
      </div>
    );
}

export default FileInput