import React, { useEffect, useState } from 'react';
import axios from "axios"

export const Home = () => {
    const [ismodelopen, setIsModelOpen] = useState(false);
    const [notes, setNotes] = useState([]);

    const fetchNotesData = async () => {
        try {
            let res = await axios(`https://cautious-colt-garters.cyclic.app/notes`)
            setNotes(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchNotesData()
    },[])
    return (
        <div style={{ textAlign: "center", paddingBottom:"5rem"}}>
            <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:"1rem", marginTop:"4rem"}}>

                <div style={{border:"0.08rem solid white", width:"31%", padding:"1rem", borderRadius:"0.5rem"}}>
                    <h1>title</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, adipisci.</p>
                    <button>EDIT</button>
                </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
                <button style={{ width: "30%" }} onClick={() => { setIsModelOpen(prev => !prev) }}>ADD NOTES</button>
            </div>
            {
                ismodelopen &&
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "50%", margin: "auto", marginTop: "3rem" }}>
                    <input type="text" placeholder='Enter your notes title' />
                    <input type="text" placeholder='Enter your notes description' />
                    <button>SUBMIT</button>
                </div>
            }
        </div>
    )
}
