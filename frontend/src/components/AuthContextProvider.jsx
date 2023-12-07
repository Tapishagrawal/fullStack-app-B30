import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoding] = useState(false)
    const [isMsg, setIsMgs] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const handleLogin = async (newUser) => {
        try {
            setIsLoding(true)
            let res = await axios.post("http://localhost:4500/users/login", newUser)
            setIsMgs(res.data.msg)
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
            setTimeout(() => {
                setIsMgs("")
            }, 5000)
            setIsLoding(false)
        } catch (error) {
            console.log(error)
            setIsLoding(false)
        }
    }
    useEffect(() => {
        localStorage.setItem("token", token)
    }, [])
    return (
        <AuthContext.Provider value={{ handleLogin, isLoading, isMsg, token }}>
            {children}
        </AuthContext.Provider>
    )
}
