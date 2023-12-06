import React, { useState } from 'react'

export const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleRegister = () => {
        
    }
    return (
        <div>
            <h1>Register new User!</h1>
            <input type="text" value={username} placeholder='Enter username' onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" value={email} placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" value={pass} placeholder='Enter password' onChange={(e)=>setPass(e.target.value)}/>
            <button onClick={handleRegister}>Submit</button>
        </div>
    )
}
