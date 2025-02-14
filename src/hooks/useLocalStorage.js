import { useState } from "react"

export const useLocalStorage = (keyName, defaultValue)=>{
  const [storedValue, setStoredValue] = useState(()=>{
    try {
      const value = window.sessionStorage.getItem(keyName) || window.localStorage.getItem(keyName) ;
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue))
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  })                                                                                               
  //console.log("storedValue", storedValue);
  const setValue = (newValue, status) => {
    
    try {
      if(status){
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
        window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
      }
      else{
        if(newValue===null){
          window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
          window.localStorage.setItem(keyName, JSON.stringify(newValue));
        }
        else{
          window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
        }
        
      }
     
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue]
}