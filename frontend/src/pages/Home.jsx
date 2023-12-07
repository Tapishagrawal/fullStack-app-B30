import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"
import { NoteCard } from '../components/NoteCard';
import { AuthContext } from '../components/AuthContextProvider';
import { AddNotes } from '../components/AddNotes';

export const Home = () => {
    const [ismodelopen, setIsModelOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const { token } = useContext(AuthContext);
    const [model, setModel] = useState(false);
    const [msg, setMsg] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [id, setId] = useState("");
    const [updateMag, setUpdateMsg] = useState("");
    const [deleteMag, setDeleteMag] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fetchNotesData = async () => {
        try {
            let res = await axios(`https://cautious-colt-garters.cyclic.app/notes`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setNotes(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddNotes = async (newnotes) => {
        try {
            setIsLoading(true);
            let res = await axios.post("https://cautious-colt-garters.cyclic.app/notes/create", newnotes, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setMsg(res.data.msg)
            setTimeout(() => {
                setMsg("")
            }, 3000)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    const handleNotesUpdated = async (id, updatedNotes) => {
        try {
            setIsLoading(true);
            let res = await axios.patch(`https://cautious-colt-garters.cyclic.app/notes/update/${id}`, updatedNotes, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setUpdateMsg(res.data.msg)
            setTimeout(() => {
                setUpdateMsg("")
            }, 3000)
            setModel(false)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const openEditModel = (_id, title, body) => {
        setModel(true)
        setTitle(title)
        setBody(body)
        setId(_id)
    }

    const handleDelete = async (_id) => {
        try {
            let res = await axios.delete(`https://cautious-colt-garters.cyclic.app/notes/delete/${_id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setDeleteMag(res.data.msg)
            setTimeout(() => {
                setDeleteMag("")
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchNotesData()
    }, [msg, updateMag, deleteMag])
    return (
        <div style={{ textAlign: "center", paddingBottom: "5rem" }}>
            <p>Hello, {notes.length > 0 ? notes[0]?.username[0]?.toUpperCase()+notes[0]?.username?.slice(1): "welcome to note taker"}</p>
            {
                updateMag &&
                <span style={{ position: "fixed", top: "10%", left: "50%", transform: "translate(-50%)", backgroundColor: "black", paddingBlock: "0.5rem", paddingInline: "2rem", borderRadius: "0.2rem" }}>Your Notes updated.</span>

            }
            {
                deleteMag &&
                <span style={{ position: "fixed", top: "10%", left: "50%", transform: "translate(-50%)", backgroundColor: "black", paddingBlock: "0.5rem", paddingInline: "2rem", borderRadius: "0.2rem" }}>Your Notes updated.</span>

            }
            {model &&
                <div onClick={() => setModel(false)} style={{ position: "fixed", top: "0", left: "0", backdropFilter: "blur(3px)", backgroundColor: "#39234f45", width: "100%", height: "100vh" }}></div>
            }
            <div>
                {model &&
                    <div style={{ width: "40%", backgroundColor: "#2b2a2d", border: "0.01rem solid white", padding: "2rem", borderRadius: "0.5rem", position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "2rem", width: "100%", margin: "auto", marginTop: "3rem" }}>
                            <div onClick={() => setModel(false)} style={{ position: "absolute", right: "-2%", top: "-38%", cursor: "pointer" }}>close</div>
                            <input onChange={(e) => setTitle(e.target.value)} name="title" style={{ paddingBlock: "0.5rem", paddingInline: "1rem" }} value={title} type="text" placeholder='Enter your notes title' />
                            <input onChange={(e) => setBody(e.target.value)} name="description" style={{ paddingBlock: "0.5rem", paddingInline: "1rem" }} value={body} type="text" placeholder='Enter your notes description' />
                            <button onClick={() => handleNotesUpdated(id, { title, body })}>{isLoading ? "Loding..." : "SUBMIT"}</button>
                        </div>
                    </div>
                }
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", gap: "2rem", marginTop: "5rem" }}>
                {notes.length > 0 &&
                    notes?.map(note => (
                        <div key={note._id} style={{ width: "31%" }}>
                            <NoteCard {...note} openEditModel={openEditModel} handleDelete={handleDelete} />
                        </div>
                    ))
                }
            </div>
            <div style={{ marginTop: "2rem" }}>
                <button style={{ width: "30%" }} onClick={() => { setIsModelOpen(prev => !prev) }}>ADD NOTES</button>
            </div>
            <div>
                {msg &&
                    <h4>{msg}</h4>
                }
                {
                    ismodelopen &&
                    <AddNotes handleAddNotes={handleAddNotes} isLoading={isLoading} />
                }
            </div>
        </div>
    )
}
