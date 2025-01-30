const FileInput = ({handleFileUpload,isDisabled, image}) =>{
    return (
      <div className={image ? "col-sm-6" : "col-sm-8"}>
        <input
          type="file"
          className="form-control"
          onChange={handleFileUpload}
          disabled={isDisabled}
          accept=".jpg, .jpeg, .png, .pdf"
          value={image}
        />
      </div>
    );
}

export default FileInput