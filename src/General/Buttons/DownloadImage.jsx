import { BsDownload } from "react-icons/bs";

const DownloadImage = ({imageUrl}) => {


  const openImageWithDownload = async(e,image) => {
    e.preventDefault()
    try {
      const response = await fetch(image);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const blob = await response.blob(); // Convert response to Blob

        // Create a link element and trigger a download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "test.jpeg"; // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("Image saved successfully!");
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  
  

  return (
    <div className="col-sm-1">
      {imageUrl && (
        <div className="flex flex-col items-center">
          <button
            onClick={(e)=>openImageWithDownload(e,`${process.env.REACT_APP_API_URL}${imageUrl}`)}
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