import { createContext, useContext, useMemo, useState } from "react"
import { decryptToken } from "./decryptToken.js";

const AuthContext = createContext({
    isAuth: false,
    setIsAuth: () => { },
    fullName: '',
    userId: '',
    role: '',
})

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));
    
    if (!isAuth) {
        localStorage.clear();
    }

    const userData = useMemo(() => {
        if (isAuth) {
            const token = localStorage.getItem('token');
            const payload = decryptToken(token);
            console.log(payload);
            return {
                userId: payload._id,
                fullName: payload.fullName,
                role: payload.role
            }
        }
        return {
            userId: "",
            fullName: "",
            role: ""
        };
    }, [isAuth])

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, ...userData }} >
            {children}
        </AuthContext.Provider>
    )
}