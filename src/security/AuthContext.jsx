import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext) // <<<<<<<<< Custom hook

export default function AuthProvider({ children }) {
    const [number, setNumber] = useState(0)

    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)

    // setInterval(() => setNumber(number+1), 10000)
    // const valueToBeShared = {number, userIsAuthenticated, setUserIsAuthenticated}
    return (
        <AuthContext.Provider value={ {number, userIsAuthenticated, setUserIsAuthenticated} }>
            {children}
        </AuthContext.Provider>
    )
}