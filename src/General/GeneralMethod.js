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
