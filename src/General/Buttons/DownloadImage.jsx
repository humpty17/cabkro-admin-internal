import { BsDownload } from "react-icons/bs";

const DownloadImage = ({imageUrl, handleDownload}) => {

  return (
    <div className="col-sm-1">
      {imageUrl && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleDownload}
            className="btn btn-secondary"
          >
            <BsDownload/>
          </button>
        </div>
      )}
    </div>
  );
}

export default DownloadImage