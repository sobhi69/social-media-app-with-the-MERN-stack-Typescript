import { createContext, FC, ReactNode, useEffect, useState } from "react";
import AccountProfile from '../interfaces/AccountProfile'
import SignUpForm from "../interfaces/SignUpForm";
import SignInForm from "../interfaces/SignInForm";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import EditProfile from "../interfaces/EditProfile";

type AuthContextType = {
    curUser: AccountProfile | null,
    signUp: (data: SignUpForm) => Promise<void>,
    signIn: (data: SignInForm) => Promise<void>,
    updateUser: (data: EditProfile) => Promise<void>,
    logOut: () => Promise<void>,
    updateUserImg: (profileImg: File) => Promise<void>,
    updateUserCover: (cover: File) => Promise<void>,
    error: string | null,
    loading: boolean,
    setCurUser:React.Dispatch<React.SetStateAction<AccountProfile | null>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [curUser, setCurUser] = useState<AccountProfile | null>(null)

    const navigate = useNavigate()


    useEffect(() => {
        const curUserObjFromLocalstorage = localStorage.getItem('curUser')
        if (curUserObjFromLocalstorage) {
            setCurUser(JSON.parse(curUserObjFromLocalstorage))
        }
    }, [])

    const signIn = async (data: SignInForm) => {
        setError(null)
        setLoading(true)
        if (!data.email || !data.password) {
            alert('please provide the email and the password')
            return
        }

        try {
            const response = await axiosInstance.post('/auth/sign-in', data)
            setCurUser(response.data)
            localStorage.setItem('curUser', JSON.stringify(response.data))
            navigate('/')
        } catch (error: any) {
            const errMess = error.response.data.message
            setError(errMess)
            alert(errMess)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (data: SignUpForm) => {
        setError(null)
        setLoading(true)
        if (
            !data.firstname ||
            !data.lastname ||
            !data.password ||
            !data.email
        ) {
            alert(`please fill up the entire form`)
            return
        }
        if (data.gender != 'female' && data.gender != 'male') {
            alert('please choose gender!')
            return
        }

        if (data.confirmPassword !== data.password) {
            alert(`please make sure that password match with confirm password!`)
            return
        }

        try {
            const response = await axiosInstance.post('/auth/sign-up', data)
            setCurUser(response.data)
            localStorage.setItem('curUser', JSON.stringify(response.data))
            navigate('/')
        } catch (error: any) {
            const errMess = error.response.data.message
            setError(errMess)
            alert(errMess)
        } finally {
            setLoading(false)
        }
    }
    const logOut = async () => {
        setError(null)
        setLoading(true)

        try {
            await axiosInstance.get('/auth/log-out')
            setCurUser(null)
            localStorage.removeItem('curUser')
            navigate('./sign-in')
        } catch (error: any) {
            alert(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const updateUser = async (data: EditProfile) => {
        setError(null)
        setLoading(true)

        try {
            const response = await axiosInstance.patch(`/account/${curUser?._id}`, data)
            setCurUser(response.data)
            localStorage.setItem('curUser', JSON.stringify(response.data))
        } catch (error: any) {
            alert(error?.response?.data?.message)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const updateUserImg = async (profileImg: File) => {
           setError(null)
        setLoading(true)
        const form = new FormData()

        form.append('file', profileImg)
        // so only if there's an image
        try {
            const response = await axiosInstance.put(`/account/update-img/${curUser?._id}`, form)
            setCurUser(response.data)

        } catch (error:any) {
            alert(error)
            setError(error)
        }finally {
            setLoading(false)
        }
    }

    const updateUserCover = async (coverImg: File) => {
        setError(null)
        setLoading(true)
        const form = new FormData()

        form.append('file', coverImg)

        try {
            const response = await axiosInstance.put(`/account/update-cover/${curUser?._id}`, form)
            setCurUser(response.data)

        } catch (error: any) {
            alert(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            loading,
            error,
            curUser,
            signIn,
            signUp,
            logOut,
            updateUser,
            updateUserImg,
            updateUserCover,
            setCurUser
        }}>
            {children}
        </AuthContext.Provider>
    )

}