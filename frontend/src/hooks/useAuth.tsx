import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function useAuth () {
    const authContext = useContext(AuthContext)


    if (!authContext) {
        throw Error('Auth context mush be used within the authProvider')
    }

    return authContext
}