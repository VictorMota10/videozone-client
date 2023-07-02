import { createContext, useContext, useState } from "react";
import { UserDataLogged } from "../interface/User";

const UserContext = createContext({})

const UserProvider = ({ children }: { children: any }) => {
  const [userCredentials, setUserCredentials] = useState<UserDataLogged>()

  return (
    <UserContext.Provider
      value={{
        userCredentials,
        setUserCredentials,
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