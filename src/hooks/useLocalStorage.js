import { useState } from "react"

export const useLocalStorage = (keyName, defaultValue)=>{
  const [storedValue, setStoredValue] = useState(()=>{
    try{
      const value = window.localStorage.getItem(keyName);
      if(value){
        return JSON.parse(value);
      }
      else{
        
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }

    }
    catch(err){
      //TODO : return notification
    }
  })                                                                                               
  console.log("storedValue", storedValue);
  const setValue = (newValue)=>{
    try {
      //console.log("inside here")
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      // console.log(err);
    }
    setStoredValue(newValue);
    console.log("newValue", newValue);
    
  }

  return [storedValue, setValue]
}