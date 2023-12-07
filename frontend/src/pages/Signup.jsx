import React, { useState } from 'react'
import axios from "axios";

export const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [isLoading, setIsLoding] = useState(false)
    const [isMsg, setIsMgs] = useState("")

    const handleRagister = async () => {
        const newUser = {
            username, email, pass
        }
        try {
            setIsLoding(true)
            let res = await axios.post("http://localhost:4500/users/register", newUser)
            setIsMgs(res.data.msg)
            setTimeout(()=>{
                setIsMgs("")
            },5000)
            setIsLoding(false)
        } catch (error) {
            console.log(error)
            setIsLoding(false)
        }
    }
    return (
        <>
            <h1 style={{ textAlign: "center" }}>REGISTER</h1>
            {isMsg &&
                <h4 style={{ textAlign: "center" }}>{isMsg}</h4>
            }
            <div style={{ display: "flex", margin: "auto", flexDirection: "column", gap: "2rem", marginTop: "3rem", width: "60%" }}>
                <input style={{ paddingBlock: "0.5rem", paddingInline: "0.5rem" }} type="text" value={username} placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} />
                <input style={{ paddingBlock: "0.5rem", paddingInline: "0.5rem" }} type="text" value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                <input style={{ paddingBlock: "0.5rem", paddingInline: "0.5rem" }} type="text" value={pass} placeholder='Enter password' onChange={(e) => setPass(e.target.value)} />
                <button onClick={handleRagister}>{isLoading ? "Loding..." : "SUBMIT"}</button>
            </div>
        </>
    )
}
