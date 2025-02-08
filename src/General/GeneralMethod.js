import axios from "axios";

export const callApi = async (methodType, url, apiData, apiHeader) =>{
    try{
        //console.log(process.env.REACT_APP_API_URL)
        const response = await axios({
            method: methodType,
            url: url,
            data: apiData ,
            headers: { ...apiHeader },
        });
        return response
    }
    catch(err){
        return null
    }
}


export const getCurrentDateTime = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0"); // Add seconds

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`; // Include seconds
}


export const getCurrentDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    

    return `${year}-${month}-${day}`; // Include seconds
}

export const convertToDDMMYYYY = (date) => {
}


export const formatDateDDMMYYYY = (dateString) => {
    if (!dateString) return "Invalid Date"; // Handle missing input
    
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
};

export const convertDatetoReadFormat = (dateString) => {
    const date = new Date(dateString);
  
    // Format the date and time
    const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
    const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true };
  
    const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
    const formattedTime = date
      .toLocaleTimeString("en-GB", optionsTime)
      .replace(/(\d+)(:\d+)?\s?(AM|PM)/, "$1 $3");
  
    return `${formattedDate}, ${formattedTime}`;
  };