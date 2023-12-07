import React from 'react'

export const NoteCard = ({ _id, title, body, openEditModel, handleDelete }) => {
    return (
        <div style={{ border: "0.08rem solid white", padding: "1rem", borderRadius: "0.5rem" }}>
            <h1>{title}</h1>
            <p>{body}</p>
            <div>
                <button  onClick={() => openEditModel(_id, title, body)}>EDIT</button>
                <button style={{marginLeft:"1rem"}} onClick={() => handleDelete(_id)}>DELETE</button>
            </div>
        </div>
    )
}
