import { createContext,  useState } from "react"


export const LoadingContext = createContext({
    isLoading:false,
    startLoading:()=>{},
    stopLoading:()=>{}
})


const LoadingContextProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () =>{
      
      setIsLoading(true)
       document.body.style.overflowY = 'hidden';
    }
    const stopLoading = () =>{
    
      setIsLoading(false)
      document.body.style.overflowY = 'visible';
      
    }

    return (
        <LoadingContext.Provider
            value={{isLoading, startLoading, stopLoading}}
        >
          {children}
        </LoadingContext.Provider>
      );
}

export default LoadingContextProvider


