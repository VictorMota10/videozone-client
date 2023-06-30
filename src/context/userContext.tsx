import { createContext, useContext, useState } from "react";

const UserContext = createContext({})

const UserProvider = ({ children }: { children: any }) => {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')
  const [userUid, setUserUid] = useState('')
  const [accessToken, setAccessToken] = useState('')

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        avatar,
        setAvatar,
        email,
        setEmail, 
        userUid,
        setUserUid,
        accessToken,
        setAccessToken
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