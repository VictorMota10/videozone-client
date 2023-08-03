import { createContext, useContext, useEffect, useState } from "react";
import { UserDataLogged } from "../interface/User";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({})

const UserProvider = ({ children }: { children: any }) => {
  const [userCredentials, setUserCredentials] = useState<UserDataLogged>()

  const handleLogout = () => {
    setUserCredentials(undefined)
    localStorage.removeItem('userData')
    window.location.replace('/#/')
  }

  return (
    <UserContext.Provider
      value={{
        userCredentials,
        setUserCredentials,
        handleLogout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

function useUser() {
  const context: any = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context;
}

export { UserProvider, useUser };