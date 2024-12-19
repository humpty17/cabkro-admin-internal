import { useContext, useEffect } from "react";
import { LoadingContext } from "../../store/loading-context";



const Loader = () =>{
  const {isLoading} = useContext(LoadingContext);

    useEffect(()=>{
      //console.log(isLoading)
    },[isLoading])
    if (isLoading === false) return null;
  return(
    <div className="loader">
	    <div className="loader_icon"></div>
    </div>
  )
}

export default Loader;