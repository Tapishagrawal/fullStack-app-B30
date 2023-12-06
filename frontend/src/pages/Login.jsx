import React, { useState } from 'react';
import axios from "axios";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleLogin = async() => {
        const newUser = {
            username,email,pass
        }
        try {
            let res = await axios.post("https://cautious-colt-garters.cyclic.app/users/register",newUser)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        console.log(newUser)
    }
    return (
        <>
            <h1 style={{textAlign:"center"}}>ADD NEW NOTES</h1>
            <div style={{ display: "flex", margin: "auto", flexDirection: "column", gap: "2rem", marginTop: "3rem", width: "60%" }}>
                <input style={{paddingBlock:"0.5rem", paddingInline:"0.5rem"}} type="text" value={username} placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} />
                <input style={{paddingBlock:"0.5rem", paddingInline:"0.5rem"}} type="text" value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                <input style={{paddingBlock:"0.5rem", paddingInline:"0.5rem"}} type="text" value={pass} placeholder='Enter password' onChange={(e) => setPass(e.target.value)} />
                <button onClick={handleLogin}>SUBMIT</button>
            </div>
        </>
    )
}
