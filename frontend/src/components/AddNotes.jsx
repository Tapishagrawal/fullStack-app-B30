import React, { useState } from 'react'

export const AddNotes = ({ handleAddNotes, isLoading }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "50%", margin: "auto", marginTop: "3rem" }}>
            <input onChange={(e) => setTitle(e.target.value)} name="title" style={{ paddingBlock: "0.5rem", paddingInline: "1rem" }} value={title} type="text" placeholder='Enter your notes title' />
            <input onChange={(e) => setBody(e.target.value)} name="description" style={{ paddingBlock: "0.5rem", paddingInline: "1rem" }} value={body} type="text" placeholder='Enter your notes description' />
            <button onClick={() => handleAddNotes({ title, body })}>{isLoading ? "Loading..." : "SUBMIT"}</button>
        </div>
    )
}
