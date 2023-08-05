import { UserDataLogged } from "../interface/User"

export const getUserDataLocalStorage = () => {
    const userData: UserDataLogged | undefined = JSON.parse(localStorage.getItem('userData') || '') || undefined

    return userData
}