import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const LoginContext = createContext({
    user:null,
    login:()=>{},
    logout:()=>{}
})

const LoginContextProvider = ({children})=>{
    const [user, setUser] = useLocalStorage("user", null)

    //console.log(user);
    const login = async (data, status) => {
        //console.log("inside here",data)
        setUser(data, status);
        
    };

    const logout = () => { 
        setUser(null);
    };

    return (
        <LoginContext.Provider
          value={{
            user,
            login,
            logout
          }}
        >
          {children}
        </LoginContext.Provider>
      );
}

export default LoginContextProvider