import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContextProvider';

export const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const {isMsg, isLoading, handleLogin} = useContext(AuthContext)
    
    return (
        <>
            <h1 style={{ textAlign: "center" }}>LOGIN</h1>
            {isMsg &&
                <h4 style={{ textAlign: "center" }}>{isMsg}</h4>
            }
            <div style={{ display: "flex", margin: "auto", flexDirection: "column", gap: "2rem", marginTop: "3rem", width: "60%" }}>
                <input style={{ paddingBlock: "0.5rem", paddingInline: "0.5rem" }} type="text" value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                <input style={{ paddingBlock: "0.5rem", paddingInline: "0.5rem" }} type="text" value={pass} placeholder='Enter password' onChange={(e) => setPass(e.target.value)} />
                <button onClick={()=>handleLogin({email,pass})}>{isLoading ? "Loding..." : "SUBMIT"}</button>
            </div>
        </>
    )
}
