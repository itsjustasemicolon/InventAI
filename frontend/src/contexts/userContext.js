import {useContext , createContext}  from "react";

const userContext =  createContext( {
    isLoggedIn: false,
    setLoggedIn: () => {},
    username: "",
    setUsername: () => {},
} )

const UserProvider = userContext.Provider
const useUser = () => {
    return useContext(userContext);
}

export {
    UserProvider,
    useUser,
}