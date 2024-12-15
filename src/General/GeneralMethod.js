import axios from "axios";

export const callApi = async (methodType, url, apiData, apiHeader) =>{
    try{
        //console.log(process.env.REACT_APP_API_URL)
        const response = await axios({
            method: methodType,
            url: url,
            data: { ...apiData },
            headers: { ...apiHeader },
        });
        return response
    }
    catch(err){
        return null
    }
}